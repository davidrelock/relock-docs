import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Main docs sidebar - comprehensive documentation
  tutorialSidebar: [
    // Overview
    'index',
    'relock-comprehensive-guide',
    
    // Getting Started
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      collapsible: false,
      items: [
        'getting-started/quickstart-overview',
        'getting-started/quickstart-cloud',
        'getting-started/quickstart-samesite',
        'getting-started/quickstart-js-agent',
      ],
    },
    
    // Concepts
    {
      type: 'category',
      label: 'Concepts',
      link: {
        type: 'doc',
        id: 'concepts/what-is-relock',
      },
      items: [
        'concepts/what-is-relock',
        'concepts/how-it-works',
        'concepts/security-model',
        'concepts/comparison',
      ],
    },
    
    // Integration
    {
      type: 'category',
      label: 'Integration',
      link: {
        type: 'doc',
        id: 'integration/integration-overview',
      },
      items: [
        'integration/integration-overview',
        'integration/simple-integration',
        'integration/samesite-integration',
        'integration/js-agent-integration',
        'integration/api-reference',
      ],
    },
    
    // Deployment
    {
      type: 'category',
      label: 'Deployment',
      link: {
        type: 'doc',
        id: 'deployment/prerequisites',
      },
      items: [
        'deployment/prerequisites',
        'deployment/reverse-proxy',
        'deployment/security-hardening',
        'deployment/troubleshooting',
      ],
    },
    
    // Security
    {
      type: 'category',
      label: 'Security',
      link: {
        type: 'doc',
        id: 'security/threat-model',
      },
      items: [
        'security/threat-model',
        'security/compliance',
        'security/best-practices',
        'security/incident-response',
      ],
    },
    
    // Examples
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples/index',
      },
      items: [
        {
          type: 'category',
          label: 'Next.js',
          link: {
            type: 'doc',
            id: 'examples/nextjs/index',
          },
          items: [
            'examples/nextjs/relock-nextjs-middleware',
            'examples/nextjs/relock-nextjs-minimal',
          ],
        },
        // Future: nodejs, python, mobile, etc.
      ],
    },
    
    // Reference
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'doc',
        id: 'reference/configuration',
      },
      items: [
        'reference/configuration',
        'reference/status-codes',
        'reference/events',
        'reference/glossary',
        'reference/faq',
      ],
    },
    
    // Roadmap
    {
      type: 'category',
      label: 'Roadmap',
      link: {
        type: 'doc',
        id: 'roadmap/index',
      },
      items: [
        'roadmap/index',
        'roadmap/q1-2025-foundation',
        'roadmap/auth0-integration',
        'roadmap/future-roadmap',
        'roadmap/personal-roadmap',
        'roadmap/personal-roadmap2',
        'roadmap/developer-experience',
        'roadmap/developer-experience-plan',
        'roadmap/github-plan',
      ],
    },
  ],

  // Guides sidebar - tutorial-style content
  guidesSidebar: [
    'guides/index',
    {
      type: 'link',
      label: 'Demo Access',
      href: 'https://relock.host',
      autoAddBaseUrl: false,
    },
    {
      type: 'category',
      label: 'Deployment Methods',
      collapsed: false,
      items: [
        'guides/simple-integration',
        'guides/samesite-integration',
        'guides/js-agent-integration',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: true,
      items: [
        'use-cases/mfa-factor',
        'use-cases/secure-remember-me',
        'use-cases/password-reset',
        'use-cases/account-takeover',
      ],
    },
    {
      type: 'category',
      label: 'Learning Relock',
      collapsed: true,
      items: [
        'concepts/what-is-relock',
        'concepts/benefits-and-impact',
        'concepts/chained-access-keys',
        'concepts/mutual-encryption',
        'concepts/security-consideration',
        'concepts/deployment-models',
        'concepts/security-signals',
        'concepts/planning-use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples/index',
      },
      items: [
        {
          type: 'category',
          label: 'Next.js',
          link: {
            type: 'doc',
            id: 'examples/nextjs/index',
          },
          items: [
            'examples/nextjs/relock-nextjs-middleware',
            'examples/nextjs/relock-nextjs-minimal',
          ],
        },
      ],
    },
  ],

  // Cloud Gateway sidebar - relock.host Cloud Gateway documentation
  cloudGatewaySidebar: [
    'gateway/index',
    'gateway/getting-started',
    'gateway/gateway-setup',
    'gateway/return-routes',
  ],

  // API Reference sidebar - technical reference
  apiSidebar: [
    'api/index',
    'api/js-agent-api',
    'api/gateway-api',
  ],
};

export default sidebars;