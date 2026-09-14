// 14.09.2026 после переезда на traer.ru сервер сайта перестал получать данные по адресу
// API_SERVER_URL из окружения контейнера, и все страницы товаров и услуг отдавали 503,
// хотя публичный https://traer.ru/api работал. Настройку на сервере отсюда не поправить,
// поэтому при сбое основного адреса повторяем запрос через следующий из списка.

type FetchLike = (url: string, init: { signal: AbortSignal }) => Promise<Response>

/** Список адресов API без повторов: сначала основной, затем запасные. */
export function apiOriginList(...origins: string[]): string[] {
  return [...new Set(origins.filter(Boolean))]
}

/**
 * Запрашивает путь у первого отвечающего адреса. Следующий адрес пробуется только при
 * сетевой ошибке, таймауте или ответе 5xx; 404 и прочие ответы возвращаются как есть.
 */
export async function fetchFromApi(origins: string[], path: string, timeoutMs: number, fetchImpl: FetchLike = fetch): Promise<Response> {
  let failure: unknown = new Error('No API origins configured')
  for (const origin of origins) {
    try {
      const response = await fetchImpl(origin + path, { signal: AbortSignal.timeout(timeoutMs) })
      if (response.status < 500) return response
      failure = response
    } catch (error) {
      failure = error
    }
  }
  if (failure instanceof Response) return failure
  throw failure
}
