#!/bin/bash

# Digital Twin MCP Server - Claude Desktop Setup Script
# This script helps you configure Claude Desktop to use your MCP server

echo "🚀 Digital Twin MCP Server - Claude Desktop Setup"
echo "=================================================="
echo ""

# Check if Claude Desktop is installed
CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
if [ ! -d "$CLAUDE_CONFIG_DIR" ]; then
    echo "⚠️  Claude Desktop config directory not found."
    echo "   Creating directory at: $CLAUDE_CONFIG_DIR"
    mkdir -p "$CLAUDE_CONFIG_DIR"
fi

# Get the absolute path to the MCP server
MCP_SERVER_PATH="/Users/kevinfuschetto/Bootcamp/digital-twin-workshop/mcp-server/build/index.js"

if [ ! -f "$MCP_SERVER_PATH" ]; then
    echo "❌ MCP server not found at: $MCP_SERVER_PATH"
    echo "   Building the server..."
    cd "$(dirname "$0")/mcp-server" && npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please check for errors."
        exit 1
    fi
    echo "✅ Server built successfully!"
fi

echo ""
echo "📝 Environment Variables Setup"
echo "=============================="
echo ""
echo "You'll need to provide your API credentials:"
echo ""

# Check if .env file exists in project root
if [ -f "$(dirname "$0")/.env" ]; then
    echo "✅ Found .env file in project root"
    echo "   Reading credentials from .env..."
    source "$(dirname "$0")/.env"
    
    if [ -n "$UPSTASH_VECTOR_REST_URL" ] && [ -n "$UPSTASH_VECTOR_REST_TOKEN" ] && [ -n "$GROQ_API_KEY" ]; then
        echo "✅ Credentials loaded from .env"
        USE_ENV_CREDENTIALS="yes"
    else
        echo "⚠️  .env file incomplete"
        USE_ENV_CREDENTIALS="no"
    fi
else
    echo "⚠️  No .env file found"
    USE_ENV_CREDENTIALS="no"
fi

if [ "$USE_ENV_CREDENTIALS" = "no" ]; then
    echo ""
    echo "Please enter your credentials:"
    echo ""
    read -p "Upstash Vector REST URL: " UPSTASH_VECTOR_REST_URL
    read -p "Upstash Vector REST Token: " UPSTASH_VECTOR_REST_TOKEN
    read -p "Groq API Key: " GROQ_API_KEY
fi

# Create the Claude Desktop config
CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

echo ""
echo "📄 Creating Claude Desktop configuration..."

cat > "$CONFIG_FILE" <<EOF
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": [
        "$MCP_SERVER_PATH"
      ],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "$UPSTASH_VECTOR_REST_URL",
        "UPSTASH_VECTOR_REST_TOKEN": "$UPSTASH_VECTOR_REST_TOKEN",
        "GROQ_API_KEY": "$GROQ_API_KEY"
      }
    }
  }
}
EOF

if [ $? -eq 0 ]; then
    echo "✅ Configuration file created at: $CONFIG_FILE"
else
    echo "❌ Failed to create configuration file"
    exit 1
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Quit Claude Desktop completely (Cmd+Q)"
echo "2. Reopen Claude Desktop"
echo "3. Look for the 🔨 hammer icon in the chat input"
echo "4. Ask questions like:"
echo "   • 'What is Kevin's .NET development experience?'"
echo "   • 'Tell me about Kevin's technical skills'"
echo "   • 'What are Kevin's career goals?'"
echo ""
echo "Troubleshooting:"
echo "• If no hammer icon appears, check Claude Desktop Developer Tools"
echo "• Open: Help → Developer Tools → Console for error messages"
echo ""
echo "Configuration file location: $CONFIG_FILE"
echo ""
