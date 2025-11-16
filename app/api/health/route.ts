import { NextRequest, NextResponse } from 'next/server';
import { Index } from '@upstash/vector';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const healthChecks: any = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {},
  };

  // Check environment variables
  healthChecks.checks.environment = {
    status: checkEnvironmentVariables(),
    message: checkEnvironmentVariables() === 'healthy' 
      ? 'All required environment variables are set' 
      : 'Missing required environment variables',
  };

  // Check Upstash Vector connection
  try {
    if (process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN) {
      const index = new Index({
        url: process.env.UPSTASH_VECTOR_REST_URL,
        token: process.env.UPSTASH_VECTOR_REST_TOKEN,
      });
      
      // Try to get info (lightweight check)
      const info = await index.info();
      healthChecks.checks.upstash = {
        status: 'healthy',
        message: 'Upstash Vector connection successful',
        vectorCount: info.vectorCount,
        dimension: info.dimension,
      };
    } else {
      healthChecks.checks.upstash = {
        status: 'unhealthy',
        message: 'Upstash credentials not configured',
      };
    }
  } catch (error) {
    healthChecks.checks.upstash = {
      status: 'unhealthy',
      message: 'Upstash Vector connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    healthChecks.status = 'degraded';
  }

  // Check Groq API
  try {
    if (process.env.GROQ_API_KEY) {
      // Just check if the key exists (actual API call would be in query endpoint)
      healthChecks.checks.groq = {
        status: 'healthy',
        message: 'Groq API key configured',
      };
    } else {
      healthChecks.checks.groq = {
        status: 'unhealthy',
        message: 'Groq API key not configured',
      };
      healthChecks.status = 'degraded';
    }
  } catch (error) {
    healthChecks.checks.groq = {
      status: 'unhealthy',
      message: 'Groq configuration failed',
    };
    healthChecks.status = 'degraded';
  }

  // Response time check
  const responseTime = Date.now() - startTime;
  healthChecks.checks.responseTime = {
    status: responseTime < 1000 ? 'healthy' : 'degraded',
    value: `${responseTime}ms`,
    message: responseTime < 1000 ? 'Response time normal' : 'Response time elevated',
  };

  // Overall status
  const allHealthy = Object.values(healthChecks.checks).every(
    (check: any) => check.status === 'healthy'
  );
  
  if (!allHealthy && healthChecks.status === 'healthy') {
    healthChecks.status = 'degraded';
  }

  const statusCode = healthChecks.status === 'healthy' ? 200 : 503;

  return NextResponse.json(healthChecks, { status: statusCode });
}

function checkEnvironmentVariables(): 'healthy' | 'unhealthy' {
  const required = [
    'UPSTASH_VECTOR_REST_URL',
    'UPSTASH_VECTOR_REST_TOKEN',
    'GROQ_API_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  return missing.length === 0 ? 'healthy' : 'unhealthy';
}
