---
title: Configuration Reference
description: Complete configuration reference for Relock
sidebar_label: Configuration Reference
---

# Configuration Reference

This page provides a comprehensive reference for all Relock configuration options, environment variables, and settings.

## Environment Variables

### Required Configuration

```bash
# Relock API credentials
RELOCK_API_KEY=your-secret-api-key
RELOCK_GATEWAY_UUID=your-gateway-uuid
RELOCK_BASE_URL=https://relock.host
```

### Optional Configuration

```bash
# Environment and deployment
RELOCK_ENVIRONMENT=production
RELOCK_LOG_LEVEL=info
RELOCK_TIMEOUT=10000

# Security settings
RELOCK_MAX_RETRIES=3
RELOCK_RATE_LIMIT=100
RELOCK_CACHE_TTL=30000

# Monitoring and logging
RELOCK_METRICS_ENABLED=true
RELOCK_DEBUG_MODE=false
RELOCK_AUDIT_LOGGING=true
```

## Configuration Objects

### Basic Configuration

```javascript
const relockConfig = {
  // Required settings
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: process.env.RELOCK_BASE_URL,
  
  // Optional settings
  environment: process.env.RELOCK_ENVIRONMENT || 'production',
  timeout: parseInt(process.env.RELOCK_TIMEOUT) || 10000,
  maxRetries: parseInt(process.env.RELOCK_MAX_RETRIES) || 3
};
```

### Advanced Configuration

```javascript
const advancedRelockConfig = {
  // Basic settings
  ...relockConfig,
  
  // Security settings
  security: {
    rateLimit: {
      enabled: true,
      maxRequests: parseInt(process.env.RELOCK_RATE_LIMIT) || 100,
      windowMs: 60000 // 1 minute
    },
    cache: {
      enabled: true,
      ttl: parseInt(process.env.RELOCK_CACHE_TTL) || 30000,
      maxSize: 1000
    },
    retry: {
      enabled: true,
      maxAttempts: parseInt(process.env.RELOCK_MAX_RETRIES) || 3,
      backoffMultiplier: 2,
      initialDelay: 1000
    }
  },
  
  // Monitoring settings
  monitoring: {
    metrics: process.env.RELOCK_METRICS_ENABLED === 'true',
    debug: process.env.RELOCK_DEBUG_MODE === 'true',
    auditLogging: process.env.RELOCK_AUDIT_LOGGING === 'true'
  },
  
  // Logging settings
  logging: {
    level: process.env.RELOCK_LOG_LEVEL || 'info',
    format: 'json',
    destination: 'console'
  }
};
```

## Platform-Specific Configuration

### Node.js Configuration

```javascript
// config/relock.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  relock: {
    apiKey: process.env.RELOCK_API_KEY,
    gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
    baseUrl: process.env.RELOCK_BASE_URL,
    environment: process.env.NODE_ENV || 'development',
    
    // Node.js specific settings
    timeout: parseInt(process.env.RELOCK_TIMEOUT) || 10000,
    keepAlive: true,
    maxSockets: 50,
    
    // Security
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RELOCK_RATE_LIMIT) || 100
    },
    
    // Caching
    cache: {
      ttl: parseInt(process.env.RELOCK_CACHE_TTL) || 30000,
      checkPeriod: 60000 // 1 minute
    }
  }
};
```

### Python Configuration

```python
# config/relock_config.py
import os
from typing import Optional, Dict, Any
from dataclasses import dataclass

@dataclass
class RelockConfig:
    api_key: str
    gateway_uuid: str
    base_url: str
    environment: str = "production"
    timeout: int = 10
    max_retries: int = 3
    rate_limit: int = 100
    cache_ttl: int = 30
    
    @classmethod
    def from_env(cls) -> "RelockConfig":
        return cls(
            api_key=os.getenv("RELOCK_API_KEY"),
            gateway_uuid=os.getenv("RELOCK_GATEWAY_UUID"),
            base_url=os.getenv("RELOCK_BASE_URL"),
            environment=os.getenv("RELOCK_ENVIRONMENT", "production"),
            timeout=int(os.getenv("RELOCK_TIMEOUT", "10")),
            max_retries=int(os.getenv("RELOCK_MAX_RETRIES", "3")),
            rate_limit=int(os.getenv("RELOCK_RATE_LIMIT", "100")),
            cache_ttl=int(os.getenv("RELOCK_CACHE_TTL", "30"))
        )

# Usage
config = RelockConfig.from_env()
```

### React Configuration

```javascript
// config/relock.js
const config = {
  relock: {
    baseUrl: process.env.REACT_APP_RELOCK_BASE_URL || 'https://relock.host',
    gatewayUuid: process.env.REACT_APP_RELOCK_GATEWAY_UUID,
    environment: process.env.NODE_ENV || 'development',
    
    // Frontend specific settings
    redirectTimeout: 5000,
    popupEnabled: false,
    deepLinkScheme: process.env.REACT_APP_DEEP_LINK_SCHEME || 'yourapp',
    
    // UI settings
    ui: {
      theme: 'light',
      language: 'en',
      showBranding: true
    }
  }
};

export default config;
```

## Security Configuration

### Rate Limiting

```javascript
const rateLimitConfig = {
  // Global rate limiting
  global: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  },
  
  // Authentication-specific rate limiting
  authentication: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 authentication attempts per windowMs
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true
  },
  
  // API-specific rate limiting
  api: {
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 API requests per minute
    message: 'API rate limit exceeded, please try again later.'
  }
};
```

### Caching Configuration

```javascript
const cacheConfig = {
  // Memory cache
  memory: {
    enabled: true,
    ttl: 30000, // 30 seconds
    maxSize: 1000,
    cleanupInterval: 60000 // 1 minute
  },
  
  // Redis cache (if available)
  redis: {
    enabled: process.env.REDIS_URL ? true : false,
    url: process.env.REDIS_URL,
    ttl: 30000,
    keyPrefix: 'relock:'
  },
  
  // HTTP cache headers
  http: {
    enabled: true,
    maxAge: 30, // 30 seconds
    staleWhileRevalidate: 60, // 60 seconds
    mustRevalidate: true
  }
};
```

### Retry Configuration

```javascript
const retryConfig = {
  // Basic retry settings
  enabled: true,
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  
  // Exponential backoff
  backoff: {
    type: 'exponential',
    multiplier: 2,
    maxDelay: 30000 // 30 seconds
  },
  
  // Retry conditions
  retryOn: [
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT',
    'ECONNREFUSED'
  ],
  
  // Don't retry on these status codes
  retryOnStatusCodes: [408, 429, 500, 502, 503, 504],
  
  // Don't retry on these HTTP methods
  retryOnMethods: ['GET', 'HEAD', 'OPTIONS']
};
```

## Monitoring and Logging

### Metrics Configuration

```javascript
const metricsConfig = {
  // Basic metrics
  enabled: true,
  collectionInterval: 60000, // 1 minute
  
  // Metrics to collect
  metrics: {
    requestCount: true,
    responseTime: true,
    errorRate: true,
    cacheHitRate: true,
    rateLimitHits: true
  },
  
  // Export settings
  export: {
    prometheus: process.env.PROMETHEUS_ENABLED === 'true',
    statsd: process.env.STATSD_ENABLED === 'true',
    custom: process.env.CUSTOM_METRICS_ENABLED === 'true'
  }
};
```

### Logging Configuration

```javascript
const loggingConfig = {
  // Log levels
  level: process.env.RELOCK_LOG_LEVEL || 'info',
  
  // Log format
  format: process.env.RELOCK_LOG_FORMAT || 'json',
  
  // Log destinations
  destinations: {
    console: true,
    file: process.env.RELOCK_LOG_FILE ? true : false,
    syslog: process.env.RELOCK_SYSLOG_ENABLED === 'true',
    external: process.env.RELOCK_EXTERNAL_LOGGING_URL ? true : false
  },
  
  // File logging (if enabled)
  file: {
    path: process.env.RELOCK_LOG_FILE || './logs/relock.log',
    maxSize: '10m',
    maxFiles: 5,
    compress: true
  },
  
  // External logging (if enabled)
  external: {
    url: process.env.RELOCK_EXTERNAL_LOGGING_URL,
    batchSize: 100,
    batchTimeout: 5000
  }
};
```

### Audit Logging

```javascript
const auditConfig = {
  // Enable audit logging
  enabled: process.env.RELOCK_AUDIT_LOGGING === 'true',
  
  // Events to audit
  events: {
    authentication: true,
    authorization: true,
    dataAccess: true,
    configuration: true,
    security: true
  },
  
  // Audit data retention
  retention: {
    enabled: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    maxSize: '1GB'
  },
  
  // Audit export
  export: {
    enabled: process.env.RELOCK_AUDIT_EXPORT_ENABLED === 'true',
    format: 'json',
    destination: process.env.RELOCK_AUDIT_EXPORT_DESTINATION || 's3'
  }
};
```

## Environment-Specific Configuration

### Development Configuration

```javascript
// config/development.js
module.exports = {
  relock: {
    ...baseConfig,
    environment: 'development',
    debug: true,
    logging: {
      level: 'debug',
      format: 'pretty'
    },
    security: {
      rateLimit: {
        enabled: false // Disable rate limiting in development
      },
      cache: {
        enabled: false // Disable caching in development
      }
    }
  }
};
```

### Staging Configuration

```javascript
// config/staging.js
module.exports = {
  relock: {
    ...baseConfig,
    environment: 'staging',
    debug: false,
    logging: {
      level: 'info',
      format: 'json'
    },
    security: {
      rateLimit: {
        enabled: true,
        maxRequests: 50 // Lower limits for staging
      }
    }
  }
};
```

### Production Configuration

```javascript
// config/production.js
module.exports = {
  relock: {
    ...baseConfig,
    environment: 'production',
    debug: false,
    logging: {
      level: 'warn',
      format: 'json'
    },
    security: {
      rateLimit: {
        enabled: true,
        maxRequests: 100
      },
      cache: {
        enabled: true,
        ttl: 60000 // 1 minute in production
      }
    },
    monitoring: {
      metrics: true,
      alerting: true
    }
  }
};
```

## Configuration Validation

### Schema Validation

```javascript
const Joi = require('joi');

const relockConfigSchema = Joi.object({
  apiKey: Joi.string().required(),
  gatewayUuid: Joi.string().uuid().required(),
  baseUrl: Joi.string().uri().required(),
  environment: Joi.string().valid('development', 'staging', 'production').default('production'),
  timeout: Joi.number().integer().min(1000).max(60000).default(10000),
  maxRetries: Joi.number().integer().min(0).max(10).default(3),
  rateLimit: Joi.number().integer().min(1).max(10000).default(100),
  cacheTtl: Joi.number().integer().min(1000).max(300000).default(30000)
});

function validateConfig(config) {
  const { error, value } = relockConfigSchema.validate(config);
  
  if (error) {
    throw new Error(`Invalid Relock configuration: ${error.message}`);
  }
  
  return value;
}

// Usage
const validatedConfig = validateConfig(relockConfig);
```

### Environment Variable Validation

```javascript
function validateEnvironmentVariables() {
  const required = [
    'RELOCK_API_KEY',
    'RELOCK_GATEWAY_UUID',
    'RELOCK_BASE_URL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate API key format
  if (!process.env.RELOCK_API_KEY.match(/^[A-Za-z0-9]{32,}$/)) {
    throw new Error('Invalid RELOCK_API_KEY format');
  }
  
  // Validate gateway UUID format
  if (!process.env.RELOCK_GATEWAY_UUID.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    throw new Error('Invalid RELOCK_GATEWAY_UUID format');
  }
  
  // Validate base URL
  try {
    new URL(process.env.RELOCK_BASE_URL);
  } catch (error) {
    throw new Error('Invalid RELOCK_BASE_URL format');
  }
}

// Call validation on startup
validateEnvironmentVariables();
```

## Configuration Best Practices

### Security Best Practices

```javascript
const securityBestPractices = {
  // Never log sensitive information
  logging: {
    redactFields: ['apiKey', 'gatewayUuid', 'signature', 'token']
  },
  
  // Use environment variables for secrets
  secrets: {
    useEnvVars: true,
    neverHardcode: true,
    useSecretManager: process.env.USE_SECRET_MANAGER === 'true'
  },
  
  // Validate all configuration
  validation: {
    validateOnStartup: true,
    validateOnReload: true,
    failOnInvalidConfig: true
  }
};
```

### Performance Best Practices

```javascript
const performanceBestPractices = {
  // Optimize caching
  cache: {
    useMemoryCache: true,
    useRedisCache: process.env.REDIS_URL ? true : false,
    optimizeTtl: true
  },
  
  // Optimize rate limiting
  rateLimit: {
    useRedis: process.env.REDIS_URL ? true : false,
    optimizeWindow: true
  },
  
  // Connection pooling
  connections: {
    useConnectionPool: true,
    maxConnections: 100,
    idleTimeout: 30000
  }
};
```

### Monitoring Best Practices

```javascript
const monitoringBestPractices = {
  // Comprehensive metrics
  metrics: {
    collectAllMetrics: true,
    useHistograms: true,
    trackPercentiles: [50, 90, 95, 99]
  },
  
  // Structured logging
  logging: {
    useStructuredLogs: true,
    includeContext: true,
    useCorrelationIds: true
  },
  
  // Health checks
  health: {
    enableHealthChecks: true,
    checkInterval: 30000,
    includeDependencies: true
  }
};
```

## Configuration Examples by Use Case

### Simple Integration

```javascript
// Minimal configuration for simple integration
const simpleConfig = {
  relock: {
    apiKey: process.env.RELOCK_API_KEY,
    gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
    baseUrl: process.env.RELOCK_BASE_URL
  }
};
```

### Enterprise Integration

```javascript
// Comprehensive configuration for enterprise use
const enterpriseConfig = {
  relock: {
    apiKey: process.env.RELOCK_API_KEY,
    gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
    baseUrl: process.env.RELOCK_BASE_URL,
    environment: process.env.RELOCK_ENVIRONMENT || 'production',
    
    // Security
    security: {
      rateLimit: { enabled: true, maxRequests: 1000 },
      cache: { enabled: true, ttl: 60000 },
      retry: { enabled: true, maxAttempts: 5 }
    },
    
    // Monitoring
    monitoring: {
      metrics: true,
      alerting: true,
      auditLogging: true
    },
    
    // Logging
    logging: {
      level: 'info',
      format: 'json',
      destinations: ['console', 'file', 'syslog']
    }
  }
};
```

### High-Performance Integration

```javascript
// Configuration optimized for high performance
const highPerformanceConfig = {
  relock: {
    apiKey: process.env.RELOCK_API_KEY,
    gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
    baseUrl: process.env.RELOCK_BASE_URL,
    
    // Performance optimizations
    performance: {
      connectionPool: { maxConnections: 500, idleTimeout: 60000 },
      cache: { ttl: 120000, maxSize: 10000 }, // 2 minutes, 10k entries
      rateLimit: { maxRequests: 10000 }, // Higher limits
      timeout: 5000 // Lower timeout for faster failure
    },
    
    // Monitoring for performance
    monitoring: {
      metrics: true,
      performanceTracking: true,
      slowQueryThreshold: 1000 // Alert on queries > 1s
    }
  }
};
```

## Conclusion

This configuration reference provides comprehensive coverage of all Relock configuration options. Use these examples and best practices to configure Relock according to your specific requirements and environment.

For more information on specific configuration aspects, see [Security Hardening](../deployment/security-hardening.md) and [Best Practices](../security/best-practices.md).
