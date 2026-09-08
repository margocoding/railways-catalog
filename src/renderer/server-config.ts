import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

for (const file of ['.env.local', '.env']) {
  const path = resolve(process.cwd(), file)
  if (existsSync(path)) process.loadEnvFile(path)
}

function origin(value: string | undefined, name: string): string {
  if (!value) throw new Error(`${name} is required`)
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error(`${name} must be an HTTP(S) origin`)
  return url.origin
}
export const siteUrl = origin(process.env.SITE_URL, 'SITE_URL')
export const apiOrigin = origin(process.env.API_SERVER_URL, 'API_SERVER_URL')
