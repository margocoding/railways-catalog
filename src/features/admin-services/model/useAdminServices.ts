import { useState, useEffect, useCallback } from 'react'
import type { Service, CreateServiceDto, UpdateServiceDto, GetServicesParams } from '@/entities/service/model/types'
import type { PaginationMeta } from '@/shared/api'
import { serviceApi } from '@/entities/service/api/service.api'

interface UseAdminServicesReturn {
  services: Service[]
  pagination: PaginationMeta
  isLoading: boolean
  error: string | null
  loadServices: (params?: GetServicesParams) => Promise<void>
  createService: (dto: CreateServiceDto, image: File | null) => Promise<void>
  updateService: (id: string, dto: UpdateServiceDto, image: File | null) => Promise<void>
  deleteService: (id: string) => Promise<void>
  handlePageChange: (page: number) => void
}

export function useAdminServices(): UseAdminServicesReturn {
  const [services, setServices] = useState<Service[]>([])
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadServices = useCallback(async (params?: GetServicesParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await serviceApi.getAll({
        page: currentPage,
        ...params,
      })
      setServices(response.items)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки услуг')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  const createService = useCallback(async (dto: CreateServiceDto, image: File | null) => {
    try {
      await serviceApi.create(dto, image)
      await loadServices()
    } catch (err: any) {
      throw new Error(err.message || 'Ошибка создания услуги')
    }
  }, [loadServices])

  const updateService = useCallback(async (id: string, dto: UpdateServiceDto, image: File | null) => {
    try {
      await serviceApi.update(id, dto, image)
      await loadServices()
    } catch (err: any) {
      throw new Error(err.message || 'Ошибка обновления услуги')
    }
  }, [loadServices])

  const deleteService = useCallback(async (id: string) => {
    try {
      await serviceApi.delete(id)
      await loadServices()
    } catch (err: any) {
      throw new Error(err.message || 'Ошибка удаления услуги')
    }
  }, [loadServices])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    services,
    pagination,
    isLoading,
    error,
    loadServices,
    createService,
    updateService,
    deleteService,
    handlePageChange,
  }
}