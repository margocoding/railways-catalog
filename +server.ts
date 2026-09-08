import vike from 'vike/fetch'
import type { Server } from 'vike/types'
import { apiOrigin } from './src/renderer/server-config'

export default {
  async fetch(request: Request) {
    const url = new URL(request.url)
    if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt' || url.pathname.startsWith('/sitemaps/') || url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) {
      try {
        const headers = new Headers(request.headers)
        headers.delete('host')
        const upstream = new Request(apiOrigin + url.pathname + url.search, request)
        return await fetch(upstream, { headers, redirect: 'manual', signal: AbortSignal.timeout(30000) })
      } catch {
        return new Response('Сервис временно недоступен', { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
      }
    }
    return vike.fetch(request)
  },
  prod: { port: Number(process.env.PORT || 3000), hostname: process.env.HOST || '0.0.0.0' },
} satisfies Server
