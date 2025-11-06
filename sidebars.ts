import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
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
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/gateway-login',
        'guides/gateway-logout',
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
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Next.js',
          collapsed: true,
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
};

export default sidebars;