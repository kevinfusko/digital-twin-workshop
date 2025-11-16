'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTime: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errors: string[];
}

export default function ScalabilityPage() {
  const [concurrency, setConcurrency] = useState(10);
  const [totalRequests, setTotalRequests] = useState(50);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoadTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runLoadTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/load-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concurrency, totalRequests }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Load test failed');
      }

      setResult(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceGrade = (rps: number) => {
    if (rps >= 10) return { grade: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (rps >= 5) return { grade: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (rps >= 2) return { grade: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">Kevin Fuschetto</Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition">Home</Link>
            <Link href="/monitoring" className="text-gray-600 hover:text-gray-900 transition">Monitoring</Link>
            <Link href="/scalability" className="text-gray-900 font-semibold">Scalability</Link>
            <Link href="/operations" className="text-gray-600 hover:text-gray-900 transition">Operations</Link>
            <Link href="/github" className="text-gray-600 hover:text-gray-900 transition">GitHub</Link>
            <Link href="/advanced" className="text-gray-600 hover:text-gray-900 transition">Advanced</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">System Scalability</h1>
            <p className="text-lg text-gray-600">Load testing and performance optimization strategies</p>
          </div>

          {/* Load Test Configuration */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Load Test Configuration</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Concurrent Connections
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={concurrency}
                  onChange={(e) => setConcurrency(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-1">Maximum: 100 concurrent connections</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Requests
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={totalRequests}
                  onChange={(e) => setTotalRequests(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-1">Maximum: 500 total requests</p>
              </div>
            </div>

            <button
              onClick={runLoadTest}
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Running Load Test...' : 'Start Load Test'}
            </button>

            {loading && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-semibold">⚡ Load test in progress...</p>
                <p className="text-blue-600 text-sm mt-1">
                  Running {totalRequests} requests with {concurrency} concurrent connections
                </p>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold text-red-900 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Load Test Results */}
          {result && (
            <>
              {/* Performance Summary */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Summary</h2>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                    <div className={`text-3xl font-bold ${
                      result.successfulRequests / result.totalRequests >= 0.95 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {((result.successfulRequests / result.totalRequests) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {result.successfulRequests}/{result.totalRequests}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Requests/Second</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.requestsPerSecond.toFixed(2)}
                    </div>
                    <div className={`text-sm font-semibold mt-1 px-2 py-1 rounded ${
                      getPerformanceGrade(result.requestsPerSecond).bg
                    } ${getPerformanceGrade(result.requestsPerSecond).color}`}>
                      {getPerformanceGrade(result.requestsPerSecond).grade}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.averageResponseTime.toFixed(0)}ms
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Min: {result.minResponseTime.toFixed(0)}ms
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Duration</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {(result.totalTime / 1000).toFixed(1)}s
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Max: {result.maxResponseTime.toFixed(0)}ms
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Response Time Percentiles</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">P50 (Median)</span>
                      <span className="font-semibold text-gray-900">{result.p50ResponseTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">P95</span>
                      <span className="font-semibold text-gray-900">{result.p95ResponseTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">P99</span>
                      <span className="font-semibold text-gray-900">{result.p99ResponseTime.toFixed(0)}ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Request Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Successful</span>
                      <span className="font-semibold text-green-600">{result.successfulRequests}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Failed</span>
                      <span className="font-semibold text-red-600">{result.failedRequests}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Error Rate</span>
                      <span className={`font-semibold ${
                        result.failedRequests === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {((result.failedRequests / result.totalRequests) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Errors Encountered</h3>
                  <ul className="space-y-2">
                    {result.errors.map((error, i) => (
                      <li key={i} className="text-red-700 text-sm">• {error}</li>
                    ))}
                  </ul>
                  {result.errors.length >= 5 && (
                    <p className="text-red-600 text-sm mt-2 italic">Showing first 5 errors only</p>
                  )}
                </div>
              )}

              {/* Optimization Strategies */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Scalability Optimizations</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Vector Database Optimization</h3>
                    <p className="text-gray-600">Using Upstash Vector for fast, distributed semantic search with automatic scaling</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Efficient LLM Integration</h3>
                    <p className="text-gray-600">Groq's LLaMA 3.3 70B model provides high-performance inference with low latency</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Serverless Architecture</h3>
                    <p className="text-gray-600">Next.js API routes deployed on Vercel scale automatically with demand</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Performance Monitoring</h3>
                    <p className="text-gray-600">Real-time metrics tracking for proactive performance optimization</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Caching Strategy</h3>
                    <p className="text-gray-600">Response caching reduces redundant API calls and improves response times</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Error Handling</h3>
                    <p className="text-gray-600">Graceful degradation and retry logic ensure high availability</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
