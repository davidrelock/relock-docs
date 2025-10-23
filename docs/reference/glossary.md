---
title: Glossary
description: Complete glossary of Relock terms and concepts
sidebar_label: Glossary
---

# Glossary

This page provides definitions for all Relock-related terms, concepts, and technical terminology.

## A

### Authentication
The process of verifying the identity of a user or device. In Relock, this is achieved through cryptographic proofs rather than traditional passwords.

### Authorization
The process of determining what actions a user or device is permitted to perform. Relock provides continuous authorization through cryptographic verification.

### API Key
A secret key used to authenticate API requests to the Relock service. This key is unique to your organization and should be kept secure.

## B

### Bearer Token
A traditional authentication method where a token is sent with each request. Relock replaces this with cryptographic proofs for enhanced security.

### Browser Binding
A security feature that ties Relock authentication to a specific browser instance, preventing token theft across different browsers.

## C

### Cryptographic Proof
A mathematical proof that demonstrates knowledge of a secret without revealing the secret itself. Relock uses these for continuous authentication.

### CSP (Content Security Policy)
A security standard that helps prevent cross-site scripting attacks by controlling which resources can be loaded.

### CSRF (Cross-Site Request Forgery)
An attack where malicious websites make unauthorized requests on behalf of authenticated users. Relock's cryptographic proofs prevent this.

## D

### Device Binding
A security feature that ties Relock authentication to a specific device, preventing unauthorized access from other devices.

### Device Fingerprint
A unique identifier for a device based on its characteristics (browser, OS, screen resolution, etc.).

### Deep Link
A URL that opens a specific page or section within a mobile app. Used in Relock mobile integrations for authentication flow.

## E

### Elliptic Curve Cryptography
A form of public-key cryptography used by Relock for generating and verifying cryptographic proofs.

### End-to-End Encryption
A security model where data is encrypted at the source and only decrypted at the destination. Relock provides this for authentication data.

## F

### Frontend Integration
The process of integrating Relock into web applications using JavaScript, React, Vue.js, or other frontend frameworks.

### Fallback Authentication
Alternative authentication methods used when Relock is unavailable or fails. This ensures users can still access the system.

## G

### Gateway UUID
A unique identifier for your Relock integration. This UUID is used to route requests and manage your organization's settings.

### Gateway
The entry point for Relock authentication requests. It handles routing, rate limiting, and initial request validation.

## H

### HTTP Security Headers
Security headers that protect against various web attacks. Relock requires proper configuration of these headers.

### HSTS (HTTP Strict Transport Security)
A security header that forces browsers to use HTTPS connections, preventing downgrade attacks.

### Hash Function
A mathematical function that converts input data into a fixed-size string. Relock uses cryptographic hash functions for data integrity.

## I

### Integration Pattern
A specific approach to integrating Relock into your application. Relock offers three main patterns: Simple, SameSite, and JavaScript Agent.

### Invisible Authentication
A Relock feature where authentication happens seamlessly in the background without user interaction.

### IP Binding
A security feature that restricts Relock authentication to specific IP addresses or ranges.

## J

### JavaScript Agent
A Relock integration pattern that provides invisible, request-level authentication using JavaScript running in the browser.

### JWT (JSON Web Token)
A standard for creating access tokens. While Relock doesn't use traditional JWTs, it provides similar functionality through cryptographic proofs.

## K

### Key Derivation
The process of generating cryptographic keys from a master secret. Relock uses this to create unique keys for each session.

### Key Rotation
The practice of regularly changing cryptographic keys to limit the impact of key compromise. Relock automatically rotates keys.

### Key Strength
The security level of a cryptographic key, typically measured in bits. Relock uses 256-bit keys for maximum security.

## L

### Login Flow
The sequence of steps a user follows to authenticate with your application using Relock.

### Logout
The process of ending a user's authenticated session. Relock provides secure logout mechanisms.

### Legacy Authentication
Traditional authentication methods like passwords, OTP, or hardware tokens that Relock replaces.

## M

### MDX
A format that combines Markdown with JSX, used in Docusaurus for creating interactive documentation.

### Mobile Integration
The process of integrating Relock into mobile applications for iOS and Android.

### Multi-Factor Authentication (MFA)
An authentication method that requires multiple forms of verification. Relock provides this through device binding and cryptographic proofs.

## N

### Nonce
A unique, random value used once in cryptographic operations to prevent replay attacks.

### Network Security
Security measures that protect data as it travels across networks. Relock uses TLS encryption for all communications.

## O

### Origin Binding
A security feature that ties Relock authentication to a specific domain, preventing cross-origin attacks.

### OAuth
An open standard for authorization. While Relock is not OAuth, it can be integrated with OAuth flows.

### OTP (One-Time Password)
A temporary password valid for only one login session. Relock replaces this with continuous cryptographic authentication.

## P

### Passkey
A modern authentication method that uses public-key cryptography. Relock provides similar security with additional features.

### Phishing Resistance
The ability to resist phishing attacks. Relock's origin binding and cryptographic proofs provide strong phishing resistance.

### Proxy Configuration
Network configuration that routes Relock requests through a reverse proxy for SameSite integration.

### Public Key Infrastructure (PKI)
A system for managing digital certificates and public-key encryption. Relock uses PKI principles for key management.

## Q

### Quick Start
A simplified integration path for getting started with Relock quickly.

### Query Parameters
URL parameters used to pass data between pages, such as authentication status and transaction IDs.

## R

### Rate Limiting
A security measure that limits the number of requests a client can make within a specific time period.

### Replay Attack
An attack where an attacker captures and reuses authentication data. Relock prevents this through timestamps and nonces.

### Reverse Proxy
A server that sits between clients and your application, handling Relock routing and header injection.

### Relock Tesseract
Relock's core cryptographic construct - a symmetric key wrapped in interdependent encryption layers.

## S

### SameSite Integration
A Relock integration pattern that uses a reverse proxy to maintain your domain while providing Relock security.

### Session Management
The process of managing user sessions, including creation, validation, and termination.

### Signature Verification
The process of verifying cryptographic signatures to ensure data authenticity and integrity.

### Simple Integration
The most basic Relock integration pattern, suitable for quick implementation and testing.

### SOTT (Signed One-Time Token)
A Relock-specific token format that provides secure, time-limited authentication.

### SRI (Subresource Integrity)
A security feature that ensures resources haven't been tampered with by checking their cryptographic hashes.

### SSL/TLS
Security protocols that encrypt data transmitted over networks. Relock requires TLS for all communications.

## T

### Tesseract
See "Relock Tesseract"

### Threat Model
A systematic approach to identifying and analyzing potential security threats to your system.

### Timeout
A security measure that automatically expires authentication after a specified period of inactivity.

### Transaction ID
A unique identifier for each authentication attempt, used to track and verify the authentication process.

### Two-Factor Authentication (2FA)
An authentication method requiring two forms of verification. Relock provides this through device binding.

## U

### UUID (Universally Unique Identifier)
A 128-bit identifier that is unique across space and time. Relock uses UUIDs for devices, users, and transactions.

### User Experience (UX)
The overall experience of a person using Relock, including ease of use and visual design.

### User Agent
Information about the user's browser and operating system, used by Relock for device identification.

## V

### Verification
The process of confirming the authenticity and validity of authentication data.

### View Change
A Relock event that occurs when a user navigates to a different page or section, triggering re-authentication.

### VPN (Virtual Private Network)
A secure connection that encrypts internet traffic. Relock works with VPNs but may require additional configuration.

## W

### Webhook
A mechanism for receiving real-time notifications from Relock about authentication events.

### Whitelist
A list of allowed domains, IP addresses, or devices that are permitted to use Relock.

### Wildcard
A pattern matching character used in Relock configuration to match multiple values.

## X

### X-Key-Established
A Relock event that fires when a cryptographic key is successfully established.

### X-Key-Rekeying-Done
A Relock event that fires when key rotation is completed.

### X-Key-View-Change
A Relock event that fires when the user's view or context changes.

### X-Forwarded-For
An HTTP header that contains the original client IP address when using a reverse proxy.

### X-Key-Wildcard
A custom HTTP header used in SameSite integration to identify your Relock gateway.

## Y

### YAML
A human-readable data serialization format used for Relock configuration files.

### Yield
A JavaScript keyword used in async functions, relevant for handling Relock authentication flows.

## Z

### Zero Trust
A security model that assumes no user or device is trusted by default. Relock implements this through continuous verification.

### Zero Knowledge Proof
A cryptographic method where one party proves knowledge of a secret without revealing the secret itself. Relock uses similar principles.

## Technical Terms

### Admonition
A Docusaurus component used to highlight important information, warnings, or notes in documentation.

### Backend
The server-side portion of your application that handles Relock API requests and verification.

### Cache
A storage mechanism that stores frequently accessed data to improve performance. Relock uses caching for verification results.

### Client
The user's device or browser that initiates Relock authentication requests.

### Database
A structured collection of data used to store user information, device registrations, and authentication logs.

### Dependency
A software package or library that your application requires to function. Relock has minimal dependencies.

### Environment Variable
A configuration value stored outside your application code, used for Relock API keys and settings.

### Framework
A software framework like React, Vue.js, or Angular used to build web applications with Relock.

### Frontend
The client-side portion of your application that users interact with, including Relock authentication flows.

### Gateway
The entry point for Relock authentication requests, handling routing and initial validation.

### Header
An HTTP header that contains metadata about a request or response, including Relock authentication data.

### Hook
A function that runs at specific points in a component's lifecycle, used for handling Relock events in React.

### HTTP Method
The type of HTTP request (GET, POST, PUT, DELETE) used to interact with Relock APIs.

### HTTPS
A secure version of HTTP that encrypts data transmission, required for all Relock communications.

### Infrastructure
The underlying systems and services that support your Relock integration, including servers and networks.

### Library
A collection of pre-written code that provides functionality for Relock integration.

### Middleware
Software that runs between requests and responses, used for Relock authentication and error handling.

### Package Manager
A tool for managing software dependencies, such as npm for Node.js or pip for Python.

### Plugin
A software component that adds functionality to an existing application, such as Relock integration plugins.

### Protocol
A set of rules for communication between systems, such as the Relock authentication protocol.

### SDK (Software Development Kit)
A collection of tools and libraries for developing applications with Relock.

### Service Worker
A script that runs in the background of a web application, used for offline Relock functionality.

### State Management
The process of managing application state, including Relock authentication status.

### Template
A pre-built structure or pattern for implementing Relock integration.

### Testing
The process of verifying that Relock integration works correctly, including unit tests and integration tests.

### Token
A piece of data that represents authentication or authorization, though Relock uses cryptographic proofs instead of traditional tokens.

### TypeScript
A superset of JavaScript that adds static typing, useful for Relock integration development.

### Validation
The process of checking that data meets specified requirements, including Relock request validation.

### Version Control
A system for tracking changes to source code, essential for managing Relock integration code.

### WebSocket
A communication protocol that provides full-duplex communication channels, used by Relock for real-time updates.

## Security Terms

### Access Control
The selective restriction of access to resources, implemented by Relock through cryptographic verification.

### Audit Log
A record of authentication events and security-related activities for compliance and monitoring.

### Authentication Factor
A method of proving identity, such as something you know, have, or are. Relock uses cryptographic factors.

### Authorization Level
The degree of access granted to a user, managed by Relock through permission systems.

### Brute Force Attack
An attack that attempts to guess passwords or keys through systematic trial and error. Relock prevents this through rate limiting.

### Certificate
A digital document that proves the identity of a website or service, used by Relock for secure communications.

### Cipher
An algorithm used for encryption and decryption, employed by Relock for securing authentication data.

### Compliance
Adherence to regulatory requirements and industry standards, supported by Relock's security features.

### Cryptography
The practice of secure communication in the presence of adversaries, fundamental to Relock's security model.

### Encryption
The process of converting data into a form that cannot be understood without a key, used by Relock for all sensitive data.

### Hash
A mathematical function that converts data into a fixed-size string, used by Relock for data integrity.

### Key Management
The process of generating, storing, and protecting cryptographic keys, handled automatically by Relock.

### Man-in-the-Middle Attack
An attack where an attacker intercepts communication between two parties. Relock prevents this through TLS and cryptographic verification.

### Nonce
A unique, random value used once in cryptographic operations to prevent replay attacks.

### Penetration Testing
Security testing that simulates attacks to identify vulnerabilities, recommended for Relock deployments.

### Private Key
A secret key used for decryption and signing, managed securely by Relock.

### Public Key
A key that can be shared publicly, used for encryption and signature verification by Relock.

### Salt
Random data added to cryptographic operations to prevent rainbow table attacks, used by Relock.

### Security Headers
HTTP headers that protect against various web attacks, required for Relock deployments.

### Session Hijacking
An attack where an attacker steals a user's session. Relock prevents this through cryptographic proofs.

### Side-Channel Attack
An attack that exploits information leaked through system behavior. Relock is designed to resist such attacks.

### Social Engineering
An attack that manipulates people into revealing sensitive information. Relock reduces the impact of such attacks.

### Spoofing
An attack where an attacker impersonates a legitimate user or service. Relock prevents this through cryptographic verification.

### Tampering
The unauthorized modification of data or systems. Relock prevents this through cryptographic signatures.

### Threat Vector
A method or pathway used by an attacker to gain unauthorized access. Relock addresses multiple threat vectors.

### Vulnerability
A weakness in a system that could be exploited by an attacker. Relock is designed with security in mind to minimize vulnerabilities.

## Conclusion

This glossary provides comprehensive coverage of all Relock-related terms and concepts. Use this reference to understand the terminology used throughout the Relock documentation and integration guides.

For more detailed explanations of specific concepts, see the relevant sections of the documentation.
