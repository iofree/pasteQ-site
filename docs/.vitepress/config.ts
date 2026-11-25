import { defineConfig } from 'vitepress'
import { pageHead } from './seo'

export default defineConfig({
  title: 'PasteQ',
  titleTemplate: ':title - PasteQ',
  description: 'PasteQ 提供 Mac 应用启动器与 Mac、iPhone、iPad 剪贴板管理，支持拼音找应用、历史搜索、来源筛选、iCloud 同步、iPhone 轻点背面收集与快捷键盘。',
  lang: 'zh-CN',
  cleanUrls: true,
  outDir: '../dist',

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/images/app-icon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/app-icon.png' }],
    ['meta', { name: 'theme-color', content: '#007AFF' }],
    ['meta', { name: 'author', content: 'iofree' }],
    ['meta', { name: 'apple-itunes-app', content: 'app-id=6443971843' }],
  ],

  transformPageData(pageData, { siteConfig }) {
    pageData.frontmatter.head = [
      ...(pageData.frontmatter.head || []),
      ...pageHead(pageData, siteConfig.srcDir),
    ]
  },

  transformHead({ pageData }) {
    if (pageData.isNotFound) return [['meta', { name: 'robots', content: 'noindex, follow' }]]
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/getting-started' },
          { text: '工具对比', items: [
            { text: 'PasteQ 与 Raycast', link: '/compare/raycast' },
            { text: 'PasteQ 与 Tinycast', link: '/compare/tinycast' },
            { text: 'Raycast、Tinycast 怎么选', link: '/compare/raycast-vs-tinycast' },
          ] },
          { text: 'App Store', link: 'https://apps.apple.com/cn/app/id6443971843' }
        ],
        sidebar: {
          '/compare/': [
            {
              text: '工具对比',
              items: [
                { text: 'PasteQ 与 Raycast', link: '/compare/raycast' },
                { text: 'PasteQ 与 Tinycast', link: '/compare/tinycast' },
                { text: 'Raycast、Tinycast 怎么选', link: '/compare/raycast-vs-tinycast' },
                { text: '开始使用 PasteQ', link: '/guide/getting-started' },
              ],
            },
          ],
          '/guide/': [
            {
              text: '使用指南',
              items: [
                { text: '快速上手', link: '/guide/getting-started' },
                { text: '轻点背面收集', link: '/guide/back-tap-clipboard' },
                { text: 'iPhone 快捷键盘', link: '/guide/iphone-keyboard' },
                { text: '常见问题', link: '/guide/faq' },
              ],
            },
            {
              text: '关于App',
              items: [
                { text: '开发初衷', link: '/guide/development-motivation' },
                { text: '多设备同步', link: '/guide/multi-device-sync' },
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
      description: 'PasteQ combines a Mac app launcher with clipboard management for Mac, iPhone and iPad, including pinyin app search, source filters, iCloud sync, Back Tap capture and a saved-text keyboard.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Compare', items: [
            { text: 'PasteQ vs Raycast', link: '/en/compare/raycast' },
            { text: 'PasteQ vs Tinycast', link: '/en/compare/tinycast' },
            { text: 'Raycast vs Tinycast', link: '/en/compare/raycast-vs-tinycast' },
          ] },
          { text: 'App Store', link: 'https://apps.apple.com/app/id6443971843' }
        ],
        sidebar: {
          '/en/compare/': [
            {
              text: 'Compare Tools',
              items: [
                { text: 'PasteQ vs Raycast', link: '/en/compare/raycast' },
                { text: 'PasteQ vs Tinycast', link: '/en/compare/tinycast' },
                { text: 'Raycast vs Tinycast', link: '/en/compare/raycast-vs-tinycast' },
                { text: 'Get Started with PasteQ', link: '/en/guide/getting-started' },
              ],
            },
          ],
          '/en/guide/': [
            {
              text: 'User Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Back Tap Capture', link: '/en/guide/back-tap-clipboard' },
                { text: 'iPhone Keyboard', link: '/en/guide/iphone-keyboard' },
                { text: 'FAQ', link: '/en/guide/faq' },
              ],
            },
            {
              text: 'About App',
              items: [
                { text: 'Motivation', link: '/en/guide/development-motivation' },
                { text: 'Multi-Device Sync', link: '/en/guide/multi-device-sync' },
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
    hostname: 'https://pasteq.iofree.xyz',
    transformItems: (items) => items.filter((item) => !/^404(?:\.html)?$/.test(item.url)),
  },
  lastUpdated: true,
})
