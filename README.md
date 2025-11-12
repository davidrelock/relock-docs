# Relock Developer Documentation

This repository contains the official developer documentation for [Relock](https://relock.id), an advanced cryptographic authenticator that provides invisible, continuous authentication for web applications.

## About Relock

Relock is a software cryptographic authenticator that adds an invisible strong factor of authentication to your applications. It provides continuous, per-request cryptographic proof of device identity without adding friction for users. Relock replaces bearer tokens with fresh, origin-bound Signed One-Time Tokens (SOTTs) that are cryptographically verified on every request.

### Key Features

- **Invisible Authentication**: No user interaction required after initial setup
- **Continuous Protection**: Every request carries fresh cryptographic proof
- **Phishing Resistant**: Origin-bound tokens prevent session hijacking
- **Regulatory Compliant**: Supports AAL2/AAL3 and Strong Customer Authentication
- **Zero Trust Ready**: Integrates with CAEP (Continuous Access Evaluation Protocol)

## Documentation Structure

This documentation covers:

- **Getting Started**: Quick start guides and integration overview
- **API Reference**: Complete API documentation and endpoints
- **Integration Guides**: Step-by-step integration instructions
- **Security**: Best practices and security considerations
- **Deployment**: Production deployment and configuration
- **Examples**: Real-world implementation examples

## Quick Start

### Prerequisites

- Node.js 20.0 or higher
- npm or yarn package manager

### Installation

```bash
npm install
# or
yarn install
```

### Local Development

```bash
npm start
# or
yarn start
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without restarting the server.

### Generating API Documentation

The API documentation is generated from the OpenAPI specification file (`relock-api.yaml`). 
You must generate the API docs before building for production or deploying.

**After making changes to `relock-api.yaml`**, regenerate the API docs:

```bash
# Clean existing generated docs (optional, but recommended to ensure fresh generation)
npm run docusaurus clean-api-docs relock

# Generate API docs from OpenAPI spec
npm run docusaurus gen-api-docs relock
# or
yarn docusaurus gen-api-docs relock
```

This command:
- Reads the OpenAPI spec from `relock-api.yaml`
- Generates MDX documentation files in `docs/api/`
- Creates a sidebar configuration for the API reference

**Important**: 
- Always regenerate the API docs after updating `relock-api.yaml` to ensure 
  the documentation reflects the latest API changes.
- If changes don't appear in the dev server, clean the cache and restart:
  ```bash
  npm run docusaurus clear
  npm run docusaurus clean-api-docs relock
  npm run docusaurus gen-api-docs relock
  npm start
  ```

### Building for Production

Before building, ensure you have generated the latest API documentation:

```bash
# Generate API docs from OpenAPI spec
npm run docusaurus gen-api-docs relock

# Build the static site
npm run build
# or
yarn build
```

This generates static content in the `build` directory for deployment.

**Note**: The API documentation generation step is required before building. 
If you skip this step, the API reference pages will not be included in the build.

## Documentation Sections

### Getting Started
- [Quick Start Overview](docs/getting-started/quickstart-overview.md)
- [Cloud Integration](docs/getting-started/quickstart-cloud.md)
- [JS Agent Integration](docs/getting-started/quickstart-js-agent.md)

### Integration Options
- [Simple Integration](docs/integration/simple-integration.md)
- [SameSite Integration](docs/integration/samesite-integration.md)
- [JS Agent Integration](docs/integration/js-agent-integration.md)

### API Reference
- [API Overview](docs/api/overview.md)
- [Authentication](docs/api/authentication.md)
- [Endpoints](docs/api/endpoints.md)
- [Webhooks](docs/api/webhooks.md)

### Security & Compliance
- [Security Model](docs/concepts/security-model.md)
- [Best Practices](docs/security/best-practices.md)
- [Compliance](docs/security/compliance.md)

## Contributing

We welcome contributions to improve this documentation. Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

- **Documentation**: [docs.relock.id](https://docs.relock.id)
- **Website**: [relock.id](https://relock.id)
- **Admin Panel**: [relock.host](https://relock.host)

## License

This documentation is provided under the same license as the Relock project.

---

Built with [Docusaurus](https://docusaurus.io/) - a modern static website generator.
