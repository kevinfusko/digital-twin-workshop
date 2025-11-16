#!/usr/bin/env node

/**
 * Test script for Digital Twin MCP Server
 * This simulates what Claude Desktop would send to test the server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MCP_SERVER_PATH = join(__dirname, 'build', 'index.js');

console.log('🧪 Testing Digital Twin MCP Server');
console.log('===================================\n');

// Test 1: List tools
console.log('📋 Test 1: Listing available tools...\n');

const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {}
};

// Test 2: Call tool
const callToolRequest = {
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'query_digital_twin',
    arguments: {
      question: 'What programming languages do you know?'
    }
  }
};

function testMCPServer() {
  const server = spawn('node', [MCP_SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'inherit'],
    env: process.env
  });

  let output = '';

  server.stdout.on('data', (data) => {
    output += data.toString();
    
    // Parse JSON-RPC responses
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.trim() && line.startsWith('{')) {
        try {
          const response = JSON.parse(line);
          
          if (response.id === 1) {
            console.log('✅ Tools list response:');
            console.log(JSON.stringify(response, null, 2));
            console.log('\n🔧 Test 2: Calling query_digital_twin tool...\n');
            
            // Send tool call request
            server.stdin.write(JSON.stringify(callToolRequest) + '\n');
          } else if (response.id === 2) {
            console.log('✅ Tool call response:');
            console.log(JSON.stringify(response, null, 2));
            console.log('\n🎉 All tests passed!');
            server.kill();
            process.exit(0);
          }
        } catch (e) {
          // Not JSON, ignore
        }
      }
    }
  });

  server.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });

  server.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
      process.exit(1);
    }
  });

  // Send initial list tools request
  setTimeout(() => {
    server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  }, 1000);

  // Timeout after 30 seconds
  setTimeout(() => {
    console.error('❌ Test timeout');
    server.kill();
    process.exit(1);
  }, 30000);
}

// Check if build exists
import { existsSync } from 'fs';

if (!existsSync(MCP_SERVER_PATH)) {
  console.error('❌ Build not found at:', MCP_SERVER_PATH);
  console.error('Run: npm run build');
  process.exit(1);
}

// Check environment variables
if (!process.env.UPSTASH_VECTOR_REST_URL || 
    !process.env.UPSTASH_VECTOR_REST_TOKEN || 
    !process.env.GROQ_API_KEY) {
  console.error('❌ Missing environment variables');
  console.error('Make sure .env.local is configured with:');
  console.error('  - UPSTASH_VECTOR_REST_URL');
  console.error('  - UPSTASH_VECTOR_REST_TOKEN');
  console.error('  - GROQ_API_KEY');
  process.exit(1);
}

console.log('✅ Build found');
console.log('✅ Environment variables configured\n');

testMCPServer();
