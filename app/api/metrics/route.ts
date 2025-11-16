import { NextRequest, NextResponse } from 'next/server';

// In-memory metrics storage (in production, use Redis or a proper metrics database)
interface Metrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalResponseTime: number;
  averageResponseTime: number;
  cacheHits: number;
  cacheMisses: number;
  vectorSearches: number;
  totalVectorSearchTime: number;
  averageVectorSearchTime: number;
  uptime: number;
  startTime: number;
  lastRequestTime: number;
  requestsPerMinute: number;
  errorRate: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  recentResponseTimes: number[];
}

// Global metrics object
let metrics: Metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalResponseTime: 0,
  averageResponseTime: 0,
  cacheHits: 0,
  cacheMisses: 0,
  vectorSearches: 0,
  totalVectorSearchTime: 0,
  averageVectorSearchTime: 0,
  uptime: 0,
  startTime: Date.now(),
  lastRequestTime: Date.now(),
  requestsPerMinute: 0,
  errorRate: 0,
  p95ResponseTime: 0,
  p99ResponseTime: 0,
  recentResponseTimes: [],
};

// Calculate percentiles
function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

// Update metrics
export function recordMetric(type: string, value?: number, success: boolean = true) {
  if (type === 'request') {
    metrics.totalRequests++;
    if (success) {
      metrics.successfulRequests++;
      if (value) {
        metrics.totalResponseTime += value;
        metrics.averageResponseTime = metrics.totalResponseTime / metrics.successfulRequests;
        metrics.recentResponseTimes.push(value);
        
        // Keep only last 1000 response times for percentile calculation
        if (metrics.recentResponseTimes.length > 1000) {
          metrics.recentResponseTimes.shift();
        }
        
        metrics.p95ResponseTime = calculatePercentile(metrics.recentResponseTimes, 95);
        metrics.p99ResponseTime = calculatePercentile(metrics.recentResponseTimes, 99);
      }
    } else {
      metrics.failedRequests++;
    }
    metrics.lastRequestTime = Date.now();
    metrics.errorRate = (metrics.failedRequests / metrics.totalRequests) * 100;
  } else if (type === 'cache_hit') {
    metrics.cacheHits++;
  } else if (type === 'cache_miss') {
    metrics.cacheMisses++;
  } else if (type === 'vector_search') {
    metrics.vectorSearches++;
    if (value) {
      metrics.totalVectorSearchTime += value;
      metrics.averageVectorSearchTime = metrics.totalVectorSearchTime / metrics.vectorSearches;
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Calculate uptime
    metrics.uptime = Date.now() - metrics.startTime;
    
    // Calculate requests per minute
    const uptimeMinutes = metrics.uptime / 60000;
    metrics.requestsPerMinute = uptimeMinutes > 0 ? metrics.totalRequests / uptimeMinutes : 0;

    // Calculate cache hit rate
    const totalCacheRequests = metrics.cacheHits + metrics.cacheMisses;
    const cacheHitRate = totalCacheRequests > 0 ? (metrics.cacheHits / totalCacheRequests) * 100 : 0;

    return NextResponse.json({
      metrics: {
        ...metrics,
        uptimeFormatted: formatUptime(metrics.uptime),
        cacheHitRate: cacheHitRate.toFixed(2),
      },
      timestamp: new Date().toISOString(),
      status: 'healthy',
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, value, success } = body;

    recordMetric(type, value, success);

    return NextResponse.json({ success: true, message: 'Metric recorded' });
  } catch (error) {
    console.error('Error recording metric:', error);
    return NextResponse.json(
      { error: 'Failed to record metric' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Reset metrics
  metrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalResponseTime: 0,
    averageResponseTime: 0,
    cacheHits: 0,
    cacheMisses: 0,
    vectorSearches: 0,
    totalVectorSearchTime: 0,
    averageVectorSearchTime: 0,
    uptime: 0,
    startTime: Date.now(),
    lastRequestTime: Date.now(),
    requestsPerMinute: 0,
    errorRate: 0,
    p95ResponseTime: 0,
    p99ResponseTime: 0,
    recentResponseTimes: [],
  };

  return NextResponse.json({ success: true, message: 'Metrics reset' });
}

function formatUptime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}
