# Relock GitHub Organization Structure

## Overview
Establish `relock-security` as the central GitHub organization for all public facing Relock content, with focused repositories for different purposes.

## Repository Naming Convention

All repositories use the `relock-` prefix for several important reasons:

- **Clear identification**: When developers clone repositories, they get descriptive names like `relock-examples` instead of generic `examples`
- **Brand consistency**: Reinforces the Relock brand across all repositories
- **Search discoverability**: GitHub search results clearly show these are Relock-related projects
- **Organization clarity**: Makes it obvious which repositories belong to the Relock ecosystem
- **Avoiding conflicts**: Prevents naming conflicts with other popular repository names

## Initial Structure (Phase 1)

These would be the first repositories in the new `relock-security` organization:

### relock-docs
- **Purpose**: Official documentation site (Docusaurus)
- **Benefits**: Independent deployment, focused maintenance, clear ownership
- **Content**: API docs, guides, troubleshooting, security best practices

### relock-examples  
- **Purpose**: Working example applications
- **Benefits**: Proof of concept, learning resource, copy-paste ready code
- **Content**: Next.js middleware, minimal setups, real-world integrations

## Future Structure

### Phase 2: Identity Provider Integrations
- `relock-auth0` - Auth0 integration
- `relock-okta` - Okta integration
- `relock-entra` - Microsoft Entra ID integration
- `relock-ping` - Ping Identity integration

### Phase 3: Framework SDKs
- `relock-nextjs` - Next.js SDK and middleware
- `relock-flask` - Python Flask integration  
- `relock-express` - Node.js Express middleware
- `relock-django` - Django integration
- `relock-rails` - Ruby on Rails integration
- `relock-laravel` - PHP Laravel integration
- `relock-spring` - Java Spring Boot integration
- `relock-aspnet` - C# ASP.NET Core integration

Each repo contains: framework-specific SDK, integration examples, testing suite, documentation, CI/CD.

## Why This Works

- **Separation of Concerns**: Each repo has a single purpose
- **Independent Lifecycles**: Docs, examples, and SDKs can evolve separately  
- **Developer Experience**: Clear entry points - docs for understanding, examples for seeing it work, SDKs for integration
- **Scalability**: Different teams can own different repositories
- **Enterprise Ready**: Stable, versioned SDKs with comprehensive documentation

## Implementation

- **Phase 1**: Migrate current monorepo to separate `relock-docs` and `relock-examples` repositories
- **Phase 2**: Create identity provider integrations (Auth0, Okta, Entra, Ping)
- **Phase 3**: Create framework SDKs and community contributions

This structure creates a professional, scalable developer experience that supports long-term growth.