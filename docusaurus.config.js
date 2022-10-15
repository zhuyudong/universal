// @ts-check
const buildType = process.env.BUILD_TYPE
const users = require('./showcase.json')
// const versions = require('./versions.json')

// const lastVersion = versions[0]
const copyright = `Copyright © ${new Date().getFullYear()} zhuyudong@aliyun.com`

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('@docusaurus/types').Config} */
module.exports = async () => {
  const mdxMermaid = await import('mdx-mermaid')

  /** @type {import('@docusaurus/preset-classic').Options.Docs} */
  const commonDocsOptions = {
    breadcrumbs: false,
    showLastUpdateAuthor: false,
    showLastUpdateTime: true,
    editUrl: 'https://github.com/zhuyudong/universal/blob/main/',
    remarkPlugins: [mdxMermaid.default]
  }

  return {
    title: 'Universal Documentation',
    tagline: 'Universal Document platform based on docusaurus',
    // organizationName: 'kunlunjs',
    projectName: 'kunlun-universal',
    url: 'https://kunlun.run',
    baseUrl: '/',
    clientModules: [],
    trailingSlash: false, // because trailing slashes can break some existing relative links
    scripts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
        defer: true
      }
      // {
      //   src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
      //   defer: true
      // },
      // { src: 'https://snack.expo.dev/embed.js', defer: true }
    ],
    favicon: 'img/favicon.ico',
    titleDelimiter: '·',
    customFields: {
      users,
      facebookAppId: ''
    },
    i18n: {
      defaultLocale: 'en',
      // locales: ['en']
      locales: ['en', ...(buildType === 'i18n' ? ['zh-CN', 'zh-TW'] : [])]
    },
    onBrokenLinks: 'throw',
    webpack: {
      jsLoader: isServer => ({
        loader: require.resolve('esbuild-loader'),
        options: {
          loader: 'tsx',
          format: isServer ? 'cjs' : undefined,
          target: isServer ? 'node12' : 'es2017'
        }
      })
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          debug: true,
          // https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs
          docs: {
            path: './docs',
            sidebarPath: require.resolve('./sidebars/sidebars.json'),
            // editCurrentVersion: true,
            // onlyIncludeVersions:
            //   process.env.PREVIEW_DEPLOY === 'true'
            //     ? ['current', ...versions.slice(0, 2)]
            //     : undefined,
            // versions: {
            //   [lastVersion]: {
            //     badge: false // Do not show version badge for last RN version
            //   }
            // },
            ...commonDocsOptions
          },
          // https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-blog
          blog: {
            path: 'blog',
            blogSidebarCount: 'ALL',
            blogSidebarTitle: 'All Blog Posts',
            showReadingTime: true,
            postsPerPage: 5,
            // remarkPlugins: [],
            // rehypePlugins: [],
            feedOptions: {
              type: 'all',
              copyright
            }
          },
          theme: {
            customCss: [
              require.resolve('./src/css/customTheme.scss'),
              require.resolve('./src/css/index.scss'),
              require.resolve('./src/css/showcase.scss'),
              require.resolve('./src/css/versions.scss'),
              require.resolve('./src/css/antd.css'),
              // require.resolve('./node_modules/antd/dist/antd.css'),
              require.resolve('./src/css/override.scss')
            ]
          }
          // googleAnalytics: {
          //   trackingID: ''
          // },
          // gtag: {
          //   trackingID: ''
          // }
        })
      ]
    ],
    plugins: [
      'plugin-image-zoom',
      'docusaurus-plugin-sass',
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'code-snippets',
          path: 'content/code-snippets',
          routeBasePath: '/code-snippets',
          sidebarPath: require.resolve('./sidebars/sidebarsCodeSnippets.json'),
          ...commonDocsOptions
        })
      ],
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'opensource-tools',
          path: 'content/opensource-tools',
          routeBasePath: '/opensource-tools',
          sidebarPath: require.resolve(
            './sidebars/sidebarsOpensourceTools.json'
          ),
          ...commonDocsOptions
        })
      ],
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'tech-news',
          path: 'content/tech-news',
          routeBasePath: '/tech-news',
          sidebarPath: require.resolve('./sidebars/sidebarsTechNews.json'),
          ...commonDocsOptions
        })
      ],
      [
        '@docusaurus/plugin-pwa',
        {
          debug: true,
          offlineModeActivationStrategies: ['appInstalled', 'queryString'],
          pwaHead: [
            {
              tagName: 'link',
              rel: 'icon',
              href: '/img/pwa/manifest-icon-512.png'
            },
            {
              tagName: 'link',
              rel: 'manifest',
              href: '/manifest.json'
            },
            {
              tagName: 'meta',
              name: 'theme-color',
              content: '#20232a'
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-capable',
              content: 'yes'
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#20232a'
            },
            {
              tagName: 'link',
              rel: 'apple-touch-icon',
              href: '/img/pwa/manifest-icon-512.png'
            },
            {
              tagName: 'link',
              rel: 'mask-icon',
              href: '/img/pwa/manifest-icon-512.png',
              color: '#06bcee'
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileImage',
              href: '/img/pwa/manifest-icon-512.png'
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileColor',
              content: '#20232a'
            }
          ]
        }
      ]
      // 依赖的 sharp 在 k8s 上下载有问题
      // https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-ideal-image
      // '@docusaurus/plugin-ideal-image'
    ],
    themes: [
      // use algolia
      // https://github.com/easyops-cn/docusaurus-search-local
      // [
      //   require.resolve('@easyops-cn/docusaurus-search-local'),
      //   {
      //     hashed: true,
      //     language: ['en', 'zh'],
      //     docsRouteBasePath: ['/docs', '/content']
      //   }
      // ],
      isDev && require.resolve('./plugins/reference-codeblock/build/')
    ].filter(Boolean),
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // announcementBar: {
        //   id: '',
        //   content:
        //     '',
        //   backgroundColor: '#20232a',
        //   textColor: '#fff',
        //   isCloseable: false,
        // },
        prism: {
          defaultLanguage: 'jsx',
          theme: require('./core/PrismTheme'),
          additionalLanguages: [
            'java',
            'kotlin',
            'objectivec',
            'swift',
            'groovy',
            'ruby',
            'flow'
          ]
        },
        navbar: {
          title: '『心之所向·身之所往』',
          // FIXME
          logo: {
            src: '/img/header_logo.bak.svg',
            alt: 'logo'
          },
          style: 'dark',
          items: [
            // 默认使用 /docs 和 /versioned_docs 做内容和侧边栏，可以做版本管理
            {
              label: '博客',
              to: '/blog',
              position: 'right'
            },
            {
              label: '代码片段',
              type: 'doc',
              docId: 'miscellaneous',
              position: 'right',
              // 指向 content-docs id: "code-snippets"，使用默认 /docs 时不需要此项
              docsPluginId: 'code-snippets'
            },
            {
              label: '科技资讯',
              type: 'doc',
              docId: 'tech-news-overview',
              position: 'right',
              docsPluginId: 'tech-news'
            },
            {
              label: '名句箴言',
              type: 'doc',
              docId: 'proverbs',
              position: 'right'
            },
            {
              label: '开源软件 & 工具',
              type: 'doc',
              docId: 'code-snippets-manager',
              position: 'right',
              docsPluginId: 'opensource-tools'
            },
            // {
            //   type: 'docsVersionDropdown',
            //   position: 'left',
            //   dropdownActiveClassDisabled: true,
            //   dropdownItemsAfter: [
            //     {
            //       to: '/versions',
            //       label: 'All versions'
            //     }
            //   ]
            // },
            {
              'href': 'https://github.com/zhuyudong/universal',
              'aria-label': 'GitHub repository',
              'position': 'right',
              'className': 'navbar-github-link'
            }
          ]
        },
        image: 'img/logo-og.png',
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Getting Started',
                  // to: 'docs/miscellaneous'
                  to: 'code-snippets/miscellaneous'
                }
              ]
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'The Documatation Community',
                  to: 'help'
                }
              ]
            },
            {
              title: 'Find us',
              items: [
                {
                  label: 'Blog',
                  to: 'blog'
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/zhuyudong/universal'
                }
              ]
            },
            {
              title: 'More',
              items: [
                {
                  label: 'Documentation',
                  href: 'https://kunlun.run'
                }
              ]
            }
          ],
          // logo: {
          //   alt: 'Open Source Logo',
          //   src: 'img/oss_logo.svg',
          //   href: ''
          // },
          copyright
        },
        // https://www.algolia.com/account/overview
        algolia: {
          appId: 'NXO6HFGH7Y',
          apiKey: '902251a281c4e30c71b74836ac356ece',
          indexName: 'kunlun-universal',
          contextualSearch: true
        },
        metadata: [
          {
            property: 'og:image',
            content: 'https://kunlun.run/img/logo-og.png'
          },
          { name: 'twitter:card', content: 'summary_large_image' },
          {
            name: 'twitter:image',
            content: 'https://kunlun.run/img/logo-og.png'
          }
        ]
      })
  }
}
