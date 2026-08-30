import { useState, useEffect, useCallback } from 'react'
import type { Service } from '../types'
import { serviceApi } from '../../api/service.api'

interface UseServiceReturn {
  service: Service | null
  isLoading: boolean
  error: string | null
  notFound: boolean
  loadService: (slug: string) => Promise<void>
}

export function useService(slug: string | undefined): UseServiceReturn {
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const loadService = useCallback(async (slug: string) => {
    setIsLoading(true)
    setError(null)
    setNotFound(false)
    setService(null)

    try {
      const data = await serviceApi.getBySlug(slug)
      setService(data)
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 404) {
        setNotFound(true)
      } else {
        setError(err.message || 'Ошибка загрузки услуги')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (slug) {
      loadService(slug)
    }
  }, [slug, loadService])

  return {
    service,
    isLoading,
    error,
    notFound,
    loadService,
  }
}