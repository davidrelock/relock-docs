# Gateway Setup

Create and configure your first authentication gateway on the Relock Cloud Gateway.

## Overview

A gateway is the core component that handles authentication for your applications. Each gateway:
- Protects one or more domains
- Has its own cryptographic keys
- Maintains device registrations
- Handles authentication requests

## Create a New Gateway

### Step 1: Access Gateway Management

1. **Log in** to [relock.host](https://relock.host)
2. **Navigate** to the Admin Panel
3. **Go to** the Core Settings tab

### Step 2: Basic Configuration

#### Domain Configuration
- **Add Domain** - Add your domain (e.g., `example.com`)
- **Configure Subdomain** - Set up your Relock Cloud subdomain (Wildcard ID): `example.relock.host`

#### Return Routes Configuration
Configure return URLs for completed verification:

- **Trusted Device** → `https://example.com/dashboard`
- **New Device** → `https://example.com/verify`

### Step 3: Get API Keys

#### Gateway Access Keys Tab
1. **Navigate** to the Gateway Access Keys tab
2. **Get Gateway UUID** - Copy your gateway UUID
3. **Get Public Key** - Copy your public key for signature verification

## Gateway Configuration

### Core Settings

#### Domain Management
```
Primary Domain: example.com
Relock Subdomain: example.relock.host
```

#### Return Routes
```
Trusted Device: https://example.com/dashboard
New Device: https://example.com/verify
```

### API Keys

#### Gateway UUID
- **Purpose** - Used in API requests for routing
- **Location** - Gateway Access Keys tab
- **Usage** - Include in `X-Key-Wildcard` header

#### Public Key
- **Purpose** - For signature verification
- **Location** - Gateway Access Keys tab
- **Usage** - Verify Relock response signatures

## Testing Your Gateway

### Basic Connectivity Test

1. **Check Gateway Status** - Verify gateway is active
2. **Test Domain Resolution** - Ensure domains resolve correctly
3. **Verify SSL Certificates** - Check SSL/TLS configuration

### Authentication Test

1. **Test Redirect Flow** - Verify authentication redirect works
2. **Test Return Flow** - Verify return redirect works
3. **Test Signature Verification** - Verify signature validation

## Integration

### JavaScript Agent Integration
```javascript
// Include the Relock agent
<script src="/relock/relock.js" async></script>

// Use gateway UUID in requests
const gatewayUuid = "your-gateway-uuid";
```

### Server-side Integration
```bash
# Environment variables
RELOCK_GATEWAY_UUID=your-gateway-uuid
RELOCK_PUBLIC_KEY=your-public-key
```

## Troubleshooting

### Common Issues

#### Gateway Not Responding
- Check gateway status in Admin Panel
- Verify domain configuration
- Test network connectivity

#### Authentication Failures
- Review return route configuration
- Check gateway UUID and public key
- Verify domain settings

### Getting Help

- **Documentation** - Check comprehensive guide
- **Support** - Contact support at [hi@relock.security](mailto:hi@relock.security)
- **Community** - Join our [LinkedIn community](https://www.linkedin.com/company/relocksecurity)

## Next Steps

- **[Return Routes](./return-routes)** - Configure authentication redirects
- **[JavaScript Agent Integration](../guides/js-agent-integration)** - Integrate with your application