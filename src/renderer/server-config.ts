import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseOrigin, siteOrigin } from './site-origin'
import { apiOriginList } from './api-fetch'

for (const file of ['.env.local', '.env']) {
  const path = resolve(process.cwd(), file)
  if (existsSync(path)) process.loadEnvFile(path)
}

export const siteUrl = siteOrigin(process.env.SITE_URL)
export const apiOrigin = parseOrigin(process.env.API_SERVER_URL, 'API_SERVER_URL')
// Запасной путь к API — через публичный адрес сайта, см. api-fetch.ts.
export const apiOrigins = apiOriginList(apiOrigin, siteUrl)
