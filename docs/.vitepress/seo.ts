import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { HeadConfig, PageData } from 'vitepress'

const origin = 'https://pasteq.iofree.xyz'
const route = (file: string) => '/' + file.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')

export function pageHead(page: PageData, srcDir: string): HeadConfig[] {
  if (page.isNotFound || page.relativePath === '404.md') {
    return [['meta', { name: 'robots', content: 'noindex, follow' }]]
  }

  const english = page.relativePath.startsWith('en/')
  const source = page.relativePath.replace(/^en\//, '')
  const url = origin + route(page.relativePath)
  const title = `${page.title} - PasteQ`
  const image = `${origin}/images/screenshots/${english ? 'en' : 'zh'}.png`
  const imageAlt = english ? 'PasteQ clipboard history and search on Mac' : 'PasteQ Mac 剪贴板历史与搜索界面'
  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'PasteQ' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: page.description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:locale', content: english ? 'en_US' : 'zh_CN' }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: '2224' }],
    ['meta', { property: 'og:image:height', content: '1424' }],
    ['meta', { property: 'og:image:alt', content: imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: page.description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['meta', { name: 'twitter:image:alt', content: imageAlt }],
  ]

  // Only advertise language alternatives that actually exist.
  if (existsSync(resolve(srcDir, source)) && existsSync(resolve(srcDir, 'en', source))) {
    head.push(
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: origin + route(source) }],
      ['link', { rel: 'alternate', hreflang: 'en-US', href: origin + route('en/' + source) }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: origin + route(source) }],
      ['meta', { property: 'og:locale:alternate', content: english ? 'zh_CN' : 'en_US' }],
    )
  }

  const data = source === 'index.md' ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'PasteQ',
        url: `${origin}/`,
        inLanguage: ['zh-CN', 'en-US'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${origin}/#app`,
        name: 'PasteQ',
        url,
        description: page.description,
        image: `${origin}/images/app-icon.png`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'macOS, iOS, iPadOS',
        downloadUrl: `https://apps.apple.com/${english ? '' : 'cn/'}app/id6443971843`,
        featureList: english
          ? ['Clipboard history search', 'Source filters', 'Pin and custom groups', 'iCloud sync', 'iPhone snippet keyboard']
          : ['剪贴板历史搜索', '来源筛选', 'Pin 与自定义分组', 'iCloud 同步', 'iPhone 常用文本快捷键盘'],
      },
    ],
  } : {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: english ? 'Home' : '首页', item: `${origin}/${english ? 'en/' : ''}` },
      { '@type': 'ListItem', position: 2, name: page.title, item: url },
    ],
  }

  head.push(['script', { type: 'application/ld+json' }, JSON.stringify(data).replace(/</g, '\\u003c')])
  return head
}
