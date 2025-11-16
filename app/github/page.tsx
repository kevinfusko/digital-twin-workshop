'use client';

import Link from 'next/link';

export default function GitHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">Kevin Fuschetto</Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition">Home</Link>
            <Link href="/monitoring" className="text-gray-600 hover:text-gray-900 transition">Monitoring</Link>
            <Link href="/scalability" className="text-gray-600 hover:text-gray-900 transition">Scalability</Link>
            <Link href="/operations" className="text-gray-600 hover:text-gray-900 transition">Operations</Link>
            <Link href="/github" className="text-gray-900 font-semibold">GitHub</Link>
            <Link href="/advanced" className="text-gray-600 hover:text-gray-900 transition">Advanced</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHub Repository</h1>
            <p className="text-lg text-gray-600">Production-ready codebase and architecture</p>
          </div>

          {/* Repository Link */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 rounded-lg shadow-lg mb-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-3xl font-bold mb-4">Digital Twin Workshop</h2>
            <p className="text-gray-200 mb-6">Enterprise RAG system with MCP integration</p>
            <a
              href="https://github.com/kevinfusko/digital-twin-workshop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              View on GitHub →
            </a>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-gray-900">Next.js 14 Application</div>
                  <div className="text-sm text-gray-600">TypeScript + React + Tailwind CSS</div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-4 rounded border border-gray-200 text-center">
                    <div className="font-semibold text-gray-900 mb-1">Frontend</div>
                    <div className="text-xs text-gray-600">
                      React Components<br/>
                      Tailwind Styling<br/>
                      Real-time Updates
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200 text-center">
                    <div className="font-semibold text-gray-900 mb-1">API Routes</div>
                    <div className="text-xs text-gray-600">
                      /api/query<br/>
                      /api/metrics<br/>
                      /api/health<br/>
                      /api/load-test
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200 text-center">
                    <div className="font-semibold text-gray-900 mb-1">MCP Server</div>
                    <div className="text-xs text-gray-600">
                      Claude Desktop<br/>
                      HTTP Endpoint<br/>
                      JSON-RPC 2.0
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-2xl text-gray-400">↓</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗄️</div>
                    <div className="text-lg font-bold text-gray-900">Upstash Vector</div>
                    <div className="text-sm text-gray-600 mt-2">
                      Semantic Search<br/>
                      1536-dim Embeddings<br/>
                      RAG Context Retrieval
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <div className="text-lg font-bold text-gray-900">Groq LLaMA</div>
                    <div className="text-sm text-gray-600 mt-2">
                      LLaMA 3.1 8B<br/>
                      Fast Inference<br/>
                      Response Generation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Frontend & Framework</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Next.js</span>
                    <span className="text-sm text-gray-600">14.2.33</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">React</span>
                    <span className="text-sm text-gray-600">18</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">TypeScript</span>
                    <span className="text-sm text-gray-600">5</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Tailwind CSS</span>
                    <span className="text-sm text-gray-600">3.3.6</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Backend & Infrastructure</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Upstash Vector</span>
                    <span className="text-sm text-gray-600">RAG Database</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Groq API</span>
                    <span className="text-sm text-gray-600">LLM Provider</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Vercel</span>
                    <span className="text-sm text-gray-600">Deployment</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">MCP</span>
                    <span className="text-sm text-gray-600">Model Context Protocol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Production-Ready Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">RAG System</div>
                    <div className="text-sm text-gray-600">Retrieval-Augmented Generation with vector search</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Real-time Monitoring</div>
                    <div className="text-sm text-gray-600">Performance metrics and health checks</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Load Testing</div>
                    <div className="text-sm text-gray-600">Built-in scalability validation</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">MCP Integration</div>
                    <div className="text-sm text-gray-600">Claude Desktop integration</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Serverless Architecture</div>
                    <div className="text-sm text-gray-600">Auto-scaling API routes</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Type Safety</div>
                    <div className="text-sm text-gray-600">Full TypeScript implementation</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Error Handling</div>
                    <div className="text-sm text-gray-600">Graceful degradation and logging</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900">Documentation</div>
                    <div className="text-sm text-gray-600">Comprehensive setup guides</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repository Stats */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Repository Information</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-semibold">Repository</span>
                <a 
                  href="https://github.com/kevinfusko/digital-twin-workshop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  kevinfusko/digital-twin-workshop
                </a>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-semibold">License</span>
                <span className="text-gray-600">MIT</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-semibold">Package Manager</span>
                <span className="text-gray-600">pnpm</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700 font-semibold">Documentation</span>
                <span className="text-gray-600">README.md, MCP_SETUP_GUIDE.md, QUICK_REFERENCE.md</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <a
                href="https://github.com/kevinfusko/digital-twin-workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition"
              >
                <span>⭐</span>
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
