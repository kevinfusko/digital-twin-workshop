import { NextRequest, NextResponse } from 'next/server';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';
import { z } from 'zod';

// Environment validation
const envSchema = z.object({
  UPSTASH_VECTOR_REST_URL: z.string().url('Invalid Upstash Vector URL'),
  UPSTASH_VECTOR_REST_TOKEN: z.string().min(1, 'Upstash Vector token is required'),
  GROQ_API_KEY: z.string().min(1, 'Groq API key is required'),
});

let env: z.infer<typeof envSchema>;
try {
  env = envSchema.parse({
    UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
    UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  });
} catch (error) {
  console.error('❌ Environment variable validation failed:', error);
  throw error;
}

// Initialize clients
const vectorIndex = new Index({
  url: env.UPSTASH_VECTOR_REST_URL,
  token: env.UPSTASH_VECTOR_REST_TOKEN,
});

const groqClient = new Groq({
  apiKey: env.GROQ_API_KEY,
});

// Constants
const TOP_K = 3;
const GROQ_MODEL = 'llama-3.1-8b-instant';

/**
 * Perform RAG query with enhanced error handling
 */
async function performRAGQuery(question: string): Promise<string> {
  try {
    // Validate input
    if (!question || question.trim().length === 0) {
      return 'Please provide a question about my professional background.';
    }

    // Step 1: Query Upstash Vector
    let results;
    try {
      results = await vectorIndex.query({
        data: question,
        topK: TOP_K,
        includeMetadata: true,
      });
    } catch (vectorError) {
      console.error('Upstash Vector query error:', vectorError);
      return "I'm having trouble accessing my knowledge base right now. Please try again in a moment.";
    }

    if (!results || results.length === 0) {
      return "I don't have specific information about that topic in my knowledge base. Could you ask about my experience, skills, projects, or career goals?";
    }

    // Step 2: Extract relevant content
    const topDocs: string[] = [];
    
    for (const result of results) {
      try {
        const metadata = result.metadata || {};
        const title = (metadata.title as string) || 'Professional Information';
        let content = (metadata.content as string) || '';

        if (!content && result.data) {
          content = typeof result.data === 'string' 
            ? result.data.substring(0, 200) + '...'
            : '';
        }

        if (content && content.trim().length > 0) {
          topDocs.push(`${title}: ${content}`);
        } else {
          topDocs.push(`${title}: Professional information about ${title.toLowerCase()}`);
        }
      } catch (extractError) {
        console.error('Error extracting result metadata:', extractError);
        continue;
      }
    }

    // Fallback if no good content found
    if (topDocs.length === 0) {
      return "I have information about my background. Could you try asking about my programming experience, technical skills, or career goals?";
    }

    // Step 3: Build context for LLM
    const context = topDocs.join('\n\n');

    // Step 4: Generate response with Groq
    const prompt = `Based on the following information about this person, please answer the user's question. 
Respond as if you are this person speaking about yourself in first person.

Context:
${context}

Question: ${question}

Please provide a helpful, professional response that accurately represents their background and experience.`;

    let completion;
    try {
      completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: GROQ_MODEL,
        temperature: 0.7,
        max_tokens: 500,
      });
    } catch (groqError) {
      console.error('Groq API error:', groqError);
      return "I'm having trouble generating a response right now. Please try again in a moment.";
    }

    const answer = completion.choices[0]?.message?.content || "I couldn't generate a response.";
    
    if (!answer || answer.trim().length === 0) {
      return "I couldn't generate a proper response. Please try rephrasing your question.";
    }

    return answer;

  } catch (error) {
    console.error('Error during RAG query:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('UPSTASH')) {
        return 'Unable to connect to the knowledge base. Please check your Upstash configuration.';
      }
      if (error.message.includes('GROQ') || error.message.includes('API')) {
        return 'Unable to generate a response. Please check your Groq API configuration.';
      }
      return `Error: ${error.message}`;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }
}

/**
 * HTTP MCP Server Handler
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle MCP protocol messages
    if (body.method === 'tools/list') {
      const tools: Tool[] = [
        {
          name: 'query_digital_twin',
          description: 'Query Kevin Fuschetto\'s professional digital twin using RAG. Ask about experience, skills, projects, education, or career goals.',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: 'Your question about Kevin\'s professional background',
              },
            },
            required: ['question'],
          },
        },
      ];

      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          tools,
        },
      });
    }

    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;

      if (name === 'query_digital_twin') {
        const question = args.question;
        
        if (!question || typeof question !== 'string') {
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            error: {
              code: -32602,
              message: 'Invalid params: question is required',
            },
          });
        }

        const answer = await performRAGQuery(question);

        return NextResponse.json({
          jsonrpc: '2.0',
          id: body.id,
          result: {
            content: [
              {
                type: 'text',
                text: answer,
              },
            ],
          },
        });
      }

      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        error: {
          code: -32601,
          message: `Unknown tool: ${name}`,
        },
      });
    }

    // Handle initialize request
    if (body.method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'digital-twin-mcp',
            version: '1.0.0',
          },
        },
      });
    }

    // Unknown method
    return NextResponse.json({
      jsonrpc: '2.0',
      id: body.id,
      error: {
        code: -32601,
        message: `Method not found: ${body.method}`,
      },
    });

  } catch (error) {
    console.error('MCP HTTP Server error:', error);
    
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: 'Internal error',
          data: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
