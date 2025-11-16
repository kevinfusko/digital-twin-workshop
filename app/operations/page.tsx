'use client';

import Link from 'next/link';

export default function OperationsPage() {
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
            <Link href="/operations" className="text-gray-900 font-semibold">Operations</Link>
            <Link href="/github" className="text-gray-600 hover:text-gray-900 transition">GitHub</Link>
            <Link href="/advanced" className="text-gray-600 hover:text-gray-900 transition">Advanced</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Operations & Maintenance</h1>
            <p className="text-lg text-gray-600">Production procedures, deployment guides, and incident response</p>
          </div>

          {/* Deployment Process */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Deployment Process</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Pre-Deployment Checklist</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>All environment variables configured in Vercel dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>TypeScript compilation successful (pnpm build)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>All tests passing locally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Upstash Vector database populated with current data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Groq API key valid and has sufficient credits</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Deployment Steps</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <div className="text-gray-600"># Commit and push changes</div>
                  <div>git add .</div>
                  <div>git commit -m "Description of changes"</div>
                  <div>git push origin main</div>
                  <div className="text-gray-600 mt-4"># Vercel automatically deploys on push</div>
                  <div className="text-gray-600"># Monitor deployment at vercel.com/dashboard</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Post-Deployment Verification</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>Check deployment status in Vercel dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>Test /api/health endpoint for system health</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>Verify AI assistant functionality on homepage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>Run load test from /scalability page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span>Monitor /monitoring dashboard for anomalies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Monitoring & Alerts */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Monitoring & Alerts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Metrics to Monitor</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">System Health</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• API response times {'<'} 2000ms</li>
                      <li>• Error rate {'<'} 5%</li>
                      <li>• Success rate {'>'} 95%</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">External Services</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Upstash Vector connectivity</li>
                      <li>• Groq API availability</li>
                      <li>• Vector search latency {'<'} 1000ms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Monitoring Endpoints</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <div><span className="text-blue-600">GET</span> /api/health - System health check</div>
                  <div><span className="text-blue-600">GET</span> /api/metrics - Performance metrics</div>
                  <div><span className="text-blue-600">GET</span> /monitoring - Real-time dashboard</div>
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Recovery */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💾 Backup & Recovery Strategy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Data Backup</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Profile Data:</strong> digitaltwin.json stored in Git repository</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Vector Database:</strong> Upstash provides automatic backups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Code:</strong> GitHub repository serves as version control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span><strong>Configuration:</strong> Environment variables documented in README</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Recovery Procedures</h3>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="font-semibold text-red-900 mb-2">In case of service degradation:</div>
                  <ol className="space-y-2 text-red-800 text-sm">
                    <li>1. Check /api/health endpoint for failing services</li>
                    <li>2. Verify environment variables in Vercel dashboard</li>
                    <li>3. Review Vercel deployment logs for errors</li>
                    <li>4. Test Upstash Vector connection independently</li>
                    <li>5. Validate Groq API key and rate limits</li>
                    <li>6. Roll back to previous deployment if needed</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Response */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚨 Incident Response</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Common Issues & Solutions</h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">❌ High Error Rate ({'>'} 5%)</div>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div><strong>Possible Causes:</strong> Groq API rate limits, Upstash connection issues</div>
                      <div><strong>Resolution:</strong> Check API quotas, verify network connectivity, review error logs</div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">⏱️ Slow Response Times ({'>'} 3s)</div>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div><strong>Possible Causes:</strong> Vector search latency, LLM generation time</div>
                      <div><strong>Resolution:</strong> Reduce topK results, optimize prompts, check Upstash performance</div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">🔌 Service Unavailable</div>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div><strong>Possible Causes:</strong> Environment variable misconfiguration, external API outage</div>
                      <div><strong>Resolution:</strong> Verify all env vars, check service status pages, test APIs independently</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rollback Procedures */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⏪ Rollback Procedures</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Rollback via Vercel</h3>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Go to Vercel dashboard → Deployments</li>
                  <li>2. Find the last stable deployment</li>
                  <li>3. Click "Promote to Production"</li>
                  <li>4. Verify rollback via /api/health endpoint</li>
                  <li>5. Monitor /monitoring dashboard for stability</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="font-semibold text-gray-900 mb-2">Git Rollback</div>
                <div className="font-mono text-sm space-y-1 text-gray-700">
                  <div>git log --oneline  # Find commit to revert to</div>
                  <div>git revert [commit-hash]</div>
                  <div>git push origin main</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
