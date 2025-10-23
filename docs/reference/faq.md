---
title: Frequently Asked Questions
description: Common questions and answers about Relock
sidebar_label: FAQ
---

# Frequently Asked Questions

This page answers common questions about Relock, its features, and implementation.

## General Questions

### What is Relock?

Relock is an advanced software cryptographic authenticator that provides **continuous passive authentication** with zero user friction. It replaces traditional bearer authentication with per-request cryptographic proofs, delivering enterprise-grade security without compromising user experience.

### How is Relock different from traditional authentication?

Traditional authentication methods like passwords, OTP, or hardware tokens provide one-time verification at login. Relock provides **continuous authentication** for every request, ensuring that the user and device remain authenticated throughout their session.

### What does "zero user friction" mean?

Zero user friction means that once a user is initially authenticated, they don't need to re-enter credentials, approve actions, or interact with authentication prompts. Relock handles authentication seamlessly in the background.

### Is Relock a password replacement?

Relock can replace passwords entirely, but it's more accurate to say it's an **authentication replacement**. It provides stronger security than passwords while being completely invisible to users.

## Technical Questions

### How does Relock work?

Relock uses a **cryptographic Tesseract** - a symmetric key wrapped in interdependent encryption layers. The system establishes a cryptographic relationship between the client and server, then uses this relationship to verify each request without storing raw secrets.

### What is the Relock Tesseract?

The **Tesseract** is Relock's core cryptographic construct - a symmetric key wrapped in interdependent encryption. Neither the client nor server can reconstruct the raw secret alone, and the key is automatically rotated to prevent reuse.

### How does Relock prevent session hijacking?

Relock prevents session hijacking through:
- **Origin binding**: Authentication is tied to specific domains
- **Device binding**: Authentication is tied to specific devices
- **Cryptographic proofs**: Each request requires a valid cryptographic signature
- **Automatic key rotation**: Keys are regularly changed to limit exposure

### What cryptographic algorithms does Relock use?

Relock uses industry-standard cryptographic algorithms including:
- **Elliptic Curve Cryptography** (ECC) for key generation and signing
- **AES-256** for symmetric encryption
- **SHA-256** for hashing
- **TLS 1.3** for transport security

### How does Relock handle key rotation?

Relock automatically rotates cryptographic keys at regular intervals. The rotation process is transparent to users and applications, ensuring continuous security without interruption.

## Integration Questions

### What integration patterns does Relock offer?

Relock offers three integration patterns:

1. **Simple Integration**: Basic redirect-based authentication
2. **SameSite Integration**: Proxy-based integration that maintains your domain
3. **JavaScript Agent**: Invisible, request-level authentication

### Which integration pattern should I choose?

Choose based on your requirements:
- **Simple**: Quick implementation, basic security
- **SameSite**: Brand consistency, enhanced security
- **JavaScript Agent**: Maximum security, zero friction

### How long does it take to integrate Relock?

Integration time varies by pattern:
- **Simple**: 1-2 hours
- **SameSite**: 4-8 hours (including proxy configuration)
- **JavaScript Agent**: 1-2 days

### Can I use Relock with my existing authentication system?

Yes, Relock can be integrated alongside existing authentication systems. You can gradually migrate users to Relock or use it as an additional security layer.

### Does Relock work with mobile apps?

Yes, Relock supports mobile applications through:
- **Deep linking** for authentication flow
- **Native SDKs** for iOS and Android
- **Cross-platform compatibility** with React Native and Flutter

## Security Questions

### Is Relock secure?

Yes, Relock provides enterprise-grade security through:
- **Cryptographic proofs** instead of tokens
- **Continuous verification** of every request
- **Multiple binding factors** (origin, device, time)
- **Automatic key rotation**
- **Zero secret storage** on client or server

### What attacks does Relock protect against?

Relock protects against:
- **Session hijacking**: Through cryptographic verification
- **CSRF attacks**: Through origin binding
- **Token theft**: Through device binding
- **Replay attacks**: Through timestamps and nonces
- **Man-in-the-middle**: Through TLS and cryptographic verification

### What attacks does Relock NOT protect against?

Relock does not protect against:
- **XSS attacks**: These require separate security measures
- **Malware on user devices**: Relock cannot control the user's device
- **Social engineering**: Relock cannot prevent user deception
- **Network-level attacks**: Relock requires TLS for transport security

### How does Relock handle compromised devices?

If a device is compromised:
- **Immediate revocation** of device access
- **Automatic re-authentication** required
- **Audit logging** of all suspicious activity
- **Real-time alerts** for security teams

### Is Relock compliant with security standards?

Relock helps organizations meet various compliance requirements including:
- **SOC 2 Type II**
- **ISO 27001**
- **GDPR**
- **HIPAA**
- **PCI DSS**

## Performance Questions

### How does Relock affect application performance?

Relock has minimal performance impact:
- **Cryptographic operations** are optimized and fast
- **Caching** reduces repeated verifications
- **Asynchronous processing** prevents blocking
- **Minimal network overhead** for verification

### What is the latency impact of Relock?

Relock adds minimal latency:
- **Local verification**: &lt;1ms for cached results
- **Network verification**: 10-50ms depending on location
- **Bulk operations**: Optimized for multiple verifications

### How does Relock scale with high traffic?

Relock is designed for high-scale deployments:
- **Horizontal scaling** across multiple servers
- **Load balancing** for even distribution
- **Caching layers** for performance optimization
- **Rate limiting** to prevent abuse

### Does Relock work offline?

Relock requires internet connectivity for:
- **Initial authentication**
- **Key rotation**
- **Device registration**

However, once authenticated, some operations can continue with cached cryptographic proofs.

## Deployment Questions

### What infrastructure do I need for Relock?

Relock requires:
- **HTTPS-enabled** web server
- **Reverse proxy** (for SameSite integration)
- **API endpoint** for verification
- **Database** for user management (optional)

### Can I deploy Relock on-premises?

Relock is currently a cloud service, but enterprise customers can discuss on-premises deployment options.

### What browsers does Relock support?

Relock supports all modern browsers:
- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

### Does Relock work with VPNs?

Yes, Relock works with VPNs, but you may need to:
- **Whitelist VPN IP ranges**
- **Configure proxy settings**
- **Handle IP address changes**

### Can I use Relock behind a corporate firewall?

Yes, Relock works behind corporate firewalls. You may need to:
- **Whitelist Relock domains**
- **Configure proxy settings**
- **Handle corporate security policies**

## User Experience Questions

### What happens if Relock fails?

If Relock fails, users can:
- **Retry authentication** automatically
- **Use fallback methods** (if configured)
- **Contact support** for assistance
- **Continue with limited access** (if configured)

### How do users know they're protected by Relock?

Users can see Relock protection through:
- **Visual indicators** in the UI
- **Security badges** or icons
- **Status messages** about authentication
- **Device management** in account settings

### Can users opt out of Relock?

Relock can be configured to:
- **Require Relock** for all users
- **Allow opt-out** for specific users
- **Provide fallback** authentication methods
- **Gradually migrate** users to Relock

### How does Relock handle user education?

Relock provides:
- **Onboarding guides** for new users
- **Security explanations** about protection
- **Device management** tutorials
- **Troubleshooting** help

## Cost and Licensing Questions

### How much does Relock cost?

Relock pricing is based on:
- **Number of users**
- **Integration pattern**
- **Support level**
- **Custom features**

Contact sales for detailed pricing information.

### Is there a free tier?

Relock offers:
- **Free trial** for evaluation
- **Developer tier** for testing
- **Community support** for basic questions

### What's included in the enterprise plan?

Enterprise plans include:
- **Priority support**
- **Custom integrations**
- **Advanced security features**
- **Compliance assistance**
- **Dedicated account manager**

### Can I cancel my Relock subscription?

Yes, you can cancel at any time:
- **No long-term contracts**
- **Pro-rated refunds** for unused time
- **Data export** before cancellation
- **Graceful degradation** of service

## Support and Documentation Questions

### How do I get help with Relock?

You can get help through:
- **Documentation**: Comprehensive guides and examples
- **Community**: Developer forums and discussions
- **Support tickets**: Direct assistance from the team
- **Training**: Custom training sessions for teams

### Is there developer documentation?

Yes, Relock provides:
- **API documentation** with examples
- **Integration guides** for all patterns
- **Code samples** in multiple languages
- **SDK documentation** for mobile platforms

### Can I contribute to Relock documentation?

Yes, Relock welcomes contributions:
- **GitHub repositories** for documentation
- **Community guidelines** for contributions
- **Review process** for quality assurance
- **Recognition** for contributors

### Is there training available for my team?

Yes, Relock offers:
- **Online training** courses
- **Custom workshops** for teams
- **Certification programs** for developers
- **Best practices** guidance

## Migration Questions

### How do I migrate from traditional authentication?

Migration steps include:
- **Assessment** of current system
- **Planning** migration strategy
- **Pilot deployment** with test users
- **Gradual rollout** to all users
- **Legacy system** decommissioning

### Can I use Relock alongside existing auth?

Yes, you can:
- **Run both systems** in parallel
- **Gradually migrate** users
- **Use Relock as enhancement** to existing auth
- **Maintain fallback** methods

### How long does migration take?

Migration time depends on:
- **System complexity**: 2-8 weeks
- **User count**: Larger deployments take longer
- **Integration complexity**: Custom systems require more time
- **Testing requirements**: Security-critical systems need more testing

### What happens to existing user accounts?

Existing accounts can be:
- **Migrated** to Relock automatically
- **Linked** to Relock while maintaining access
- **Recreated** with Relock authentication
- **Preserved** with dual authentication

## Compliance and Legal Questions

### Is Relock GDPR compliant?

Yes, Relock helps with GDPR compliance:
- **Data minimization**: Only necessary data is collected
- **User consent**: Clear consent mechanisms
- **Data portability**: Easy data export
- **Right to be forgotten**: Account deletion capabilities

### Does Relock support audit logging?

Yes, Relock provides comprehensive audit logging:
- **Authentication events**: All login attempts and verifications
- **Security events**: Suspicious activity and failures
- **User actions**: Changes to accounts and settings
- **System events**: Configuration changes and updates

### Can Relock help with SOC 2 compliance?

Yes, Relock supports SOC 2 compliance:
- **Access controls**: Strong authentication and authorization
- **Audit trails**: Comprehensive logging of all activities
- **Security monitoring**: Real-time threat detection
- **Incident response**: Automated security responses

### What data does Relock store?

Relock stores minimal data:
- **User identifiers**: Email addresses and user IDs
- **Device information**: Browser, OS, and device characteristics
- **Authentication logs**: Verification attempts and results
- **Configuration**: Integration settings and preferences

## Troubleshooting Questions

### Why is my device always treated as new?

This can happen due to:
- **Browser updates**: Major version changes
- **Cleared cookies**: Browser data clearing
- **Privacy mode**: Incognito/private browsing
- **Browser extensions**: Privacy or security extensions

### Why are signature verifications failing?

Signature verification failures can be caused by:
- **Clock drift**: Time synchronization issues
- **Network problems**: Interrupted connections
- **Configuration errors**: Incorrect API keys or settings
- **Rate limiting**: Too many requests

### How do I debug Relock integration issues?

Debug Relock issues by:
- **Checking logs**: Review server and browser logs
- **Verifying configuration**: Confirm API keys and settings
- **Testing endpoints**: Use tools like Postman or curl
- **Reviewing documentation**: Check integration guides

### What should I do if Relock is down?

If Relock is down:
- **Check status page**: Monitor service status
- **Use fallback auth**: Implement backup authentication
- **Contact support**: Report issues immediately
- **Monitor alerts**: Stay informed about updates

## Future and Roadmap Questions

### What features are coming to Relock?

Upcoming features include:
- **Advanced analytics**: Detailed security insights
- **Custom integrations**: More platform support
- **Enhanced mobile**: Improved mobile SDKs
- **AI-powered security**: Machine learning threat detection

### Can I request features for Relock?

Yes, Relock welcomes feature requests:
- **Feature request portal**: Submit ideas and vote
- **Community feedback**: Share suggestions with other users
- **Direct contact**: Reach out to the product team
- **Beta programs**: Test new features early

### How often is Relock updated?

Relock is updated:
- **Weekly**: Bug fixes and minor improvements
- **Monthly**: New features and enhancements
- **Quarterly**: Major releases and improvements
- **As needed**: Security updates and patches

### Is Relock planning to support more platforms?

Yes, Relock is expanding platform support:
- **Mobile platforms**: Enhanced iOS and Android support
- **Desktop applications**: Native app integration
- **IoT devices**: Internet of Things support
- **Enterprise systems**: Legacy system integration

## Conclusion

This FAQ covers the most common questions about Relock. If you have additional questions or need clarification on any topic, please:

- **Check the documentation** for detailed guides
- **Visit the community forum** for discussions
- **Contact support** for direct assistance
- **Schedule a consultation** for complex questions

For more information on specific topics, see the relevant sections of the documentation.
