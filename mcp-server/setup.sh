#!/bin/bash

# Digital Twin MCP Server Setup Script
# This script helps configure the MCP server for Claude Desktop

echo "🤖 Digital Twin MCP Server Setup"
echo "=================================="
echo ""

# Get the absolute path to the mcp-server directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MCP_SERVER_PATH="$SCRIPT_DIR/build/index.js"

echo "📁 MCP Server Location: $MCP_SERVER_PATH"
echo ""

# Check if build exists
if [ ! -f "$MCP_SERVER_PATH" ]; then
    echo "❌ Build not found. Running npm run build..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please check for errors."
        exit 1
    fi
    echo "✅ Build successful!"
    echo ""
fi

# Prompt for environment variables
echo "🔑 Environment Configuration"
echo "----------------------------"
echo ""

read -p "Enter UPSTASH_VECTOR_REST_URL: " UPSTASH_URL
read -p "Enter UPSTASH_VECTOR_REST_TOKEN: " UPSTASH_TOKEN
read -p "Enter GROQ_API_KEY: " GROQ_KEY

echo ""

# Detect OS and show appropriate config location
if [[ "$OSTYPE" == "darwin"* ]]; then
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
    echo "🍎 macOS detected"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
    echo "🪟 Windows detected"
else
    echo "❓ OS not detected. Please manually configure Claude Desktop."
    exit 0
fi

echo "📂 Config location: $CONFIG_PATH"
echo ""

# Generate config JSON
CONFIG_JSON=$(cat <<EOF
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": [
        "$MCP_SERVER_PATH"
      ],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "$UPSTASH_URL",
        "UPSTASH_VECTOR_REST_TOKEN": "$UPSTASH_TOKEN",
        "GROQ_API_KEY": "$GROQ_KEY"
      }
    }
  }
}
EOF
)

# Show the generated config
echo "📝 Generated Configuration:"
echo "----------------------------"
echo "$CONFIG_JSON"
echo ""

# Ask if user wants to save
read -p "Save this configuration to $CONFIG_PATH? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$CONFIG_PATH")"
    
    # Save config
    echo "$CONFIG_JSON" > "$CONFIG_PATH"
    
    if [ $? -eq 0 ]; then
        echo "✅ Configuration saved successfully!"
        echo ""
        echo "🔄 Next steps:"
        echo "   1. Restart Claude Desktop completely"
        echo "   2. Look for the 🔨 hammer icon in the input box"
        echo "   3. Ask Claude: 'What is your experience with AI?'"
        echo ""
        echo "🎉 Setup complete!"
    else
        echo "❌ Failed to save configuration."
        echo "Please manually create the file at: $CONFIG_PATH"
    fi
else
    echo ""
    echo "⚠️ Configuration not saved."
    echo "To manually configure, create this file:"
    echo "$CONFIG_PATH"
    echo ""
    echo "With this content:"
    echo "$CONFIG_JSON"
fi

echo ""
echo "📖 For more details, see: mcp-server/README.md"
