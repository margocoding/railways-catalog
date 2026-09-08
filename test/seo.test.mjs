import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plainText, formatSpec, jsonForHtml } from '../src/shared/lib/plain-text.ts'
import { getMetadata } from '../src/shared/seo/metadata.ts'
import { detailRoute, productPath } from '../src/shared/seo/route-data.ts'

test('legacy HTML units become safe readable text without changing units', () => {
  assert.equal(formatSpec('0,25', 'м<sup>3</sup>'), '0,25 м³')
  assert.equal(plainText('м&lt;sup&gt;2&lt;/sup&gt; &amp; &nbsp;'), 'м² &')
  assert.equal(plainText('<script>alert(1)</script><b>15</b>&nbsp;мм'), '15 мм')
  assert.equal(plainText('x < 5'), 'x < 5')
  assert.equal(plainText('&#99999999;'), '')
})
test('JSON serialization cannot terminate the containing script', () => {
  const value = { description: '</script><script>alert(1)</script>\u2028&' }
  const json = jsonForHtml(value)
  assert.ok(!json.includes('<') && !json.includes('&'))
  assert.deepEqual(JSON.parse(json), value)
})
test('product metadata is unique, self canonical and uses the configured domain', () => {
  const product = { slug: 'bolt', title: 'Болт М22', gost: 'ГОСТ 16017', images: [], categorySlug: 'fasteners', description: 'Закладной болт' }
  const url = productPath(product)
  const data = { url, siteUrl: 'https://catalog.example', status: 200, ssr: true, product }
  const meta = getMetadata(url + '?utm_source=test', data)
  assert.equal(meta.canonical, 'https://catalog.example/catalog/fasteners/product/bolt')
  assert.match(meta.title, /Болт М22/)
  assert.match(meta.description, /Закладной болт/)
  assert.deepEqual(detailRoute(url), { kind: 'product', slug: 'bolt' })
})
test('public navigation clears noindex and stale service metadata', () => {
  const data = { url: '/', siteUrl: 'https://catalog.example', status: 200, ssr: false }
  assert.match(getMetadata('/cart', data).robots, /noindex/)
  assert.match(getMetadata('/about', data).robots, /^index/)
  assert.notEqual(getMetadata('/about', data).title, getMetadata('/contacts', data).title)
  assert.deepEqual(getMetadata('/about', data).jsonLd, [])
})
test('category pagination has its own canonical; filter variants remain out of the index', () => {
  const data = { url: '/catalog', siteUrl: 'https://catalog.example', status: 200, ssr: false, categories: [{ slug: 'rails', name: 'Рельсы', description: 'Железнодорожные рельсы разных профилей', subcategories: [] }] }
  const meta = getMetadata('/catalog?category=rails&page=2', data)
  assert.equal(meta.canonical, 'https://catalog.example/catalog?category=rails&page=2')
  assert.match(meta.title, /страница 2/)
  assert.match(getMetadata('/catalog?search=rails', data).robots, /noindex/)
})
