# Digital Twin MCP Integration - Complete Setup Guide

## 🎯 Overview

Your digital twin system now supports **3 different ways** to interact with your professional profile:

1. **Web Interface** (Next.js) - `http://localhost:3000`
2. **Claude Desktop** (MCP stdio) - Via Claude app
3. **HTTP MCP Endpoint** (Future VS Code) - `http://localhost:3000/api/mcp`

---

## ✅ Method 1: Web Interface (Ready to Use)

### Start the Server:
```bash
cd /Users/kevinfuschetto/Bootcamp/digital-twin-workshop
pnpm dev
```

### Access:
- Open browser: `http://localhost:3000`
- Ask questions in the web interface
- Get RAG-powered responses about Kevin Fuschetto's professional background

### Status: ✅ **Fully Working**

---

## ✅ Method 2: Claude Desktop Integration (Recommended)

### Prerequisites:
- [Claude Desktop](https://claude.ai/download) installed
- Node.js installed
- MCP server built (✅ Already built)

### Step 1: Copy Configuration to Claude Desktop

**For macOS:**
```bash
# Create Claude config directory if it doesn't exist
mkdir -p ~/Library/Application\ Support/Claude

# Copy the config (you'll need to edit environment variables)
cp /Users/kevinfuschetto/Bootcamp/digital-twin-workshop/mcp-server/claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Important:** Edit `~/Library/Application Support/Claude/claude_desktop_config.json` and replace:
- `your_upstash_vector_rest_url` with your actual Upstash URL
- `your_upstash_vector_rest_token` with your actual Upstash token
- `your_groq_api_key` with your actual Groq API key

### Step 2: Verify Configuration

Your config should look like this:
```json
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": [
        "/Users/kevinfuschetto/Bootcamp/digital-twin-workshop/mcp-server/build/index.js"
      ],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "https://your-actual-url.upstash.io",
        "UPSTASH_VECTOR_REST_TOKEN": "your-actual-token",
        "GROQ_API_KEY": "gsk_your-actual-key"
      }
    }
  }
}
```

### Step 3: Restart Claude Desktop

1. **Quit Claude Desktop completely** (Cmd+Q on macOS)
2. **Reopen Claude Desktop**
3. **Look for the 🔨 hammer icon** in the chat input area

### Step 4: Test the Integration

In Claude Desktop, try asking:
- "What is Kevin's experience with .NET development?"
- "Tell me about Kevin's technical skills"
- "What are Kevin's career goals?"

### Troubleshooting:

**No hammer icon appears:**
- Check the config file path is correct
- Ensure Claude Desktop is completely restarted
- Open Claude Desktop Developer Tools (Help → Developer Tools)
- Check Console for MCP errors

**Server errors:**
```bash
# Test the MCP server directly
cd /Users/kevinfuschetto/Bootcamp/digital-twin-workshop/mcp-server
node build/index.js
```

**Empty responses:**
- Verify your Upstash vector database has data
- Check that environment variables are correct in the config

### Status: ✅ **Ready to Test**

---

## 🔄 Method 3: HTTP MCP Endpoint (Future VS Code)

### Current Status:
- ✅ Server built and ready at `/api/mcp`
- ✅ Configuration file created at `.vscode/mcp.json`
- ⏳ Waiting for official VS Code MCP support

### Test the HTTP Endpoint:

**With server running (`pnpm dev`):**
```bash
# Test initialize
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'

# List available tools
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'

# Query digital twin
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/call",
    "params":{
      "name":"query_digital_twin",
      "arguments":{"question":"What is your .NET experience?"}
    }
  }'
```

### Status: ✅ **Server Ready** | ⏳ **Awaiting VS Code MCP Support**

---

## 📊 Feature Comparison

| Feature | Web Interface | Claude Desktop | HTTP Endpoint |
|---------|--------------|----------------|---------------|
| **Status** | ✅ Working | ✅ Ready | ✅ Ready |
| **RAG Queries** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Upstash Vector** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Groq LLM** | ✅ Yes | ✅ Yes | ✅ Yes |
| **UI** | Web Browser | Claude App | None (API) |
| **Best For** | Quick Testing | Interview Prep | Integration |

---

## 🚀 Quick Start (Recommended Path)

### For Immediate Use:
1. **Start web server**: `pnpm dev`
2. **Open browser**: http://localhost:3000
3. **Ask questions** about Kevin's background

### For Claude Desktop Integration:
1. **Copy config** to Claude's folder
2. **Add your API keys** to the config
3. **Restart Claude Desktop**
4. **Look for 🔨 hammer icon**
5. **Ask questions** in Claude

---

## 🔐 Environment Variables Needed

All three methods require:
```env
UPSTASH_VECTOR_REST_URL=https://your-vector-db.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your-token-here
GROQ_API_KEY=gsk_your-key-here
```

**Location:**
- **Web/HTTP**: `.env` in project root (already set up)
- **Claude Desktop**: Inside `claude_desktop_config.json` env section

---

## 📝 Testing Checklist

### Web Interface:
- [ ] Server starts with `pnpm dev`
- [ ] http://localhost:3000 loads
- [ ] Can type questions
- [ ] Receives RAG responses
- [ ] Sources displayed

### Claude Desktop:
- [ ] Config file copied to Claude folder
- [ ] API keys added to config
- [ ] Claude Desktop restarted
- [ ] 🔨 Hammer icon visible
- [ ] Tool responds to queries

### HTTP Endpoint:
- [ ] Server running (`pnpm dev`)
- [ ] `/api/mcp` responds to initialize
- [ ] `/api/mcp` lists tools
- [ ] Can call query_digital_twin tool

---

## 🎓 Interview Preparation Use Cases

### Practice Common Interview Questions:

**Technical Skills:**
- "What programming languages are you proficient in?"
- "Tell me about your .NET development experience"
- "What databases have you worked with?"

**Experience:**
- "Describe your IT support background"
- "What was your role at Azstar Technologies?"
- "Tell me about your management experience"

**Projects:**
- "What AI/ML projects have you worked on?"
- "Describe a challenging technical problem you solved"

**Career Goals:**
- "What are your career aspirations?"
- "Why are you interested in software engineering?"

---

## 📚 Additional Resources

- **MCP Specification**: https://spec.modelcontextprotocol.io/
- **Upstash Vector Docs**: https://upstash.com/docs/vector
- **Groq API Docs**: https://console.groq.com/docs
- **Claude Desktop**: https://claude.ai/download

---

## 🆘 Support

If you encounter issues:

1. Check the terminal logs for errors
2. Verify environment variables are set correctly
3. Ensure Upstash database has been populated with data
4. Test with the web interface first (simplest setup)

---

**Last Updated**: November 16, 2025  
**Project**: Digital Twin Workshop  
**Author**: Kevin Fuschetto
