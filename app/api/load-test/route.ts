import { NextRequest, NextResponse } from 'next/server';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';

interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTime: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errors: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { concurrency = 10, totalRequests = 50 } = body;

    // Validate inputs
    if (concurrency > 100 || totalRequests > 500) {
      return NextResponse.json(
        { error: 'Maximum concurrency is 100 and total requests is 500' },
        { status: 400 }
      );
    }

    console.log(`Starting load test: ${totalRequests} requests with ${concurrency} concurrent connections`);

    const results: LoadTestResult = {
      totalRequests,
      successfulRequests: 0,
      failedRequests: 0,
      totalTime: 0,
      averageResponseTime: 0,
      minResponseTime: Infinity,
      maxResponseTime: 0,
      requestsPerSecond: 0,
      p50ResponseTime: 0,
      p95ResponseTime: 0,
      p99ResponseTime: 0,
      errors: [],
    };

    const testQuestions = [
      'What is your .NET development experience?',
      'Tell me about your technical skills',
      'What are your career goals?',
      'Describe your IT support experience',
      'What education do you have?',
    ];

    const responseTimes: number[] = [];
    const startTime = Date.now();

    // Run load test in batches
    const batches = Math.ceil(totalRequests / concurrency);
    
    for (let batch = 0; batch < batches; batch++) {
      const batchSize = Math.min(concurrency, totalRequests - batch * concurrency);
      const promises = [];

      for (let i = 0; i < batchSize; i++) {
        const question = testQuestions[Math.floor(Math.random() * testQuestions.length)];
        promises.push(executeTestQuery(question));
      }

      const batchResults = await Promise.allSettled(promises);

      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          results.successfulRequests++;
          const responseTime = result.value;
          responseTimes.push(responseTime);
          results.minResponseTime = Math.min(results.minResponseTime, responseTime);
          results.maxResponseTime = Math.max(results.maxResponseTime, responseTime);
        } else {
          results.failedRequests++;
          results.errors.push(result.reason?.message || 'Unknown error');
        }
      });
    }

    results.totalTime = Date.now() - startTime;
    results.averageResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0;
    results.requestsPerSecond = (results.successfulRequests / results.totalTime) * 1000;

    // Calculate percentiles
    const sortedTimes = responseTimes.sort((a, b) => a - b);
    results.p50ResponseTime = calculatePercentile(sortedTimes, 50);
    results.p95ResponseTime = calculatePercentile(sortedTimes, 95);
    results.p99ResponseTime = calculatePercentile(sortedTimes, 99);

    // Only keep first 5 errors
    results.errors = results.errors.slice(0, 5);

    console.log(`Load test completed: ${results.successfulRequests}/${totalRequests} successful`);

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Load test error:', error);
    return NextResponse.json(
      { 
        error: 'Load test failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

async function executeTestQuery(question: string): Promise<number> {
  const startTime = Date.now();

  try {
    // Initialize clients
    const index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
    });

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    // Search vector database
    const searchResults = await index.query({
      data: question,
      topK: 3,
      includeMetadata: true,
    });

    // Build context
    const context = searchResults
      .map((result) => {
        const metadata = result.metadata as any;
        return `${metadata?.title || 'Context'}: ${metadata?.content || ''}`;
      })
      .join('\n\n');

    // Generate response with Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Kevin Fuschetto's AI assistant. Answer questions about his professional background, skills, and experience based on the provided context. Be concise and professional.`,
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseTime = Date.now() - startTime;
    return responseTime;
  } catch (error) {
    const responseTime = Date.now() - startTime;
    throw new Error(`Query failed after ${responseTime}ms: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const index = Math.ceil((percentile / 100) * values.length) - 1;
  return values[Math.max(0, index)];
}
