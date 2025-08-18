import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PasteQ',
  titleTemplate: ':title - PasteQ',
  description: 'PasteQ - 悬浮剪贴板，搜索复制粘贴，纯快捷键无需鼠标',
  cleanUrls: true,
  outDir: '../dist',

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/app-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/images/app-icon.png' }],
    
    ['meta', { name: 'theme-color', content: '#007AFF' }],
    ['meta', { name: 'keywords', content: 'PasteQ, Raycast, clipboard, mac, app, download, free, search, copy, paste, 剪贴板, mac, app, 下载, 免费, 搜索, 复制, 粘贴' }],
    ['link', { rel: 'canonical', href: 'https://pasteq.iofree.xyz' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'PasteQ - 悬浮剪贴板，搜索复制粘贴，纯快捷键无需鼠标' }],
    ['meta', { property: 'og:description', content: 'PasteQ - 悬浮剪贴板，搜索复制粘贴，纯快捷键无需鼠标' }],
    ['meta', { property: 'og:image', content: 'https://pasteq.iofree.xyz/images/app-icon.png' }],
    ['meta', { property: 'og:url', content: 'https://pasteq.iofree.xyz' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'PasteQ - 悬浮剪贴板，搜索复制粘贴，纯快捷键无需鼠标' }],
    ['meta', { name: 'twitter:description', content: 'PasteQ - 悬浮剪贴板，搜索复制粘贴，纯快捷键无需鼠标' }],
    ['meta', { name: 'twitter:image', content: 'https://pasteq.iofree.xyz/images/app-icon.png' }],

    
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/getting-started' },
          { text: 'App Store', link: 'https://apps.apple.com/app/id6443971843' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '使用指南',
              items: [
                { text: '快速上手', link: '/guide/getting-started' },
                { text: '常见问题', link: '/guide/faq' },
              ],
            },
            {
              text: '关于App',
              items: [
                { text: '开发初衷', link: '/guide/development-motivation' },
              ]
            },
            {
              text: '反馈与建议',
              items: [
                { text: '联系我们', link: '/guide/contact' },
              ]
            }
          ]
        },
        footer: {
          message: '<a href="/guide/privacy">隐私政策</a> | <a href="/guide/terms">服务条款</a>',
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'PasteQ - Floating clipboard, search, copy, and paste with pure keyboard shortcuts.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'App Store', link: 'https://apps.apple.com/app/id6443971843' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'User Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'FAQ', link: '/en/guide/faq' },
              ],
            },
            {
              text: 'About App',
              items: [
                { text: 'Motivation', link: '/en/guide/development-motivation' },
              ]
            },
            {
              text: 'Feedback & Suggestions',
              items: [
                { text: 'Contact Us', link: '/en/guide/contact' },
              ]
            }
          ]
        },
        footer: {
          message: '<a href="/en/guide/privacy">Privacy Policy</a> | <a href="/en/guide/terms">Terms of Service</a>',
        }
      }
    }
  },

  themeConfig: {
    logo: '/images/app-icon.png',
    search: {
      provider: 'local'
    },
  },
  sitemap: {
    hostname: 'https://pasteq.iofree.xyz'
  },
  lastUpdated: true,
})
