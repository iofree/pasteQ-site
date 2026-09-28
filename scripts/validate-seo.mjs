import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const origin = 'https://pasteq.iofree.xyz'
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = resolve(dir, entry.name)
  return entry.isDirectory() ? files(path) : [path]
})
const route = (file) => '/' + relative(root, file).replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')
const pages = new Map(files(root).filter((file) => file.endsWith('.html')).map((file) => [
  origin + route(file),
  new JSDOM(readFileSync(file, 'utf8')).window.document,
]))
const titles = new Set()
const descriptions = new Set()

function one(document, selector, url) {
  const elements = document.querySelectorAll(selector)
  assert.equal(elements.length, 1, `${url}: expected one ${selector}`)
  return elements[0]
}

for (const [url, document] of pages) {
  if (url === `${origin}/404`) {
    assert.match(one(document, 'meta[name="robots"]', url).content, /noindex/, '404 must not be indexed')
    continue
  }

  const english = new URL(url).pathname.startsWith('/en/')
  assert.equal(document.documentElement.lang, english ? 'en-US' : 'zh-CN', `${url}: language`)
  const title = one(document, 'title', url).textContent
  const description = one(document, 'meta[name="description"]', url).content
  assert.ok(title && !titles.has(title), `${url}: missing or repeated title`)
  assert.ok(description && !descriptions.has(description), `${url}: missing or repeated description`)
  assert.equal((title.match(/PasteQ/g) || []).length, 1, `${url}: repeated brand in title`)
  titles.add(title)
  descriptions.add(description)
  one(document, 'h1', url)
  assert.equal(one(document, 'link[rel="canonical"]', url).href, url, `${url}: canonical`)
  assert.equal(one(document, 'meta[property="og:url"]', url).content, url, `${url}: OG URL`)
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    assert.equal(one(document, selector, url).content, title, `${url}: social title`)
  }
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    assert.equal(one(document, selector, url).content, description, `${url}: social description`)
  }

  for (const language of ['zh-CN', 'en-US', 'x-default']) {
    const alternate = one(document, `link[rel="alternate"][hreflang="${language}"]`, url).href
    const target = pages.get(alternate)
    assert.ok(target, `${url}: missing language target ${alternate}`)
    const currentLanguage = english ? 'en-US' : 'zh-CN'
    assert.equal(one(target, `link[rel="alternate"][hreflang="${currentLanguage}"]`, alternate).href, url, `${url}: non-reciprocal language link`)
  }

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    assert.ok(script.textContent.trim(), `${url}: empty JSON-LD`)
    const data = JSON.parse(script.textContent)
    assert.equal(data['@context'], 'https://schema.org', `${url}: schema context`)
    assert.ok(!script.hasAttribute('innerHTML'), `${url}: JSON-LD stored as an attribute`)
  }
  one(document, 'script[type="application/ld+json"]', url)

  for (const image of document.querySelectorAll('img[src]')) {
    const src = new URL(image.getAttribute('src'), url)
    if (src.origin === origin) assert.ok(existsSync(resolve(root, '.' + decodeURIComponent(src.pathname))), `${url}: missing image ${src.pathname}`)
    assert.ok(image.hasAttribute('alt'), `${url}: missing image alt`)
  }
  for (const link of document.querySelectorAll('a[href]')) {
    const target = new URL(link.getAttribute('href'), url)
    if (target.origin !== origin) continue
    const page = pages.get(target.origin + target.pathname)
    if (page) {
      if (target.hash) assert.ok(page.getElementById(decodeURIComponent(target.hash.slice(1))), `${url}: missing anchor ${target.href}`)
    } else {
      assert.ok(existsSync(resolve(root, '.' + decodeURIComponent(target.pathname))), `${url}: broken internal link ${target.href}`)
    }
  }
}

const sitemap = new JSDOM(readFileSync(resolve(root, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' }).window.document
const locations = [...sitemap.querySelectorAll('url > loc')].map((node) => node.textContent)
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URLs')
assert.ok(!locations.some((url) => url.includes('/404')), '404 in sitemap')
for (const url of locations) assert.ok(pages.has(url), `Sitemap target does not exist: ${url}`)
for (const url of pages.keys()) {
  if (url !== `${origin}/404`) assert.ok(locations.includes(url), `Page missing from sitemap: ${url}`)
}
assert.match(readFileSync(resolve(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/pasteq\.iofree\.xyz\/sitemap\.xml/, 'robots.txt sitemap')
console.log(`Validated ${titles.size} pages: metadata, languages, JSON-LD, images, internal links and sitemap.`)
