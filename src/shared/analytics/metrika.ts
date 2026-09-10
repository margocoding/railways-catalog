/**
 * Номер счётчика Яндекс.Метрики. Не является секретом: он виден в исходном
 * коде каждой страницы. Хранится в коде, потому что настройки боевой сборки
 * лежат в секрете VITE_ENV, прочитать который нельзя, а значит нельзя и
 * дописать в него ключ, не потеряв остальные значения.
 */
const DEFAULT_METRIKA_ID = '112450496'

const configured = (import.meta.env.VITE_METRIKA_ID ?? '').trim()

/**
 * В сборке для боевого сервера счётчик включён по умолчанию, при разработке —
 * выключен, чтобы не искажать статистику. VITE_METRIKA_ID переопределяет
 * номер, любое нечисловое значение (например off) отключает счётчик совсем.
 */
const resolved = configured === '' ? (import.meta.env.PROD ? DEFAULT_METRIKA_ID : '') : configured

export const metrikaId = /^\d+$/.test(resolved) ? resolved : ''

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

/**
 * Цель «Отправка формы» в Метрике. Вызывать только после успешной отправки:
 * сервер ответил успехом и пользователь видит подтверждение. На ошибках
 * валидации, ошибках отправки и открытии формы цель не засчитывается.
 */
export const FORM_GOAL = 'forma'

/** Засчитывает цель в Метрике. */
export function metrikaReachGoal(goal: string): void {
  if (!metrikaId || typeof window.ym !== 'function') return
  window.ym(Number(metrikaId), 'reachGoal', goal)
}
