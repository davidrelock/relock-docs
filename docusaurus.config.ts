import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

const config: Config = {
  title: 'Relock',
  tagline: 'Zero Trust with Zero UX Friction, 100% of users phishing-resistant in 1 day',
  favicon: 'img/relock_favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://davidrelock.github.io',
  baseUrl: '/relock-docs/',

  organizationName: 'davidrelock',
  projectName: 'relock-docs',
  trailingSlash: false,

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
          editUrl: 'https://github.com/davidrelock/relock-docs/edit/main/',
          docItemComponent: "@theme/ApiItem",
        },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          relock: {
            specPath: "relock-api.yaml",
            outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
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
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'guidesSidebar',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'relocksidebar',
          label: 'API Reference',
        },
        // {
        //   type: 'docSidebar',
        //   position: 'left',
        //   sidebarId: 'cloudGatewaySidebar',
        //   label: 'Cloud Gateway',
        // },
        { href: 'mailto:hi@relock.security?subject=Let\'s set up a demo', label: 'Schedule a demo', position: 'right', className: 'button button--primary' },
        { href: 'https://github.com/davidrelock/relock-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Guides',
          items: [
            { label: 'JavaScript Agent', to: '/docs/guides/js-agent-integration' },
            { label: 'SameSite Integration', to: '/docs/guides/samesite-integration' },
            { label: 'Simple Integration', to: '/docs/guides/simple-integration' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/relocksecurity' },
            { label: 'X', href: 'https://x.com/relock' },
            { label: 'GitHub', href: 'https://github.com/davidrelock/relock-docs' },
          ],
        },
        {
          title: 'More',
          items: [
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
  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],
};

export default config;
