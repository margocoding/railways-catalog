import type { PageContextServer } from 'vike/types'
import { redirect, render } from 'vike/abort'
import { apiOrigin, siteUrl } from '@/renderer/server-config'
import { detailRoute, isKnownPath, productPath, type PageData } from '@/shared/seo/route-data'

export async function data(pageContext: PageContextServer): Promise<PageData> {
  const url = new URL(pageContext.urlOriginal, siteUrl)
  const pathname = url.pathname.replace(/\/$/, '') || '/'
  if (pathname !== url.pathname) throw redirect(pathname + url.search, 301)
  const route = detailRoute(pathname)
  const result: PageData = { url: pathname + url.search, siteUrl, status: isKnownPath(pathname) ? 200 : 404, ssr: !!route || !isKnownPath(pathname) }
  const categories = route || pathname === '/catalog'
    ? fetch(`${apiOrigin}/api/product-category?limit=100`, { signal: AbortSignal.timeout(8000) }).then(async (response) => response.ok ? (await response.json()).items : undefined).catch(() => undefined)
    : Promise.resolve(undefined)
  if (route) {
    try {
      const response = await fetch(`${apiOrigin}/api/${route.kind}/${encodeURIComponent(route.slug)}`, { signal: AbortSignal.timeout(8000) })
      if (response.status === 404) result.status = 404
      else if (!response.ok) result.status = 503
      else {
        const value = await response.json()
        if (route.kind === 'product') result.product = value
        else result.service = value
      }
    } catch { result.status = 503 }
  }
  result.categories = await categories
  if (result.product) {
    const canonical = productPath(result.product)
    if (pathname !== canonical) throw redirect(canonical + url.search, 301)
  }
  if (result.service) {
    const canonical = `/services/${encodeURIComponent(result.service.slug)}`
    if (pathname !== canonical) throw redirect(canonical + url.search, 301)
  }
  if (result.status >= 400) throw render(result.status === 404 ? 404 : 503, result)
  return result
}
