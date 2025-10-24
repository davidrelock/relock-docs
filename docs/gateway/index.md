# Relock Cloud Gateway

Learn how to use the Relock Cloud Gateway at relock.host to manage your authentication infrastructure.

## Overview

The Relock Cloud Gateway is the hosted service that handles authentication for your applications. It provides:

- **Gateway Management** - Create and configure authentication gateways
- **Domain Configuration** - Set up domains and subdomains  
- **API Keys** - Manage gateway UUIDs and public keys
- **Return Route Configuration** - Configure authentication redirects

## Getting Started

1. **[Create Your Account](/docs/gateway/getting-started)** - Sign up and access the Cloud Gateway
2. **[Create Your First Gateway](/docs/gateway/gateway-setup)** - Set up a new authentication gateway
3. **[Configure Return Routes](/docs/gateway/return-routes)** - Set up authentication redirects

## Key Concepts

### Cloud Gateway
The Relock Cloud Gateway is the hosted service that handles authentication for your applications. Each gateway:
- Protects one or more domains
- Has its own cryptographic keys
- Maintains device registrations
- Handles authentication requests

### Gateway Configuration
Your gateway configuration includes:
- **Gateway UUID** - Unique identifier for your gateway
- **Public Key** - For signature verification
- **Return Routes** - URLs for authentication redirects
- **Domain Settings** - Protected domains and subdomains

## Next Steps

- **[Getting Started](/docs/gateway/getting-started)** - Create your account and first gateway
- **[Gateway Setup](/docs/gateway/gateway-setup)** - Configure your authentication gateway
- **[Return Routes](/docs/gateway/return-routes)** - Set up authentication redirects