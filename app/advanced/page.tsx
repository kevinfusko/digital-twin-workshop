'use client';

import Link from 'next/link';

export default function AdvancedPage() {
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
            <Link href="/github" className="text-gray-600 hover:text-gray-900 transition">GitHub</Link>
            <Link href="/advanced" className="text-gray-900 font-semibold">Advanced</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Advanced Features</h1>
            <p className="text-lg text-gray-600">RAG optimizations, caching strategies, and performance enhancements</p>
          </div>

          {/* RAG Optimization */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 RAG System Optimization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Vector Search Optimization</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">→</span>
                      <div>
                        <strong>Optimal topK Selection:</strong> Using topK=3 balances context quality and response time. 
                        More results increase context but also processing time.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">→</span>
                      <div>
                        <strong>Embedding Model:</strong> text-embedding-3-small (1536 dimensions) provides excellent 
                        semantic search with fast retrieval.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">→</span>
                      <div>
                        <strong>Metadata Filtering:</strong> Including metadata in queries enables category-specific 
                        searches and improves relevance.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Context Engineering</h3>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div className="text-gray-600 mb-2">// Optimized prompt structure</div>
                  <div className="text-gray-800">
                    const prompt = `Based on the following information...<br/>
                    <br/>
                    Your Information:<br/>
                    $&#123;context&#125;<br/>
                    <br/>
                    Question: $&#123;question&#125;<br/>
                    <br/>
                    Provide a helpful, professional response:`
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Clear prompt structure improves LLM response quality and reduces hallucinations
                </p>
              </div>
            </div>
          </div>

          {/* Performance Enhancements */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Performance Enhancements</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Response Time Optimization</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">✓ Implemented</div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Parallel API calls (vector + LLM)</li>
                      <li>• Efficient data serialization</li>
                      <li>• Minimal DOM manipulations</li>
                      <li>• Optimized bundle size</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">💡 Future Enhancements</div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Response streaming</li>
                      <li>• Edge caching with CDN</li>
                      <li>• Connection pooling</li>
                      <li>• Request batching</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Caching Strategy</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-gray-900">Client-Side Caching</div>
                      <p className="text-sm text-gray-600 mt-1">
                        React state management caches responses during user session, reducing redundant API calls
                      </p>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-900">Metrics Caching</div>
                      <p className="text-sm text-gray-600 mt-1">
                        In-memory metrics storage avoids database overhead, with optional Redis integration for production
                      </p>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-900">Vector Cache</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Upstash Vector automatically caches frequently accessed embeddings at the database level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced RAG Techniques */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔬 Advanced RAG Techniques</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Hybrid Search (Future Enhancement)</h3>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-800 mb-3">
                    Combine semantic search with keyword matching for improved retrieval accuracy
                  </p>
                  <div className="bg-white p-3 rounded border border-blue-300 font-mono text-sm text-gray-800">
                    // Hybrid search implementation<br/>
                    const semanticResults = await vectorSearch(query);<br/>
                    const keywordResults = await keywordSearch(query);<br/>
                    const results = mergeAndRank(semanticResults, keywordResults);
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Re-ranking Strategy</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Current implementation uses Upstash Vector's cosine similarity scores. 
                    Future enhancements could include:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Cross-encoder re-ranking for higher precision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Diversity-based ranking to reduce redundancy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Temporal relevance weighting for recent information</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Query Expansion</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Enhance user queries with synonyms and related terms before vector search:
                  </p>
                  <div className="bg-white p-3 rounded border border-gray-300 font-mono text-sm text-gray-800">
                    "What is your experience?" → <br/>
                    "professional experience work history background employment"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Selection & Optimization */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 LLM Optimization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Model Selection</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Model</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Speed</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Quality</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 font-mono text-xs">llama-3.1-8b-instant</td>
                        <td className="px-4 py-3">⚡⚡⚡</td>
                        <td className="px-4 py-3">⭐⭐⭐</td>
                        <td className="px-4 py-3">Current (fast responses)</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 font-mono text-xs">llama-3.3-70b-versatile</td>
                        <td className="px-4 py-3">⚡⚡</td>
                        <td className="px-4 py-3">⭐⭐⭐⭐⭐</td>
                        <td className="px-4 py-3">Complex queries</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs">mixtral-8x7b</td>
                        <td className="px-4 py-3">⚡⚡</td>
                        <td className="px-4 py-3">⭐⭐⭐⭐</td>
                        <td className="px-4 py-3">Alternative option</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Prompt Engineering Best Practices</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">✓</span>
                      <div>
                        <strong>Clear Instructions:</strong> System message explicitly defines the AI's role and constraints
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">✓</span>
                      <div>
                        <strong>Context Boundaries:</strong> Separated context from user question for better parsing
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">✓</span>
                      <div>
                        <strong>Temperature Control:</strong> Set to 0.7 for balanced creativity and accuracy
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">✓</span>
                      <div>
                        <strong>Token Limits:</strong> Max 500 tokens ensures concise, focused responses
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Monitoring & Analytics */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Advanced Monitoring</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">P95 Latency</div>
                    <div className="text-sm text-gray-600 mt-1">Response time for 95% of requests</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">Cache Hit Rate</div>
                    <div className="text-sm text-gray-600 mt-1">Percentage of cached responses</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">Error Rate</div>
                    <div className="text-sm text-gray-600 mt-1">Failed requests per total</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Metrics (Future)</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800 mb-3">
                    <strong>Planned Enhancements:</strong>
                  </p>
                  <ul className="space-y-2 text-yellow-800 text-sm">
                    <li>• Response relevance scoring</li>
                    <li>• User feedback collection (thumbs up/down)</li>
                    <li>• Answer accuracy tracking</li>
                    <li>• Context retrieval precision metrics</li>
                    <li>• A/B testing framework for prompt variations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
