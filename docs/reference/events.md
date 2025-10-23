---
title: Events Reference
description: Complete reference for Relock JavaScript events
sidebar_label: Events Reference
---

# Events Reference

This page provides a comprehensive reference for all Relock JavaScript events, their properties, and usage examples.

## Event Overview

Relock emits various events throughout the authentication lifecycle to provide real-time feedback and enable integration with your application logic.

## Core Events

### X-Key-Established

Emitted when a cryptographic key is successfully established between the client and Relock.

```javascript
// Event details
{
  type: 'X-Key-Established',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  keyStrength: '256-bit',
  origin: 'https://yourapp.com',
  userAgent: 'Mozilla/5.0...'
}

// Event listener
document.addEventListener('X-Key-Established', (event) => {
  console.log('Relock key established:', event.detail);
  
  // Update UI to show authenticated state
  updateAuthenticationStatus(true);
  
  // Store device information
  localStorage.setItem('relock_device_id', event.detail.deviceId);
});
```

### X-Key-Rekeying-Done

Emitted when key rotation/rekeying is completed.

```javascript
// Event details
{
  type: 'X-Key-Rekeying-Done',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  oldKeyId: 'key-uuid-old',
  newKeyId: 'key-uuid-new',
  rekeyingDuration: 1500 // milliseconds
}

// Event listener
document.addEventListener('X-Key-Rekeying-Done', (event) => {
  console.log('Relock key rotation completed:', event.detail);
  
  // Update key tracking
  updateKeyTracking(event.detail.newKeyId);
  
  // Log security event
  logSecurityEvent('key_rotation', event.detail);
});
```

### X-Key-View-Change

Emitted when the user's view or context changes, triggering a new authentication check.

```javascript
// Event details
{
  type: 'X-Key-View-Change',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  viewType: 'sensitive_data',
  context: {
    page: '/admin/dashboard',
    section: 'user_management',
    action: 'view'
  }
}

// Event listener
document.addEventListener('X-Key-View-Change', (event) => {
  console.log('View change detected:', event.detail);
  
  // Check if user has permission for this view
  checkViewPermissions(event.detail.viewType, event.detail.context);
  
  // Update UI based on authentication level
  updateUIBasedOnContext(event.detail.context);
});
```

## Authentication Events

### Authentication Started

Emitted when authentication process begins.

```javascript
// Event details
{
  type: 'relock:auth:started',
  timestamp: 1640995200000,
  transactionId: 'tx-uuid-123',
  method: 'redirect',
  origin: 'https://yourapp.com'
}

// Event listener
document.addEventListener('relock:auth:started', (event) => {
  console.log('Authentication started:', event.detail);
  
  // Show loading indicator
  showLoadingIndicator();
  
  // Track analytics
  trackEvent('authentication_started', {
    method: event.detail.method,
    timestamp: event.detail.timestamp
  });
});
```

### Authentication Success

Emitted when authentication is completed successfully.

```javascript
// Event details
{
  type: 'relock:auth:success',
  timestamp: 1640995200000,
  transactionId: 'tx-uuid-123',
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  user: {
    id: 'user-uuid-456',
    email: 'user@example.com',
    name: 'John Doe',
    permissions: ['read', 'write', 'admin']
  },
  session: {
    id: 'session-uuid-789',
    expiresAt: 1640998800000,
    maxAge: 3600000
  }
}

// Event listener
document.addEventListener('relock:auth:success', (event) => {
  console.log('Authentication successful:', event.detail);
  
  // Hide loading indicator
  hideLoadingIndicator();
  
  // Update user state
  updateUserState(event.detail.user);
  
  // Store session information
  storeSessionInfo(event.detail.session);
  
  // Redirect to intended page
  redirectToIntendedPage();
  
  // Track success
  trackEvent('authentication_success', {
    userId: event.detail.userId,
    method: 'relock'
  });
});
```

### Authentication Failure

Emitted when authentication fails.

```javascript
// Event details
{
  type: 'relock:auth:failure',
  timestamp: 1640995200000,
  transactionId: 'tx-uuid-123',
  error: {
    code: 'AUTH_FAILED',
    message: 'Authentication failed',
    reason: 'invalid_credentials',
    details: 'User credentials could not be verified'
  },
  retryable: true,
  retryAfter: 5000 // milliseconds
}

// Event listener
document.addEventListener('relock:auth:failure', (event) => {
  console.log('Authentication failed:', event.detail);
  
  // Hide loading indicator
  hideLoadingIndicator();
  
  // Show error message
  showErrorMessage(event.detail.error.message);
  
  // Handle retry logic
  if (event.detail.retryable) {
    showRetryButton(event.detail.retryAfter);
  }
  
  // Track failure
  trackEvent('authentication_failure', {
    errorCode: event.detail.error.code,
    reason: event.detail.error.reason,
    retryable: event.detail.retryable
  });
});
```

### Authentication Cancelled

Emitted when user cancels the authentication process.

```javascript
// Event details
{
  type: 'relock:auth:cancelled',
  timestamp: 1640995200000,
  transactionId: 'tx-uuid-123',
  reason: 'user_cancelled',
  context: {
    page: '/login',
    action: 'close_popup'
  }
}

// Event listener
document.addEventListener('relock:auth:cancelled', (event) => {
  console.log('Authentication cancelled:', event.detail);
  
  // Hide loading indicator
  hideLoadingIndicator();
  
  // Show cancellation message
  showCancellationMessage();
  
  // Track cancellation
  trackEvent('authentication_cancelled', {
    reason: event.detail.reason,
    context: event.detail.context
  });
});
```

## Device Events

### Device Registered

Emitted when a new device is registered with Relock.

```javascript
// Event details
{
  type: 'relock:device:registered',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  deviceInfo: {
    type: 'desktop',
    browser: 'Chrome',
    version: '96.0.4664.110',
    os: 'Windows 10',
    screen: '1920x1080',
    timezone: 'America/New_York'
  },
  fingerprint: 'device-fingerprint-hash'
}

// Event listener
document.addEventListener('relock:device:registered', (event) => {
  console.log('Device registered:', event.detail);
  
  // Update device list
  addDeviceToList(event.detail.deviceInfo);
  
  // Store device information
  storeDeviceInfo(event.detail.deviceId, event.detail.deviceInfo);
  
  // Track device registration
  trackEvent('device_registered', {
    deviceType: event.detail.deviceInfo.type,
    browser: event.detail.deviceInfo.browser
  });
});
```

### Device Verified

Emitted when an existing device is verified.

```javascript
// Event details
{
  type: 'relock:device:verified',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  verificationMethod: 'cryptographic_proof',
  verificationTime: 150, // milliseconds
  lastSeen: 1640991600000
}

// Event listener
document.addEventListener('relock:device:verified', (event) => {
  console.log('Device verified:', event.detail);
  
  // Update device status
  updateDeviceStatus(event.detail.deviceId, 'verified');
  
  // Update last seen timestamp
  updateDeviceLastSeen(event.detail.deviceId, event.detail.timestamp);
  
  // Track verification
  trackEvent('device_verified', {
    method: event.detail.verificationMethod,
    verificationTime: event.detail.verificationTime
  });
});
```

### Device Revoked

Emitted when a device is revoked or removed.

```javascript
// Event details
{
  type: 'relock:device:revoked',
  timestamp: 1640995200000,
  deviceId: 'device-uuid-123',
  userId: 'user-uuid-456',
  reason: 'user_requested',
  revokedBy: 'user-uuid-456',
  context: {
    page: '/account/devices',
    action: 'remove_device'
  }
}

// Event listener
document.addEventListener('relock:device:revoked', (event) => {
  console.log('Device revoked:', event.detail);
  
  // Remove device from list
  removeDeviceFromList(event.detail.deviceId);
  
  // Clear local device data
  clearLocalDeviceData(event.detail.deviceId);
  
  // Track revocation
  trackEvent('device_revoked', {
    reason: event.detail.reason,
    revokedBy: event.detail.revokedBy
  });
});
```

## Session Events

### Session Started

Emitted when a new session begins.

```javascript
// Event details
{
  type: 'relock:session:started',
  timestamp: 1640995200000,
  sessionId: 'session-uuid-789',
  userId: 'user-uuid-456',
  deviceId: 'device-uuid-123',
  session: {
    id: 'session-uuid-789',
    startsAt: 1640995200000,
    expiresAt: 1640998800000,
    maxAge: 3600000,
    refreshable: true
  }
}

// Event listener
document.addEventListener('relock:session:started', (event) => {
  console.log('Session started:', event.detail);
  
  // Initialize session tracking
  initializeSessionTracking(event.detail.session);
  
  // Start session timer
  startSessionTimer(event.detail.session.expiresAt);
  
  // Track session start
  trackEvent('session_started', {
    sessionId: event.detail.sessionId,
    duration: event.detail.session.maxAge
  });
});
```

### Session Refreshed

Emitted when a session is refreshed.

```javascript
// Event details
{
  type: 'relock:session:refreshed',
  timestamp: 1640995200000,
  sessionId: 'session-uuid-789',
  userId: 'user-uuid-456',
  deviceId: 'device-uuid-123',
  oldExpiresAt: 1640998800000,
  newExpiresAt: 1641002400000,
  refreshReason: 'user_activity'
}

// Event listener
document.addEventListener('relock:session:refreshed', (event) => {
  console.log('Session refreshed:', event.detail);
  
  // Update session expiry
  updateSessionExpiry(event.detail.newExpiresAt);
  
  // Extend session timer
  extendSessionTimer(event.detail.newExpiresAt);
  
  // Track refresh
  trackEvent('session_refreshed', {
    sessionId: event.detail.sessionId,
    reason: event.detail.refreshReason
  });
});
```

### Session Expired

Emitted when a session expires.

```javascript
// Event details
{
  type: 'relock:session:expired',
  timestamp: 1640995200000,
  sessionId: 'session-uuid-789',
  userId: 'user-uuid-456',
  deviceId: 'device-uuid-123',
  reason: 'timeout',
  lastActivity: 1640991600000
}

// Event listener
document.addEventListener('relock:session:expired', (event) => {
  console.log('Session expired:', event.detail);
  
  // Clear session data
  clearSessionData();
  
  // Show re-authentication prompt
  showReauthenticationPrompt();
  
  // Track expiration
  trackEvent('session_expired', {
    sessionId: event.detail.sessionId,
    reason: event.detail.reason
  });
});
```

### Session Ended

Emitted when a session is explicitly ended.

```javascript
// Event details
{
  type: 'relock:session:ended',
  timestamp: 1640995200000,
  sessionId: 'session-uuid-789',
  userId: 'user-uuid-456',
  deviceId: 'device-uuid-123',
  reason: 'user_logout',
  context: {
    page: '/dashboard',
    action: 'logout'
  }
}

// Event listener
document.addEventListener('relock:session:ended', (event) => {
  console.log('Session ended:', event.detail);
  
  // Clear all authentication state
  clearAuthenticationState();
  
  // Redirect to login page
  redirectToLogin();
  
  // Track logout
  trackEvent('session_ended', {
    sessionId: event.detail.sessionId,
    reason: event.detail.reason
  });
});
```

## Error Events

### General Error

Emitted when a general error occurs.

```javascript
// Event details
{
  type: 'relock:error',
  timestamp: 1640995200000,
  error: {
    code: 'NETWORK_ERROR',
    message: 'Network connection failed',
    details: 'Failed to connect to Relock service',
    retryable: true,
    retryAfter: 10000
  },
  context: {
    action: 'authentication',
    page: '/login',
    userId: 'user-uuid-456'
  }
}

// Event listener
document.addEventListener('relock:error', (event) => {
  console.error('Relock error:', event.detail);
  
  // Show error message
  showErrorMessage(event.detail.error.message);
  
  // Handle retry logic
  if (event.detail.error.retryable) {
    showRetryButton(event.detail.error.retryAfter);
  }
  
  // Track error
  trackEvent('relock_error', {
    errorCode: event.detail.error.code,
    retryable: event.detail.error.retryable,
    context: event.detail.context
  });
});
```

### Network Error

Emitted when network-related errors occur.

```javascript
// Event details
{
  type: 'relock:error:network',
  timestamp: 1640995200000,
  error: {
    code: 'TIMEOUT',
    message: 'Request timeout',
    details: 'Request to Relock service timed out after 10 seconds',
    retryable: true,
    retryAfter: 5000
  },
  request: {
    url: 'https://relock.host/api/verify',
    method: 'POST',
    timeout: 10000
  }
}

// Event listener
document.addEventListener('relock:error:network', (event) => {
  console.error('Network error:', event.detail);
  
  // Show network error message
  showNetworkErrorMessage(event.detail.error.message);
  
  // Implement exponential backoff
  implementExponentialBackoff(event.detail.error.retryAfter);
  
  // Track network error
  trackEvent('network_error', {
    errorCode: event.detail.error.code,
    url: event.detail.request.url,
    retryable: event.detail.error.retryable
  });
});
```

## Custom Events

### Custom Event Emission

You can emit custom events for your application logic.

```javascript
// Emit custom event
function emitCustomEvent(type, data) {
  const event = new CustomEvent(`relock:custom:${type}`, {
    detail: {
      timestamp: Date.now(),
      ...data
    }
  });
  
  document.dispatchEvent(event);
}

// Usage examples
emitCustomEvent('user_action', {
  action: 'view_profile',
  userId: 'user-uuid-456',
  context: 'dashboard'
});

emitCustomEvent('feature_used', {
  feature: 'advanced_search',
  userId: 'user-uuid-456',
  usageCount: 5
});
```

### Custom Event Listeners

Listen for custom events in your application.

```javascript
// Listen for custom events
document.addEventListener('relock:custom:user_action', (event) => {
  console.log('User action detected:', event.detail);
  
  // Update analytics
  trackUserAction(event.detail.action, event.detail.context);
  
  // Update UI based on action
  updateUIForAction(event.detail.action);
});

document.addEventListener('relock:custom:feature_used', (event) => {
  console.log('Feature usage detected:', event.detail);
  
  // Track feature usage
  trackFeatureUsage(event.detail.feature, event.detail.usageCount);
  
  // Show feature tips if needed
  showFeatureTips(event.detail.feature);
});
```

## Event Handling Best Practices

### Event Listener Management

```javascript
class RelockEventHandler {
  constructor() {
    this.listeners = new Map();
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Core authentication events
    this.addListener('relock:auth:started', this.handleAuthStarted.bind(this));
    this.addListener('relock:auth:success', this.handleAuthSuccess.bind(this));
    this.addListener('relock:auth:failure', this.handleAuthFailure.bind(this));
    
    // Device events
    this.addListener('relock:device:registered', this.handleDeviceRegistered.bind(this));
    this.addListener('relock:device:verified', this.handleDeviceVerified.bind(this));
    
    // Session events
    this.addListener('relock:session:started', this.handleSessionStarted.bind(this));
    this.addListener('relock:session:expired', this.handleSessionExpired.bind(this));
    
    // Error events
    this.addListener('relock:error', this.handleError.bind(this));
  }
  
  addListener(eventType, handler) {
    const listener = (event) => handler(event.detail);
    document.addEventListener(eventType, listener);
    this.listeners.set(eventType, listener);
  }
  
  removeListener(eventType) {
    const listener = this.listeners.get(eventType);
    if (listener) {
      document.removeEventListener(eventType, listener);
      this.listeners.delete(eventType);
    }
  }
  
  cleanup() {
    this.listeners.forEach((listener, eventType) => {
      document.removeEventListener(eventType, listener);
    });
    this.listeners.clear();
  }
  
  // Event handlers
  handleAuthStarted(detail) {
    console.log('Authentication started:', detail);
    this.showLoadingIndicator();
  }
  
  handleAuthSuccess(detail) {
    console.log('Authentication successful:', detail);
    this.hideLoadingIndicator();
    this.updateUserState(detail.user);
  }
  
  handleAuthFailure(detail) {
    console.log('Authentication failed:', detail);
    this.hideLoadingIndicator();
    this.showErrorMessage(detail.error.message);
  }
  
  handleDeviceRegistered(detail) {
    console.log('Device registered:', detail);
    this.updateDeviceList(detail);
  }
  
  handleDeviceVerified(detail) {
    console.log('Device verified:', detail);
    this.updateDeviceStatus(detail);
  }
  
  handleSessionStarted(detail) {
    console.log('Session started:', detail);
    this.initializeSession(detail.session);
  }
  
  handleSessionExpired(detail) {
    console.log('Session expired:', detail);
    this.handleSessionExpiration();
  }
  
  handleError(detail) {
    console.error('Relock error:', detail);
    this.showErrorMessage(detail.error.message);
  }
  
  // Helper methods
  showLoadingIndicator() {
    // Implementation
  }
  
  hideLoadingIndicator() {
    // Implementation
  }
  
  updateUserState(user) {
    // Implementation
  }
  
  showErrorMessage(message) {
    // Implementation
  }
  
  updateDeviceList(device) {
    // Implementation
  }
  
  updateDeviceStatus(device) {
    // Implementation
  }
  
  initializeSession(session) {
    // Implementation
  }
  
  handleSessionExpiration() {
    // Implementation
  }
}

// Usage
const eventHandler = new RelockEventHandler();

// Cleanup when component unmounts
function cleanup() {
  eventHandler.cleanup();
}
```

### Event Debouncing and Throttling

```javascript
class EventDebouncer {
  constructor() {
    this.timers = new Map();
  }
  
  debounce(eventType, handler, delay = 300) {
    if (this.timers.has(eventType)) {
      clearTimeout(this.timers.get(eventType));
    }
    
    const timer = setTimeout(() => {
      handler();
      this.timers.delete(eventType);
    }, delay);
    
    this.timers.set(eventType, timer);
  }
  
  throttle(eventType, handler, limit = 100) {
    let inThrottle;
    
    return function(...args) {
      if (!inThrottle) {
        handler.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Usage
const debouncer = new EventDebouncer();

// Debounce frequent events
document.addEventListener('relock:key:view-change', (event) => {
  debouncer.debounce('view-change', () => {
    handleViewChange(event.detail);
  }, 500);
});

// Throttle high-frequency events
const throttledHandler = debouncer.throttle('key-rotation', (event) => {
  handleKeyRotation(event.detail);
}, 1000);

document.addEventListener('relock:key:rekeying-done', throttledHandler);
```

## Event Testing

### Mock Events for Testing

```javascript
// Test utilities for mocking Relock events
class RelockEventMocker {
  static mockEvent(eventType, data = {}) {
    const event = new CustomEvent(eventType, {
      detail: {
        timestamp: Date.now(),
        ...data
      }
    });
    
    document.dispatchEvent(event);
    return event;
  }
  
  static mockAuthenticationSuccess(userData = {}) {
    return this.mockEvent('relock:auth:success', {
      transactionId: 'test-tx-123',
      deviceId: 'test-device-123',
      userId: 'test-user-123',
      user: {
        id: 'test-user-123',
        email: 'test@example.com',
        name: 'Test User',
        permissions: ['read', 'write'],
        ...userData
      },
      session: {
        id: 'test-session-123',
        expiresAt: Date.now() + 3600000,
        maxAge: 3600000
      }
    });
  }
  
  static mockAuthenticationFailure(errorData = {}) {
    return this.mockEvent('relock:auth:failure', {
      transactionId: 'test-tx-123',
      error: {
        code: 'AUTH_FAILED',
        message: 'Authentication failed',
        reason: 'invalid_credentials',
        details: 'User credentials could not be verified',
        ...errorData
      },
      retryable: true,
      retryAfter: 5000
    });
  }
  
  static mockDeviceRegistered(deviceData = {}) {
    return this.mockEvent('relock:device:registered', {
      deviceId: 'test-device-123',
      userId: 'test-user-123',
      deviceInfo: {
        type: 'desktop',
        browser: 'Chrome',
        version: '96.0.4664.110',
        os: 'Windows 10',
        ...deviceData
      }
    });
  }
  
  static mockSessionExpired(sessionData = {}) {
    return this.mockEvent('relock:session:expired', {
      sessionId: 'test-session-123',
      userId: 'test-user-123',
      deviceId: 'test-device-123',
      reason: 'timeout',
      lastActivity: Date.now() - 3600000,
      ...sessionData
    });
  }
}

// Usage in tests
describe('Relock Event Handling', () => {
  beforeEach(() => {
    // Setup test environment
  });
  
  afterEach(() => {
    // Cleanup
  });
  
  it('should handle authentication success', () => {
    const eventHandler = new RelockEventHandler();
    
    // Mock successful authentication
    RelockEventMocker.mockAuthenticationSuccess({
      user: {
        id: 'test-user-123',
        email: 'test@example.com',
        name: 'Test User'
      }
    });
    
    // Assert expected behavior
    expect(/* assertions */).toBe(/* expected */);
  });
  
  it('should handle authentication failure', () => {
    const eventHandler = new RelockEventHandler();
    
    // Mock authentication failure
    RelockEventMocker.mockAuthenticationFailure({
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password'
      }
    });
    
    // Assert expected behavior
    expect(/* assertions */).toBe(/* expected */);
  });
});
```

## Conclusion

This events reference provides comprehensive coverage of all Relock JavaScript events. Use these events to integrate Relock seamlessly with your application and provide real-time feedback to users.

For more information on event handling and integration patterns, see [JavaScript Agent Integration](../integration/js-agent-integration.md) and [Frontend Examples](../examples/frontend-examples.md).
