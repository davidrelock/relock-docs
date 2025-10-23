# Return Routes Configuration

Configure authentication redirect URLs for your Relock gateway.

## Overview

Return routes determine where users are redirected after authentication. You need to configure these in the **Core Settings** tab of your Relock Admin Panel.

## Return Route Types

### Trusted Device Route
**When**: User returns with a previously registered device
**Purpose**: Seamless authentication for returning users
**Example**: `https://example.com/dashboard`

### New Device Route  
**When**: User visits with a new device
**Purpose**: Additional verification for new devices
**Example**: `https://example.com/verify`

## Configuration

### Step 1: Access Core Settings

1. **Log in** to [relock.host](https://relock.host)
2. **Navigate** to the Admin Panel
3. **Go to** the Core Settings tab

### Step 2: Configure Return Routes

#### Trusted Device Route
```
URL: https://example.com/dashboard
Purpose: Seamless login for returning users
```

#### New Device Route
```
URL: https://example.com/verify  
Purpose: Additional verification for new devices
```

### Step 3: Save Configuration

1. **Enter** your return route URLs
2. **Save** the configuration
3. **Test** the authentication flow

## Return Route Requirements

### URL Requirements
- **HTTPS Required** - All return routes must use HTTPS
- **Valid Domains** - Must be valid, accessible URLs
- **Same Origin** - Should be on your configured domain

### Response Handling
- **POST Request** - Gateway sends POST request to return route
- **Signature Verification** - Always verify the response signature
- **Error Handling** - Handle authentication failures gracefully

## Implementation Examples

### Express.js Handler
```javascript
app.post('/dashboard', (req, res) => {
  const { 
    'X-Key-Transaction': transaction,
    'X-Key-Transaction-Signature': signature 
  } = req.body;
  
  // Verify signature
  const isValid = verifyRelockSignature(transaction, signature);
  
  if (isValid) {
    // User is authenticated, redirect to dashboard
    res.redirect('/dashboard');
  } else {
    // Authentication failed, redirect to login
    res.redirect('/login?error=authentication_failed');
  }
});
```

### Python Flask Handler
```python
@app.route('/dashboard', methods=['POST'])
def dashboard():
    transaction = request.form.get('X-Key-Transaction')
    signature = request.form.get('X-Key-Transaction-Signature')
    
    # Verify signature
    if verify_relock_signature(transaction, signature):
        return redirect('/dashboard')
    else:
        return redirect('/login?error=authentication_failed')
```

## Testing Return Routes

### Test Authentication Flow

1. **Visit Your Domain** - Navigate to your protected domain
2. **Trigger Authentication** - Click sign in or protected link
3. **Complete Authentication** - Go through Relock authentication
4. **Verify Redirect** - Ensure you're redirected to the correct route

### Test Both Routes

#### Trusted Device Test
- Use a previously registered device
- Should redirect to trusted device route
- Should have seamless authentication

#### New Device Test  
- Use a new device or clear browser data
- Should redirect to new device route
- Should require additional verification

## Troubleshooting

### Common Issues

#### Wrong Redirect
- **Check URL Configuration** - Verify return routes in Admin Panel
- **Check Domain Settings** - Ensure domain is properly configured
- **Test Authentication** - Verify authentication flow works

#### Authentication Failures
- **Check Signature Verification** - Verify signature validation logic
- **Check Return Route URLs** - Ensure URLs are accessible
- **Check SSL Certificates** - Verify HTTPS configuration

### Debug Steps

1. **Check Admin Panel** - Verify return route configuration
2. **Test URLs** - Ensure return route URLs are accessible
3. **Check Logs** - Review authentication logs for errors
4. **Verify Signatures** - Test signature verification logic

## Best Practices

### Security
- **Always Verify Signatures** - Never trust unverified responses
- **Use HTTPS** - Ensure all return routes use HTTPS
- **Validate Requests** - Check request format and content

### User Experience
- **Clear Error Messages** - Provide helpful error messages
- **Fallback Routes** - Have backup routes for failures
- **Loading States** - Show loading indicators during authentication

## Next Steps

- **[Gateway Setup](./gateway-setup)** - Complete gateway configuration
- **[JavaScript Agent Integration](../guides/js-agent-integration)** - Integrate with your application
