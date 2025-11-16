# Digital Twin MCP Server

A Model Context Protocol (MCP) server that provides RAG-based queries about a professional profile using Upstash Vector and Groq.

## Features

- **RAG-Powered**: Uses Retrieval-Augmented Generation for accurate responses
- **Upstash Vector**: Serverless vector database with built-in embeddings
- **Groq Integration**: Ultra-fast LLM inference with llama-3.1-8b-instant
- **MCP Compatible**: Works seamlessly with Claude Desktop

## Installation

```bash
# Install dependencies
npm install

# Build the server
npm run build
```

## Configuration

Create a `.env.local` file in the `mcp-server` directory:

```env
UPSTASH_VECTOR_REST_URL=your_upstash_url
UPSTASH_VECTOR_REST_TOKEN=your_upstash_token
GROQ_API_KEY=your_groq_api_key
```

## Usage with Claude Desktop

### macOS Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": [
        "/absolute/path/to/digital-twin-workshop/mcp-server/build/index.js"
      ],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "your_upstash_url",
        "UPSTASH_VECTOR_REST_TOKEN": "your_upstash_token",
        "GROQ_API_KEY": "your_groq_api_key"
      }
    }
  }
}
```

### Windows Configuration

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": [
        "C:\\absolute\\path\\to\\digital-twin-workshop\\mcp-server\\build\\index.js"
      ],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "your_upstash_url",
        "UPSTASH_VECTOR_REST_TOKEN": "your_upstash_token",
        "GROQ_API_KEY": "your_groq_api_key"
      }
    }
  }
}
```

## Available Tools

### query_digital_twin

Ask questions about the person's professional background, experience, skills, projects, education, and career goals.

**Parameters:**
- `question` (string, required): Your question about their professional background

**Example Usage in Claude:**

```
Ask my digital twin: "What is your experience with AI and machine learning?"
```

## Architecture

The server follows the same RAG logic as the Python implementation:

1. **Query Processing**: User question is embedded using Upstash's built-in model
2. **Vector Search**: Top 3 most relevant content chunks are retrieved
3. **Context Building**: Retrieved content is formatted for the LLM
4. **Response Generation**: Groq's llama-3.1-8b-instant generates a first-person response

## Development

```bash
# Watch mode for development
npm run watch

# Build for production
npm run build
```

## Testing

After configuring Claude Desktop:

1. Restart Claude Desktop completely
2. Look for the 🔨 hammer icon in the input box
3. Try asking questions like:
   - "What is your experience with Python?"
   - "Tell me about your AI projects"
   - "What are your career goals?"

## Troubleshooting

- **No hammer icon**: Check that the config file path is correct and Claude Desktop is restarted
- **Server errors**: Check the MCP server logs in Claude Desktop developer tools
- **Empty responses**: Ensure your Upstash vector database has been populated with profile data

## License

MIT
