import { NextRequest, NextResponse } from 'next/server';
import { metrics, recordMetric, resetMetrics, formatUptime } from '@/lib/metrics';

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
  resetMetrics();
  return NextResponse.json({ success: true, message: 'Metrics reset' });
}
