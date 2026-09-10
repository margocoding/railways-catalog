import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { metrikaHit, metrikaId } from './metrika'

/**
 * Считает переходы внутри сайта. Первое открытие страницы Метрика фиксирует
 * сама при инициализации, поэтому первый вызов пропускаем, иначе визит
 * засчитается дважды.
 */
export function MetrikaTracker() {
  const { pathname, search } = useLocation()
  const previous = useRef<string | null>(null)

  useEffect(() => {
    if (!metrikaId) return
    const current = pathname + search
    if (previous.current === null) {
      previous.current = current
      return
    }
    if (previous.current === current) return
    const referrer = window.location.origin + previous.current
    previous.current = current
    metrikaHit(window.location.origin + current, referrer)
  }, [pathname, search])

  return null
}
