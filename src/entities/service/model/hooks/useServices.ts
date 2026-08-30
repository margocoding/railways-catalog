import { useState, useEffect, useCallback } from 'react'
import type { Service } from '../types'
import { serviceApi } from '../../api/service.api'


interface UseServicesReturn {
  services: Service[]
  isLoading: boolean
  error: string | null
  loadServices: () => Promise<void>
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadServices = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await serviceApi.getAll({ limit: 100 })
      setServices(response.items)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки услуг')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  return {
    services,
    isLoading,
    error,
    loadServices,
  }
}