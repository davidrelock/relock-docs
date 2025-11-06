---
title: Gateway Login
description: Learn how to sign users into the Relock gateway for automatic device recognition and reduced authentication friction
sidebar_label: Gateway Login
---

# Gateway Login

Signing users into the Relock gateway allows the system to automatically recognize returning users and their devices. This simplifies future authentication sessions by reducing the need for repeated MFA prompts and enabling seamless device owner assignment.

## Overview

Gateway login is the process of associating a user identity with a device in the Relock gateway. After a successful gateway login, the Relock system can:

- **Automatically recognize returning users** on trusted devices
- **Reduce MFA prompts** for known devices
- **Assign device ownership** to simplify future authentication flows
- **Enable secure "remember me" features** with cryptographic proof

This feature is available in **SameSite Integration** and **JavaScript Agent Integration** deployments, where your application can communicate with the Relock gateway to manage user sessions.

## Prerequisites

Before implementing gateway login, ensure you have:

- **SameSite Integration** or **JavaScript Agent Integration** already configured
- Reverse proxy configured to route `/relock/*` requests
- Access to session cookies (`X-Key-Session`) in your application
- User authentication system in place (identity provider integration)
- Relock JavaScript agent loaded and available

## Understanding the Login Flow

Gateway login serves as a bridge between your application's authentication system and the Relock gateway. Here's how it works:

1. **User authenticates** with your identity provider (password, OAuth, etc.)
2. **Your application** calls the Relock gateway login endpoint with user information
3. **Relock gateway** associates the user identity with the current device
4. **Future sessions** can automatically recognize the device owner, reducing authentication friction

The key benefit is that once a device has an assigned owner, the Relock gateway can include this information in responses, allowing your application to make informed decisions about authentication requirements.

## Implementation Approaches

There are two ways to implement gateway login: from the frontend or from the backend. Both approaches achieve the same result, but differ in where the Relock API call is made and how credentials are obtained.

## Frontend Implementation

The following example shows a complete JavaScript implementation for gateway login from the frontend. This should be called **after** your user has successfully authenticated with your identity provider.

```javascript
import Cookies from 'js-cookie';

// Get session ID from cookie
export function getSessionId() {
  return Cookies.get('X-Key-Session') || '';
}

// Main Relock login function
export async function attemptRelockLogin(user) {
  try {
    await waitForRelockAgent();

    // Get token and signature from Relock
    const token = await window.relock.token();
    const signature = await window.relock.sign(token);

    // Get session ID from cookie
    const xsid = getSessionId();

    // Call Relock login endpoint
    const response = await fetch('/relock/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'X-Key-Token': token.hexlify(),
        'X-Key-Signature': signature.hexlify(),
        'X-Key-Session': xsid,
        'user': user.id,
        'email': user.email
      })
    });

    const result = await response.json();

    if (result.status_code === 200) {
      return { success: true };
    }

    return {
      success: false,
      error: result.message || `Status: ${result.status_code}`
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

:::note
**Waiting for the Relock Agent**: The `waitForRelockAgent` function ensures the Relock JavaScript agent is loaded and available before attempting to use it. For more information about handling agent availability and troubleshooting agent loading issues, see our [FAQ guide](/docs/faq) (coming soon).
:::

### Integration with Your Authentication Flow

Call `attemptRelockLogin` immediately after your user successfully authenticates with your identity provider:

```typescript
// Example: After successful OAuth/OIDC authentication
async function onAuthenticationSuccess(user: AuthenticatedUser) {
  // Your identity provider has confirmed the user is authenticated
  // Now sign them into the Relock gateway
  const relockLogin = await attemptRelockLogin({
    id: user.id,
    email: user.email
  });

  if (relockLogin.success) {
    // User is now authenticated in both your app and Relock gateway
    redirectToDashboard();
  } else {
    // Handle Relock login failure
    console.log('Authentication completed, but device verification failed');
  }
}
```

## Backend Implementation

The backend implementation follows the same pattern as the frontend, but you'll obtain the token, signature, and session ID differently. Instead of calling `window.relock.token()` and `window.relock.sign()` directly, you'll receive these values from the frontend (which generates them using the Relock agent) via request headers or body.

```javascript
// Backend endpoint (e.g., Next.js API route, Express, etc.)
export async function POST(request) {
  // Verify user is authenticated with your identity provider
  const user = await verifyUserAuthentication(request);
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401
    });
  }

  // Get Relock token, signature, and session ID from request
  // Frontend sends these after generating them with window.relock.token() and window.relock.sign()
  const token = request.headers.get('X-Key-Token');
  const signature = request.headers.get('X-Key-Signature');
  const sessionId = request.cookies?.get('X-Key-Session')?.value;

  if (!token || !signature || !sessionId) {
    return new Response(JSON.stringify({ error: 'Missing Relock credentials' }), {
      status: 400
    });
  }

  // Call Relock gateway login endpoint (same as frontend)
  const relockResponse = await fetch('/relock/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'X-Key-Token': token,
      'X-Key-Signature': signature,
      'X-Key-Session': sessionId,
      'user': user.id,
      'email': user.email
    })
  });

  const result = await relockResponse.json();

  if (result.status_code === 200) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    });
  }

  return new Response(JSON.stringify({ 
    error: result.message || 'Relock login failed' 
  }), {
    status: result.status_code || 500
  });
}
```

:::tip
**Privacy and Compliance**: Backend implementation is recommended for applications that need to comply with data privacy regulations (GDPR, CCPA, etc.) or have strict policies about handling user data in the frontend.
:::


## Best Practices

### 1. Call Login After Authentication

Always call gateway login **immediately after** your user successfully authenticates with your identity provider. This ensures the device is associated with the user identity as soon as authentication is confirmed.

```typescript
// ✅ Good: Call after authentication
async function onLoginSuccess(user: User) {
  await authenticateWithIdentityProvider(user);
  await attemptRelockLogin(user); // Call right after
}

// ❌ Bad: Calling before authentication is confirmed
async function onLoginAttempt(user: User) {
  await attemptRelockLogin(user); // Too early!
  await authenticateWithIdentityProvider(user);
}
```

### 2. Handle Errors Gracefully

Depending on your application's security requirements, decide how to handle gateway login failures. You may choose to fail gracefully and allow users to continue, or take other measures such as requiring re-authentication or blocking access.

```typescript
const relockResult = await attemptRelockLogin(user);
if (!relockResult.success) {
  // Log for monitoring
  console.error('Relock gateway login failed:', relockResult.error);
  // Decide based on your application requirements:
  // - Allow user to continue (fail gracefully)
  // - Require re-authentication
  // - Block access until device verification succeeds
}
```

### 3. Use Backend Implementation When Possible

For better security and privacy compliance, prefer backend implementation:

- **Keeps user data server-side** - Reduces exposure in frontend code
- **Better compliance** - Meets GDPR, CCPA, and other privacy regulations
- **Centralized error handling** - Easier to monitor and log security events

### 4. Session Management

- **Call logout** when users explicitly sign out - See [Gateway Logout](/docs/guides/gateway-logout) for implementation details
- **Handle session expiration** - Gateway sessions may expire independently
- **Monitor authentication state** - Use Relock events to track device authentication status

### 5. Ensure Agent Availability

Always wait for the Relock agent to be available before attempting gateway login. The `waitForRelockAgent` function handles this automatically, but ensure it's called before any Relock API usage.

## Troubleshooting

### Common Error Codes

| Status Code | Description | Solution |
|------------|-------------|----------|
| **200 OK** | Login successful | User is signed into the gateway |
| **401 Unauthorized** | Missing or invalid token/signature | Ensure Relock agent is loaded and tokens are generated correctly |
| **404 Not Found** | Device/session not found | Verify reverse proxy configuration and session cookie availability |
| **409 Conflict** | Token version mismatch | Wait for key rotation to complete, then retry |
| **417 Expectation Failed** | Invalid signature | Check that token and signature are generated from the same Relock agent instance |
| **500 Internal Server Error** | Gateway error | Check gateway configuration and contact support if persistent |

### Session ID Not Found

If `X-Key-Session` cookie is not available:

- **Check reverse proxy configuration** - Ensure cookies are being forwarded correctly
- **Verify SameSite/Agent integration** - Session cookies are only set in these integration modes
- **Check browser cookie settings** - Ensure cookies are enabled and not blocked

### Agent Not Available

If `waitForRelockAgent` throws an error:

- **Verify script loading** - Ensure `/relock/relock.js` is loaded in your HTML
- **Check reverse proxy** - Verify `/relock/*` routes are proxied correctly
- **Check browser console** - Look for JavaScript errors preventing agent initialization
- **Verify HTTPS** - Relock requires HTTPS for security

### Network Issues

If requests to `/relock/login` fail:

- **Check reverse proxy** - Verify it's routing requests correctly
- **Verify gateway UUID** - Ensure `X-Key-Wildcard` header is set correctly
- **Check CORS settings** - Ensure credentials are included in requests
- **Verify SSL/TLS** - Relock requires secure connections

### Response Status Codes

Always check the `status_code` field in the response:

```typescript
const result = await response.json();
if (result.status_code === 200) {
  // Success
} else {
  // Handle specific error codes
  switch (result.status_code) {
    case 401:
      // Authentication issue
      break;
    case 404:
      // Session not found
      break;
    case 409:
      // Version mismatch, retry after rekeying
      break;
    default:
      // Other errors
  }
}
```

## Related Topics

- **[Gateway Logout](/docs/guides/gateway-logout)** - Learn how to sign users out of the Relock gateway
- **[SameSite Integration](/docs/guides/samesite-integration)** - Learn how to set up SameSite integration, which enables gateway login
- **[JavaScript Agent Integration](/docs/guides/js-agent-integration)** - Understand the JavaScript agent integration method
- **[Zero-Trust Remember-Me](/docs/use-cases/secure-remember-me)** - Implement secure "remember me" functionality using gateway login

