import { NextRequest, NextResponse } from 'next/server';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';
import { recordMetric } from '../../../lib/metrics';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

export async function POST(request: NextRequest) {
  const requestStartTime = Date.now();
  
  try {
    const { question } = await request.json();

    if (!question) {
      recordMetric('request', Date.now() - requestStartTime, false);
      return NextResponse.json({ error: 'No question provided' }, { status: 400 });
    }

    // Query vector database
    const vectorSearchStart = Date.now();
    const results = await index.query({
      data: question,
      topK: 3,
      includeMetadata: true,
    });
    const vectorSearchTime = Date.now() - vectorSearchStart;
    recordMetric('vector_search', vectorSearchTime);

    if (!results || results.length === 0) {
      return NextResponse.json({
        answer: "I don't have specific information about that topic.",
        sources: [],
        relevance_scores: [],
      });
    }

    // Extract relevant content
    const topDocs: string[] = [];
    const sources: Array<{ title: string; score: string }> = [];
    const scores: number[] = [];

    for (const result of results) {
      const metadata = result.metadata as any || {};
      const title = metadata.title || 'Information';
      const content = metadata.content || '';
      const score = result.score || 0;

      scores.push(score);
      sources.push({ title, score: score.toFixed(3) });
      
      if (content) {
        topDocs.push(`${title}: ${content}`);
      }
    }

    if (topDocs.length === 0) {
      return NextResponse.json({
        answer: "I found some information but couldn't extract details.",
        sources,
        relevance_scores: scores,
      });
    }

    // Generate response with Groq
    const context = topDocs.join('\n\n');
    const prompt = `Based on the following information about yourself, answer the question.
Speak in first person as if you are describing your own background.

Your Information:
${context}

Question: ${question}

Provide a helpful, professional response:`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are an AI digital twin. Answer questions as if you are the person, speaking in first person about your background, skills, and experience.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content?.trim() || 'Unable to generate response';

    // Record successful request
    const totalTime = Date.now() - requestStartTime;
    recordMetric('request', totalTime, true);

    return NextResponse.json({
      answer,
      sources,
      relevance_scores: scores,
    });
  } catch (error: any) {
    console.error('Error in query API:', error);
    
    // Record failed request
    const totalTime = Date.now() - requestStartTime;
    recordMetric('request', totalTime, false);
    
    return NextResponse.json(
      { error: `Error generating response: ${error.message}` },
      { status: 500 }
    );
  }
}
