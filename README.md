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

### Building for Production

```bash
npm run build
# or
yarn build
```

This generates static content in the `build` directory for deployment.

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
