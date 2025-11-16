'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Metrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  cacheHits: number;
  cacheMisses: number;
  vectorSearches: number;
  averageVectorSearchTime: number;
  uptimeFormatted: string;
  requestsPerMinute: number;
  errorRate: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  cacheHitRate: string;
}

interface HealthCheck {
  status: string;
  timestamp: string;
  checks: {
    [key: string]: {
      status: string;
      message: string;
      [key: string]: any;
    };
  };
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchMetrics = async () => {
    try {
      const [metricsRes, healthRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/health'),
      ]);

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data.metrics);
      }

      if (healthRes.ok) {
        const data = await healthRes.json();
        setHealth(data);
      }
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetMetrics = async () => {
    if (!confirm('Are you sure you want to reset all metrics?')) return;
    
    try {
      await fetch('/api/metrics', { method: 'DELETE' });
      fetchMetrics();
    } catch (error) {
      console.error('Error resetting metrics:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    const interval = autoRefresh ? setInterval(fetchMetrics, 5000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'unhealthy': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 border-green-300';
      case 'degraded': return 'bg-yellow-100 border-yellow-300';
      case 'unhealthy': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">Kevin Fuschetto</Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition">Home</Link>
            <Link href="/monitoring" className="text-gray-900 font-semibold">Monitoring</Link>
            <Link href="/scalability" className="text-gray-600 hover:text-gray-900 transition">Scalability</Link>
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">System Monitoring</h1>
              <p className="text-lg text-gray-600">Real-time performance metrics and health status</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  autoRefresh 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {autoRefresh ? '● Auto-Refresh (5s)' : 'Auto-Refresh OFF'}
              </button>
              <button
                onClick={fetchMetrics}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Refresh Now
              </button>
              <button
                onClick={resetMetrics}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Reset Metrics
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Loading monitoring data...</div>
            </div>
          ) : (
            <>
              {/* System Health Status */}
              {health && (
                <div className={`mb-8 p-6 rounded-lg border-2 ${getStatusBg(health.status)}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
                    <span className={`text-lg font-bold uppercase ${getStatusColor(health.status)}`}>
                      {health.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(health.checks).map(([key, check]) => (
                      <div key={key} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 capitalize">{key}</span>
                          <span className={`text-sm font-bold ${getStatusColor(check.status)}`}>
                            {check.status === 'healthy' ? '✓' : '✗'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{check.message}</p>
                        {check.vectorCount !== undefined && (
                          <p className="text-xs text-gray-500 mt-1">Vectors: {check.vectorCount}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {metrics && (
                <>
                  {/* Key Metrics Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">Total Requests</div>
                      <div className="text-3xl font-bold text-gray-900">{metrics.totalRequests}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {metrics.successfulRequests} successful / {metrics.failedRequests} failed
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
                      <div className="text-3xl font-bold text-gray-900">
                        {metrics.averageResponseTime.toFixed(0)}ms
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        P95: {metrics.p95ResponseTime.toFixed(0)}ms / P99: {metrics.p99ResponseTime.toFixed(0)}ms
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">Cache Hit Rate</div>
                      <div className="text-3xl font-bold text-gray-900">{metrics.cacheHitRate}%</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {metrics.cacheHits} hits / {metrics.cacheMisses} misses
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">System Uptime</div>
                      <div className="text-3xl font-bold text-gray-900">{metrics.uptimeFormatted}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {metrics.requestsPerMinute.toFixed(2)} req/min
                      </div>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Request Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-semibold text-gray-900">
                            {metrics.totalRequests > 0 
                              ? ((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(1) 
                              : 0}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Error Rate</span>
                          <span className={`font-semibold ${metrics.errorRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
                            {metrics.errorRate.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Throughput</span>
                          <span className="font-semibold text-gray-900">
                            {metrics.requestsPerMinute.toFixed(2)} req/min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Vector Search Performance</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Total Searches</span>
                          <span className="font-semibold text-gray-900">{metrics.vectorSearches}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Avg Search Time</span>
                          <span className="font-semibold text-gray-900">
                            {metrics.averageVectorSearchTime.toFixed(0)}ms
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-gray-600">Search/Request Ratio</span>
                          <span className="font-semibold text-gray-900">
                            {metrics.totalRequests > 0 
                              ? (metrics.vectorSearches / metrics.totalRequests).toFixed(2) 
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
