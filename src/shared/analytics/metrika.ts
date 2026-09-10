const rawId = import.meta.env.VITE_METRIKA_ID

/** Номер счётчика Яндекс.Метрики. Пустая строка отключает счётчик целиком. */
export const metrikaId = /^\d+$/.test(rawId ?? '') ? (rawId as string) : ''

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
  }
}

/** Сообщает Метрике о переходе на новый адрес внутри сайта. */
export function metrikaHit(url: string, referrer: string): void {
  if (!metrikaId || typeof window.ym !== 'function') return
  window.ym(Number(metrikaId), 'hit', url, { referer: referrer })
}
