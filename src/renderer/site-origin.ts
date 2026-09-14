// Сайт переехал с tatrels.ru на traer.ru 14.09.2026. В окружении контейнера на сервере
// SITE_URL может остаться прежним, и тогда canonical, og:url и разметка организации на
// каждой странице уводили бы поисковики на мёртвый домен. Старые адреса заменяем
// основным прямо здесь, чтобы исправление не зависело от настройки сервера.
const PRIMARY = 'https://traer.ru'
const MOVED: Record<string, string> = {
  'https://tatrels.ru': PRIMARY,
  'http://tatrels.ru': PRIMARY,
  'https://www.tatrels.ru': PRIMARY,
  'http://www.tatrels.ru': PRIMARY,
  'https://www.traer.ru': PRIMARY,
}

/** Проверяет, что в настройке голый HTTP(S)-адрес без пути, логина и параметров. */
export function parseOrigin(value: string | undefined, name: string): string {
  if (!value) throw new Error(`${name} is required`)
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error(`${name} must be an HTTP(S) origin`)
  return url.origin
}

/** Адрес сайта для canonical и ссылок: старые домены сводятся к основному. */
export function siteOrigin(value: string | undefined): string {
  const origin = parseOrigin(value, 'SITE_URL')
  return MOVED[origin] ?? origin
}
