---
title: Reverse Proxy Configuration
description: Configure reverse proxies for SameSite and JavaScript Agent integrations
sidebar_label: Reverse Proxy Configuration
---

# Reverse Proxy Configuration

Reverse proxy configuration is required for SameSite and JavaScript Agent integrations. This guide provides detailed configuration examples for popular proxy servers.

:::info Required for Advanced Integrations
Reverse proxy configuration is only needed for SameSite and JavaScript Agent integrations. Simple Integration doesn't require a proxy.
:::

## Overview

### Why Reverse Proxy?

Reverse proxies enable Relock to appear as if it's running on your domain:

1. **Route `/relock/*` requests** to Relock's cloud service
2. **Inject gateway UUID** via `X-Key-Wildcard` header
3. **Maintain SSL termination** and security headers
4. **Preserve user experience** on your domain

### Configuration Requirements

All proxy configurations must:

- **Route `/relock/*`** to `https://relock.host/`
- **Set `X-Key-Wildcard`** header with your gateway UUID
- **Preserve SSL/TLS** termination
- **Maintain security headers**

## Nginx Configuration

### Basic Configuration

```nginx
# Basic Nginx configuration for Relock
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Relock proxy configuration
    location /relock/ {
        proxy_pass https://relock.host/;
        proxy_set_header Host relock.host;
        proxy_set_header X-Key-Wildcard "your-gateway-uuid";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Security headers
        proxy_hide_header X-Powered-By;
        proxy_hide_header Server;
        
        # Timeout configuration
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Your application configuration
    location / {
        proxy_pass http://your-backend;
        # ... other proxy settings
    }
}
```

### Advanced Configuration

```nginx
# Advanced Nginx configuration with security hardening
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Relock proxy configuration
    location /relock/ {
        # Strip any existing X-Key-Wildcard headers
        proxy_set_header X-Key-Wildcard "";
        
        # Route to Relock
        proxy_pass https://relock.host/;
        proxy_set_header Host relock.host;
        proxy_set_header X-Key-Wildcard "your-gateway-uuid";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Security hardening
        proxy_hide_header X-Powered-By;
        proxy_hide_header Server;
        proxy_hide_header X-AspNet-Version;
        proxy_hide_header X-AspNetMvc-Version;
        
        # Timeout configuration
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
        
        # Buffer configuration
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        
        # Error handling
        proxy_intercept_errors on;
        error_page 502 503 504 /50x.html;
    }
    
    # Error page
    location = /50x.html {
        root /usr/share/nginx/html;
    }
    
    # Your application configuration
    location / {
        proxy_pass http://your-backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### HTTP to HTTPS Redirect

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

## Apache Configuration

### Basic Configuration

First, enable required modules:

```bash
# Enable required Apache modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

### VirtualHost Configuration

```xml
<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/html
    
    # SSL configuration
    SSLEngine On
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key
    SSLCertificateChainFile /path/to/your/chain.crt
    
    # Security headers
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    
    # Relock proxy configuration
    <Location /relock/>
        # Route to Relock
        ProxyPass https://relock.host/relock/
        ProxyPassReverse https://relock.host/relock/
        
        # Set gateway UUID
        RequestHeader set X-Key-Wildcard "your-gateway-uuid"
        
        # Security headers
        RequestHeader unset X-Key-Wildcard early
        Header always unset X-Powered-By
        Header always unset Server
    </Location>
    
    # Your application configuration
    <Location />
        ProxyPass http://your-backend/
        ProxyPassReverse http://your-backend/
    </Location>
</VirtualHost>
```

### HTTP to HTTPS Redirect

```xml
<VirtualHost *:80>
    ServerName example.com
    RewriteEngine On
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>
```

## HAProxy Configuration

### Basic Configuration

```haproxy
# HAProxy configuration for Relock
global
    log /dev/log local0
    log /dev/log local1 notice
    chroot /var/lib/haproxy
    stats socket /run/haproxy/admin.sock mode 660 level admin
    stats timeout 30s
    user haproxy
    group haproxy
    daemon

defaults
    log global
    mode http
    option httplog
    option dontlognull
    timeout connect 5000
    timeout client 50000
    timeout server 50000

frontend https_frontend
    bind *:443 ssl crt /path/to/your/certificate.pem
    mode http
    default_backend your_backend
    
    # Relock routing
    acl is_relock path_beg /relock/
    use_backend relock_backend if is_relock

backend relock_backend
    mode http
    server relock relock.host:443 ssl verify none
    http-request set-header X-Key-Wildcard "your-gateway-uuid"
    http-request set-header Host "relock.host"

backend your_backend
    mode http
    server app1 your-backend:8080 check
    server app2 your-backend:8081 check
```

## Traefik Configuration

### Docker Compose Example

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - --api.insecure=true
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.myresolver.acme.httpchallenge=true
      - --certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web
      - --certificatesresolvers.myresolver.acme.email=your-email@example.com
      - --certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    labels:
      - "traefik.enable=true"

  your-app:
    image: your-app:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`example.com`) && !PathPrefix(`/relock/`)"
      - "traefik.http.routers.app.tls=true"
      - "traefik.http.routers.app.tls.certresolver=myresolver"

  relock-proxy:
    image: nginx:alpine
    volumes:
      - ./nginx-relock.conf:/etc/nginx/nginx.conf:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.relock.rule=Host(`example.com`) && PathPrefix(`/relock/`)"
      - "traefik.http.routers.relock.tls=true"
      - "traefik.http.routers.relock.tls.certresolver=myresolver"
```

### Nginx Configuration for Traefik

```nginx
# nginx-relock.conf
events {
    worker_connections 1024;
}

http {
    upstream relock {
        server relock.host:443;
    }
    
    server {
        listen 80;
        
        location /relock/ {
            proxy_pass https://relock;
            proxy_set_header Host relock.host;
            proxy_set_header X-Key-Wildcard "your-gateway-uuid";
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## Cloudflare Configuration

### Enterprise Plan Required

Cloudflare Enterprise plan is required for custom header injection:

```javascript
// Cloudflare Workers script
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  if (url.pathname.startsWith('/relock/')) {
    // Route to Relock with custom header
    const relockUrl = url.href.replace(url.origin, 'https://relock.host')
    
    const modifiedRequest = new Request(relockUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    
    // Add gateway UUID header
    modifiedRequest.headers.set('X-Key-Wildcard', 'your-gateway-uuid')
    modifiedRequest.headers.set('Host', 'relock.host')
    
    return fetch(modifiedRequest)
  }
  
  // Route to your application
  return fetch(request)
}
```

## Testing Your Configuration

### Basic Connectivity Test

```bash
# Test basic connectivity
curl -I https://example.com/relock/health

# Expected response should include Relock headers
# and not show your application's headers
```

### Header Injection Test

```bash
# Test header injection
curl -H "X-Key-Wildcard: test-value" \
     -I https://example.com/relock/health

# The X-Key-Wildcard header should be overwritten
# with your gateway UUID, not the test value
```

### SSL Configuration Test

```bash
# Test SSL configuration
openssl s_client -connect example.com:443 -servername example.com

# Verify certificate chain and cipher suites
```

## Troubleshooting

### Common Issues

#### 502 Bad Gateway
- **Cause**: Relock service unreachable
- **Solution**: Check network connectivity to `relock.host`

#### 404 Not Found
- **Cause**: Incorrect proxy path configuration
- **Solution**: Verify `/relock/` location block configuration

#### Header Not Set
- **Cause**: Incorrect header injection configuration
- **Solution**: Check `X-Key-Wildcard` header setting

#### SSL Errors
- **Cause**: Certificate configuration issues
- **Solution**: Verify SSL certificate and chain configuration

### Debug Commands

#### Nginx Debug
```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log
```

#### Apache Debug
```bash
# Test configuration
sudo apache2ctl configtest

# Check error logs
sudo tail -f /var/log/apache2/error.log

# Check access logs
sudo tail -f /var/log/apache2/access.log
```

#### HAProxy Debug
```bash
# Check configuration
sudo haproxy -c -f /etc/haproxy/haproxy.cfg

# Check stats
echo "show stat" | sudo socat stdio /run/haproxy/admin.sock
```

## Security Considerations

### Header Security

:::warning Important
Always strip any inbound `X-Key-Wildcard` headers from client requests.
:::

```nginx
# Nginx: Strip inbound headers
proxy_set_header X-Key-Wildcard "";

# Apache: Unset inbound headers
RequestHeader unset X-Key-Wildcard early
```

### SSL Security

- **TLS 1.2+**: Require modern TLS versions
- **Strong Ciphers**: Use strong cipher suites
- **HSTS**: Enable HTTP Strict Transport Security
- **Certificate Validation**: Validate Relock's SSL certificate

### Access Control

- **IP Restrictions**: Limit proxy access to trusted sources
- **Authentication**: Consider proxy-level authentication
- **Monitoring**: Monitor proxy access logs
- **Rate Limiting**: Implement rate limiting if needed

## Next Steps

### Configuration Validation

1. **Test Connectivity**: Verify Relock service reachability
2. **Validate Headers**: Confirm header injection works
3. **Check SSL**: Verify SSL configuration
4. **Test Integration**: Validate complete authentication flow

### Security Hardening

- **Review Security Headers**: Implement recommended security headers
- **Monitor Logs**: Set up log monitoring and alerting
- **Regular Updates**: Keep proxy software updated
- **Security Audits**: Regular security assessments

### Documentation

- **Configuration Backup**: Document your configuration
- **Change Procedures**: Document change management procedures
- **Troubleshooting Guide**: Create internal troubleshooting documentation
- **Contact Information**: Document support contacts

## Need Help?

- **Configuration Issues**: [Contact our team](mailto:hi@relock.security?subject=Proxy%20Configuration%20Help)
- **Integration Support**: Review [integration guides](../integration/integration-overview)
- **Security Questions**: Check [security hardening guide](./security-hardening)
- **Community Support**: [GitHub Discussions](https://github.com/hooked82/relock-dev-examples/discussions)
