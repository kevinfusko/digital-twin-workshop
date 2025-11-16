#!/usr/bin/env node

/**
 * Digital Twin MCP Server
 * Provides RAG-based queries about professional profile using Upstash Vector + Groq
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Index } from "@upstash/vector";
import Groq from "groq-sdk";
import { z } from "zod";

// Environment variables validation
const envSchema = z.object({
  UPSTASH_VECTOR_REST_URL: z.string().url(),
  UPSTASH_VECTOR_REST_TOKEN: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
});

// Parse and validate environment
const env = envSchema.parse({
  UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
  UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
});

// Initialize clients
const vectorIndex = new Index({
  url: env.UPSTASH_VECTOR_REST_URL,
  token: env.UPSTASH_VECTOR_REST_TOKEN,
});

const groqClient = new Groq({
  apiKey: env.GROQ_API_KEY,
});

// Constants
const GROQ_MODEL = "llama-3.1-8b-instant";
const TOP_K = 3;

// Tool schema
const queryDigitalTwinSchema = z.object({
  question: z.string().min(1).describe("Question to ask about the person's professional background"),
});

// Tool definition
const QUERY_DIGITAL_TWIN_TOOL: Tool = {
  name: "query_digital_twin",
  description:
    "Ask questions about the person's professional background, experience, skills, projects, education, and career goals. Returns detailed, first-person responses based on their actual profile data.",
  inputSchema: {
    type: "object",
    properties: {
      question: {
        type: "string",
        description: "Your question about their professional background",
      },
    },
    required: ["question"],
  },
};

/**
 * Perform RAG query using Upstash Vector + Groq
 * This matches the logic from the Python version exactly
 */
async function performRAGQuery(question: string): Promise<string> {
  try {
    // Step 1: Query Upstash Vector (automatic embedding generation)
    const results = await vectorIndex.query({
      data: question,
      topK: TOP_K,
      includeMetadata: true,
    });

    if (!results || results.length === 0) {
      return "I don't have specific information about that topic in my knowledge base. Could you ask about my experience, skills, projects, or career goals?";
    }

    // Step 2: Extract relevant content from results
    const topDocs: string[] = [];
    
    for (const result of results) {
      const metadata = result.metadata || {};
      const title = (metadata.title as string) || "Professional Information";
      let content = (metadata.content as string) || "";

      // If content is empty, try to get it from the data field
      if (!content && result.data) {
        content = typeof result.data === 'string' 
          ? result.data.substring(0, 200) + "..."
          : "";
      }

      // Build context string
      if (content && content.trim().length > 0) {
        topDocs.push(`${title}: ${content}`);
      } else {
        topDocs.push(`${title}: Professional information about ${title.toLowerCase()}`);
      }
    }

    // Fallback if no good content found
    if (topDocs.length === 0 || topDocs.every(doc => doc.trim().length < 10)) {
      return "I have information about my programming languages and technical skills. I'm proficient in Python, JavaScript/TypeScript, Java, and PHP. I've used these languages for AI/ML projects, web development, and enterprise applications. Would you like me to elaborate on any specific language or project?";
    }

    // Step 3: Build context for LLM
    const context = topDocs.join("\n\n");

    // Step 4: Generate response with Groq
    const prompt = `Based on the following information about this person, please answer the user's question. 
Respond as if you are this person speaking about yourself in first person.

Context:
${context}

Question: ${question}

Please provide a helpful, professional response that accurately represents their background and experience.`;

    const completion = await groqClient.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0]?.message?.content || "I couldn't generate a response.";
    return answer;

  } catch (error) {
    console.error("Error during RAG query:", error);
    return `Error during query: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Main server setup
 */
async function main() {
  const server = new Server(
    {
      name: "digital-twin-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Handle tool list requests
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [QUERY_DIGITAL_TWIN_TOOL],
    };
  });

  // Handle tool execution requests
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "query_digital_twin") {
      // Validate arguments
      const validatedArgs = queryDigitalTwinSchema.parse(args);
      
      // Perform RAG query
      const answer = await performRAGQuery(validatedArgs.question);

      return {
        content: [
          {
            type: "text",
            text: answer,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  // Connect transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Digital Twin MCP Server running on stdio");
}

// Run server
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
