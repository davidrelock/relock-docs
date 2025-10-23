---
title: "Developer Experience Plan"
description: "Plan for building excellent developer experience with Relock"
sidebar_label: "Developer Experience Plan"
---

# Developer Experience Plan

## Questions

- Who is in charge of theming/design?
- Why exactly must the relock.js be hosted in relock.host instead of in an SDK or self-hosted?  (For the docs)
- Reasoning for this (For Dev Docs - Advanced Security Section)
  - Do not use inline onClick= etc. Prefer addEventListener in nonce-authorized blocks

## Docusaurus

### Needs

- Introduction
- Getting Started
- Quick Start Guides
- Implementations
- Examples
- Release Notes

### Issues
- Can't get CSS to override
    ```css
  .theme-doc-sidebar-item-category .menu__list div.menu__list-item-collapsible a.menu__link:hover, 
  .theme-doc-sidebar-item-category .menu__list div.menu__list-item-collapsible a.menu__link--active {
      background: var(--menu-link-active-background) !important;
      background-color: var(--menu-link-active-background) !important;
  }
    ```
- According to Comprehensive Guide, passing invalid Gateway UUID should reject or treat the session as untrusted (Changing the header had no impact)

## GitHub Needs
- What ORG to use?  Single ORG or multiple?


## GitLab Needs



## Branding Needs
- Consistent Logos
- Single website


## Docs Topics
- When Rekeying happens, why, and how to modify the time between rekeys (relock.host settings)
- Reverse Proxy Configuration, Middleware Next.js implementation
- Including JS (Note admonition saying it should be on all pages/layout)
- Always use HSTS (HTTP Strict Transport Security)
- 