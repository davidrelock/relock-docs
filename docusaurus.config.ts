import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Relock',
  tagline: 'Zero Trust with Zero UX Friction, 100% of users phishing-resistant in 1 day',
  favicon: 'img/relock_favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://relock.security',
  baseUrl: '/',

  organizationName: 'relockid',
  projectName: 'relock-docs',

  onBrokenLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',           // /docs/*
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/relockid/relock-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/relockid/relock-docs/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:image', content: 'img/relock_social_card.jpg'},
    ],
    announcementBar: {
      id: 'announcement-bar',
      content: '🔥 New release: Relock v1.0.0 is now available!',
    },
    colorMode:
    {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: 'img/relock_social_card.jpg',
    navbar: {
      logo: {
        alt: 'Relock Logo',
        src: 'img/relock_logo_light.png',
        srcDark: 'img/relock_logo.png',
      },
      items: [
        { type: 'doc', docId: 'index', label: 'Docs', position: 'left' },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'guidesSidebar',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'cloudGatewaySidebar',
          label: 'Cloud Gateway',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'apiSidebar',
          label: 'API',
        },
        { to: '/blog', label: 'Changelog', position: 'left' },
        { href: 'mailto:hi@relock.security?subject=Let\'s set up a demo', label: 'Schedule a demo', position: 'right', className: 'button button--primary' },
        { href: 'https://github.com/hooked82/relock-dev-examples', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Guides',
          items: [
            { label: 'JavaScript Agent', to: '/docs/guides/js-agent-integration' },
            { label: 'Next.js Integration', to: '/docs/guides/nextjs-integration' },
            { label: 'Simple Integration', to: '/docs/guides/simple-integration' },
          ],
        },
        {
          title: 'Cloud Gateway',
          items: [
            { label: 'Getting Started', to: '/docs/gateway/getting-started' },
            { label: 'Gateway Setup', to: '/docs/gateway/gateway-setup' },
            { label: 'Return Routes', to: '/docs/gateway/return-routes' },
          ],
        },
        {
          title: 'API Reference',
          items: [
            { label: 'API Overview', to: '/docs/api' },
            { label: 'JavaScript Agent API', to: '/docs/api/js-agent-api' },
            { label: 'Gateway API', to: '/docs/api/gateway-api' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/relocksecurity' },
            { label: 'X', href: 'https://x.com/relock' },
            { label: 'GitHub', href: 'https://github.com/hooked82/relock-dev-examples' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Changelog', to: '/blog' },
            { label: 'Security', to: '/docs/security/threat-model' },
            { label: 'Status', href: 'https://status.relock.security' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Relock.`,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['nginx','apacheconf','properties'],
    },
    mermaid: {
      theme: {
        dark: 'dark',
        light: 'default'
      },
      options: {
        darkMode: true,
        themeVariables: {
          darkMode: {
            primaryColor: '#9DFF00',
            primaryTextColor: '#edf2ff',
            primaryBorderColor: '#9DFF00',
            lineColor: '#242938',
            secondaryColor: '#151821',
            tertiaryColor: '#0f1115',
            background: '#0a0a0a',
            surface: '#151821',
            surfaceBorder: '#242938',
            textColor: '#edf2ff',
            textSecondary: '#aab0c0'
          }
        }
      }
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
