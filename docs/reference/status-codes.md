---
title: Status Codes Reference
description: Complete reference for Relock API status codes and error responses
sidebar_label: Status Codes Reference
---

# Status Codes Reference

This page provides a comprehensive reference for all Relock API status codes, error responses, and their meanings.

## HTTP Status Codes

### Success Status Codes

#### 200 OK
The request was successful.

```json
{
  "status": "success",
  "data": {
    "userId": "user-uuid-123",
    "deviceId": "device-uuid-456",
    "authenticated": true,
    "permissions": ["read", "write", "admin"]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 201 Created
A new resource was successfully created.

```json
{
  "status": "created",
  "data": {
    "deviceId": "device-uuid-456",
    "registrationToken": "reg-token-789",
    "expiresAt": "2024-01-01T01:00:00Z"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 202 Accepted
The request has been accepted for processing.

```json
{
  "status": "accepted",
  "data": {
    "transactionId": "tx-uuid-123",
    "processingStatus": "pending",
    "estimatedCompletion": "2024-01-01T00:05:00Z"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Client Error Status Codes

#### 400 Bad Request
The request was malformed or contained invalid parameters.

```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request validation failed",
    "details": {
      "field": "userId",
      "issue": "Invalid UUID format",
      "value": "invalid-uuid"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 401 Unauthorized
Authentication is required or has failed.

```json
{
  "status": "error",
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Invalid or missing authentication credentials",
    "details": {
      "reason": "missing_api_key",
      "required": ["api_key", "gateway_uuid"]
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 403 Forbidden
The request was understood but the server is refusing to authorize it.

```json
{
  "status": "error",
  "error": {
    "code": "ACCESS_DENIED",
    "message": "Insufficient permissions for this operation",
    "details": {
      "required_permission": "admin",
      "user_permissions": ["read", "write"],
      "resource": "/api/admin/users"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 404 Not Found
The requested resource was not found.

```json
{
  "status": "error",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource does not exist",
    "details": {
      "resource_type": "device",
      "resource_id": "device-uuid-456",
      "suggestions": ["Check the device ID", "Verify the device exists"]
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 409 Conflict
The request conflicts with the current state of the resource.

```json
{
  "status": "error",
  "error": {
    "code": "RESOURCE_CONFLICT",
    "message": "The request conflicts with the current state",
    "details": {
      "conflict_type": "duplicate_device",
      "existing_device_id": "device-uuid-456",
      "resolution": "Use existing device or remove it first"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 422 Unprocessable Entity
The request was well-formed but cannot be processed due to semantic errors.

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "issue": "Invalid email format",
        "value": "invalid-email"
      },
      {
        "field": "password",
        "issue": "Password too short",
        "value": "123",
        "min_length": 8
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 429 Too Many Requests
The client has exceeded the rate limit.

```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "details": {
      "limit": 100,
      "window": "1 minute",
      "retry_after": 30,
      "reset_time": "2024-01-01T00:01:00Z"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Server Error Status Codes

#### 500 Internal Server Error
An unexpected error occurred on the server.

```json
{
  "status": "error",
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "details": {
      "error_id": "err-uuid-123",
      "timestamp": "2024-01-01T00:00:00Z",
      "contact_support": true
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 502 Bad Gateway
The server received an invalid response from an upstream server.

```json
{
  "status": "error",
  "error": {
    "code": "UPSTREAM_ERROR",
    "message": "Service temporarily unavailable",
    "details": {
      "upstream_service": "relock_core",
      "status": "unhealthy",
      "retry_after": 60
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 503 Service Unavailable
The service is temporarily unavailable.

```json
{
  "status": "error",
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Service temporarily unavailable",
    "details": {
      "maintenance": false,
      "estimated_recovery": "2024-01-01T00:10:00Z",
      "status_page": "https://status.relock.host"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 504 Gateway Timeout
The server did not receive a timely response from an upstream server.

```json
{
  "status": "error",
  "error": {
    "code": "TIMEOUT",
    "message": "Request timeout",
    "details": {
      "timeout_duration": 30000,
      "upstream_service": "relock_core",
      "retry_after": 10
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Relock-Specific Error Codes

### Authentication Errors

#### AUTH_INVALID_CREDENTIALS
```json
{
  "status": "error",
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "details": {
      "reason": "credentials_mismatch",
      "attempts_remaining": 2,
      "lockout_after": 3,
      "retry_after": 0
    }
  }
}
```

#### AUTH_ACCOUNT_LOCKED
```json
{
  "status": "error",
  "error": {
    "code": "AUTH_ACCOUNT_LOCKED",
    "message": "Account temporarily locked due to multiple failed attempts",
    "details": {
      "lockout_reason": "too_many_failed_attempts",
      "lockout_duration": 900000,
      "unlock_time": "2024-01-01T00:15:00Z",
      "contact_support": false
    }
  }
}
```

#### AUTH_DEVICE_NOT_REGISTERED
```json
{
  "status": "error",
  "error": {
    "code": "AUTH_DEVICE_NOT_REGISTERED",
    "message": "Device is not registered with this account",
    "details": {
      "device_id": "device-uuid-456",
      "registration_required": true,
      "registration_url": "/api/devices/register"
    }
  }
}
```

#### AUTH_SIGNATURE_INVALID
```json
{
  "status": "error",
  "error": {
    "code": "AUTH_SIGNATURE_INVALID",
    "message": "Cryptographic signature verification failed",
    "details": {
      "signature_type": "relock_proof",
      "verification_method": "elliptic_curve",
      "failure_reason": "signature_mismatch",
      "retryable": true
    }
  }
}
```

#### AUTH_SIGNATURE_EXPIRED
```json
{
  "status": "error",
  "error": {
    "code": "AUTH_SIGNATURE_EXPIRED",
    "message": "Cryptographic signature has expired",
    "details": {
      "signature_age": 3600000,
      "max_age": 300000,
      "timestamp": "2024-01-01T00:00:00Z",
      "retryable": true
    }
  }
}
```

### Device Errors

#### DEVICE_ALREADY_REGISTERED
```json
{
  "status": "error",
  "error": {
    "code": "DEVICE_ALREADY_REGISTERED",
    "message": "Device is already registered with this account",
    "details": {
      "device_id": "device-uuid-456",
      "registration_date": "2024-01-01T00:00:00Z",
      "last_used": "2024-01-01T00:00:00Z",
      "action": "use_existing_device"
    }
  }
}
```

#### DEVICE_REVOKED
```json
{
  "status": "error",
  "error": {
    "code": "DEVICE_REVOKED",
    "message": "Device access has been revoked",
    "details": {
      "device_id": "device-uuid-456",
      "revocation_date": "2024-01-01T00:00:00Z",
      "revocation_reason": "user_requested",
      "action": "re_register_device"
    }
  }
}
```

#### DEVICE_QUOTA_EXCEEDED
```json
{
  "status": "error",
  "error": {
    "code": "DEVICE_QUOTA_EXCEEDED",
    "message": "Maximum number of devices reached",
    "details": {
      "current_devices": 5,
      "max_devices": 5,
      "plan": "basic",
      "upgrade_url": "/pricing"
    }
  }
}
```

### Session Errors

#### SESSION_EXPIRED
```json
{
  "status": "error",
  "error": {
    "code": "SESSION_EXPIRED",
    "message": "Session has expired",
    "details": {
      "session_id": "session-uuid-789",
      "expired_at": "2024-01-01T00:00:00Z",
      "max_age": 3600000,
      "action": "re_authenticate"
    }
  }
}
```

#### SESSION_INVALID
```json
{
  "status": "error",
  "error": {
    "code": "SESSION_INVALID",
    "message": "Session is invalid or corrupted",
    "details": {
      "session_id": "session-uuid-789",
      "validation_failure": "signature_mismatch",
      "action": "re_authenticate"
    }
  }
}
```

#### SESSION_CONCURRENT_LIMIT
```json
{
  "status": "error",
  "error": {
    "code": "SESSION_CONCURRENT_LIMIT",
    "message": "Maximum concurrent sessions reached",
    "details": {
      "current_sessions": 3,
      "max_concurrent": 3,
      "oldest_session": "2024-01-01T00:00:00Z",
      "action": "terminate_old_session"
    }
  }
}
```

### Rate Limiting Errors

#### RATE_LIMIT_AUTH
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_AUTH",
    "message": "Too many authentication attempts",
    "details": {
      "limit": 5,
      "window": "15 minutes",
      "attempts": 5,
      "retry_after": 900,
      "reset_time": "2024-01-01T00:15:00Z"
    }
  }
}
```

#### RATE_LIMIT_API
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_API",
    "message": "API rate limit exceeded",
    "details": {
      "limit": 1000,
      "window": "1 hour",
      "requests": 1000,
      "retry_after": 3600,
      "reset_time": "2024-01-01T01:00:00Z"
    }
  }
}
```

#### RATE_LIMIT_DEVICE
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_DEVICE",
    "message": "Too many device registration attempts",
    "details": {
      "limit": 3,
      "window": "24 hours",
      "attempts": 3,
      "retry_after": 86400,
      "reset_time": "2024-01-02T00:00:00Z"
    }
  }
}
```

### Network and Infrastructure Errors

#### NETWORK_TIMEOUT
```json
{
  "status": "error",
  "error": {
    "code": "NETWORK_TIMEOUT",
    "message": "Network request timed out",
    "details": {
      "timeout_duration": 30000,
      "endpoint": "/api/verify",
      "retryable": true,
      "retry_after": 5
    }
  }
}
```

#### NETWORK_CONNECTION_FAILED
```json
{
  "status": "error",
  "error": {
    "code": "NETWORK_CONNECTION_FAILED",
    "message": "Failed to establish network connection",
    "details": {
      "endpoint": "/api/verify",
      "error_type": "ECONNREFUSED",
      "retryable": true,
      "retry_after": 10
    }
  }
}
```

#### SERVICE_MAINTENANCE
```json
{
  "status": "error",
  "error": {
    "code": "SERVICE_MAINTENANCE",
    "message": "Service is under maintenance",
    "details": {
      "maintenance_type": "scheduled",
      "start_time": "2024-01-01T00:00:00Z",
      "estimated_end": "2024-01-01T02:00:00Z",
      "status_page": "https://status.relock.host"
    }
  }
}
```

## Error Response Structure

### Standard Error Format

All error responses follow a consistent structure:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error context
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "request_id": "req-uuid-123"
}
```

### Error Code Categories

#### Authentication Errors (AUTH_*)
- `AUTH_INVALID_CREDENTIALS`
- `AUTH_ACCOUNT_LOCKED`
- `AUTH_DEVICE_NOT_REGISTERED`
- `AUTH_SIGNATURE_INVALID`
- `AUTH_SIGNATURE_EXPIRED`

#### Device Errors (DEVICE_*)
- `DEVICE_ALREADY_REGISTERED`
- `DEVICE_REVOKED`
- `DEVICE_QUOTA_EXCEEDED`
- `DEVICE_NOT_FOUND`
- `DEVICE_INVALID_STATE`

#### Session Errors (SESSION_*)
- `SESSION_EXPIRED`
- `SESSION_INVALID`
- `SESSION_CONCURRENT_LIMIT`
- `SESSION_NOT_FOUND`

#### Rate Limiting Errors (RATE_LIMIT_*)
- `RATE_LIMIT_AUTH`
- `RATE_LIMIT_API`
- `RATE_LIMIT_DEVICE`
- `RATE_LIMIT_GLOBAL`

#### Network Errors (NETWORK_*)
- `NETWORK_TIMEOUT`
- `NETWORK_CONNECTION_FAILED`
- `NETWORK_UNREACHABLE`

#### Service Errors (SERVICE_*)
- `SERVICE_MAINTENANCE`
- `SERVICE_OVERLOADED`
- `SERVICE_UNAVAILABLE`

## Handling Error Responses

### Client-Side Error Handling

```javascript
class RelockErrorHandler {
  constructor() {
    this.retryableCodes = [
      'NETWORK_TIMEOUT',
      'NETWORK_CONNECTION_FAILED',
      'SERVICE_OVERLOADED',
      'RATE_LIMIT_EXCEEDED'
    ];
    
    this.retryDelays = {
      'NETWORK_TIMEOUT': 5000,
      'NETWORK_CONNECTION_FAILED': 10000,
      'SERVICE_OVERLOADED': 30000,
      'RATE_LIMIT_EXCEEDED': 60000
    };
  }
  
  handleError(response) {
    if (response.ok) {
      return response;
    }
    
    return response.json().then(errorData => {
      const error = new RelockError(
        errorData.error.code,
        errorData.error.message,
        errorData.error.details,
        response.status
      );
      
      // Handle specific error types
      this.handleSpecificError(error);
      
      throw error;
    });
  }
  
  handleSpecificError(error) {
    switch (error.code) {
      case 'AUTH_ACCOUNT_LOCKED':
        this.handleAccountLocked(error);
        break;
        
      case 'DEVICE_REVOKED':
        this.handleDeviceRevoked(error);
        break;
        
      case 'RATE_LIMIT_EXCEEDED':
        this.handleRateLimitExceeded(error);
        break;
        
      case 'SERVICE_MAINTENANCE':
        this.handleServiceMaintenance(error);
        break;
        
      default:
        this.handleGenericError(error);
    }
  }
  
  handleAccountLocked(error) {
    const unlockTime = new Date(error.details.unlock_time);
    const now = new Date();
    const timeUntilUnlock = unlockTime - now;
    
    if (timeUntilUnlock > 0) {
      this.showLockoutMessage(timeUntilUnlock);
    } else {
      this.retryAuthentication();
    }
  }
  
  handleDeviceRevoked(error) {
    this.showDeviceRevokedMessage();
    this.redirectToDeviceRegistration();
  }
  
  handleRateLimitExceeded(error) {
    const retryAfter = error.details.retry_after * 1000;
    this.showRateLimitMessage(retryAfter);
    this.scheduleRetry(retryAfter);
  }
  
  handleServiceMaintenance(error) {
    const endTime = new Date(error.details.estimated_end);
    const now = new Date();
    const timeUntilEnd = endTime - now;
    
    this.showMaintenanceMessage(timeUntilEnd);
  }
  
  handleGenericError(error) {
    this.showErrorMessage(error.message);
    
    if (this.isRetryable(error.code)) {
      this.scheduleRetry(this.getRetryDelay(error.code));
    }
  }
  
  isRetryable(errorCode) {
    return this.retryableCodes.includes(errorCode);
  }
  
  getRetryDelay(errorCode) {
    return this.retryDelays[errorCode] || 5000;
  }
  
  scheduleRetry(delay) {
    setTimeout(() => {
      this.retryRequest();
    }, delay);
  }
  
  // Helper methods for UI updates
  showLockoutMessage(timeUntilUnlock) {
    const minutes = Math.ceil(timeUntilUnlock / 60000);
    console.log(`Account locked. Try again in ${minutes} minutes.`);
  }
  
  showDeviceRevokedMessage() {
    console.log('Device access has been revoked. Please re-register.');
  }
  
  showRateLimitMessage(retryAfter) {
    const seconds = Math.ceil(retryAfter / 1000);
    console.log(`Rate limit exceeded. Try again in ${seconds} seconds.`);
  }
  
  showMaintenanceMessage(timeUntilEnd) {
    const minutes = Math.ceil(timeUntilEnd / 60000);
    console.log(`Service under maintenance. Estimated completion in ${minutes} minutes.`);
  }
  
  showErrorMessage(message) {
    console.error(`Relock Error: ${message}`);
  }
  
  redirectToDeviceRegistration() {
    // Implementation for redirecting to device registration
  }
  
  retryAuthentication() {
    // Implementation for retrying authentication
  }
  
  retryRequest() {
    // Implementation for retrying the failed request
  }
}
```

### Server-Side Error Handling

```javascript
// Express.js middleware for handling Relock errors
const handleRelockErrors = (error, req, res, next) => {
  // Log the error
  console.error('Relock error:', {
    code: error.code,
    message: error.message,
    details: error.details,
    requestId: req.id,
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });
  
  // Map Relock error codes to HTTP status codes
  const statusCodeMap = {
    'AUTH_INVALID_CREDENTIALS': 401,
    'AUTH_ACCOUNT_LOCKED': 423,
    'AUTH_DEVICE_NOT_REGISTERED': 401,
    'AUTH_SIGNATURE_INVALID': 401,
    'AUTH_SIGNATURE_EXPIRED': 401,
    'DEVICE_ALREADY_REGISTERED': 409,
    'DEVICE_REVOKED': 403,
    'DEVICE_QUOTA_EXCEEDED': 429,
    'SESSION_EXPIRED': 401,
    'SESSION_INVALID': 401,
    'SESSION_CONCURRENT_LIMIT': 429,
    'RATE_LIMIT_AUTH': 429,
    'RATE_LIMIT_API': 429,
    'RATE_LIMIT_DEVICE': 429,
    'NETWORK_TIMEOUT': 504,
    'NETWORK_CONNECTION_FAILED': 502,
    'SERVICE_MAINTENANCE': 503,
    'SERVICE_OVERLOADED': 503
  };
  
  const statusCode = statusCodeMap[error.code] || 500;
  
  // Add retry headers for retryable errors
  const retryableCodes = [
    'NETWORK_TIMEOUT',
    'NETWORK_CONNECTION_FAILED',
    'SERVICE_OVERLOADED',
    'RATE_LIMIT_EXCEEDED'
  ];
  
  if (retryableCodes.includes(error.code)) {
    const retryAfter = error.details?.retry_after || 60;
    res.set('Retry-After', retryAfter);
  }
  
  // Send error response
  res.status(statusCode).json({
    status: 'error',
    error: {
      code: error.code,
      message: error.message,
      details: error.details
    },
    timestamp: new Date().toISOString(),
    request_id: req.id
  });
};

// Usage in Express app
app.use(handleRelockErrors);
```

## Best Practices

### Error Handling Best Practices

```javascript
const errorHandlingBestPractices = {
  // Always check response status
  checkResponse: async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new RelockError(
        errorData.error.code,
        errorData.error.message,
        errorData.error.details,
        response.status
      );
    }
    return response;
  },
  
  // Implement exponential backoff for retries
  retryWithBackoff: async (fn, maxRetries = 3, baseDelay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries || !error.isRetryable) {
          throw error;
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  },
  
  // Handle rate limiting gracefully
  handleRateLimit: (error) => {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      const retryAfter = error.details.retry_after * 1000;
      return new Promise(resolve => setTimeout(resolve, retryAfter));
    }
    throw error;
  },
  
  // Provide user-friendly error messages
  getUserFriendlyMessage: (error) => {
    const messageMap = {
      'AUTH_INVALID_CREDENTIALS': 'Invalid username or password. Please try again.',
      'AUTH_ACCOUNT_LOCKED': 'Account temporarily locked. Please try again later.',
      'DEVICE_REVOKED': 'Device access revoked. Please re-register your device.',
      'RATE_LIMIT_EXCEEDED': 'Too many attempts. Please wait before trying again.',
      'SERVICE_MAINTENANCE': 'Service temporarily unavailable. Please try again later.'
    };
    
    return messageMap[error.code] || error.message;
  }
};
```

### Monitoring and Alerting

```javascript
const errorMonitoring = {
  // Track error rates
  trackError: (error, context) => {
    const errorMetric = {
      code: error.code,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      context: context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Send to monitoring service
    sendToMonitoringService('relock_error', errorMetric);
  },
  
  // Alert on critical errors
  checkCriticalErrors: (error) => {
    const criticalCodes = [
      'SERVICE_MAINTENANCE',
      'SERVICE_OVERLOADED',
      'NETWORK_CONNECTION_FAILED'
    ];
    
    if (criticalCodes.includes(error.code)) {
      sendAlert('critical', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    }
  },
  
  // Track error patterns
  analyzeErrorPatterns: (errors) => {
    const patterns = errors.reduce((acc, error) => {
      acc[error.code] = (acc[error.code] || 0) + 1;
      return acc;
    }, {});
    
    // Send pattern analysis to monitoring service
    sendToMonitoringService('error_patterns', patterns);
  }
};
```

## Conclusion

This status codes reference provides comprehensive coverage of all Relock API status codes and error responses. Use this information to implement robust error handling in your applications and provide a better user experience.

For more information on error handling and integration patterns, see [Troubleshooting Guide](../deployment/troubleshooting.md) and [Best Practices](../security/best-practices.md).
