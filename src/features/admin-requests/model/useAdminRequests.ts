import { useState, useEffect, useCallback } from 'react'
import type { Request, GetRequestsParams } from '@/entities/request/model/types'
import type { PaginationMeta } from '@/shared/api'
import { requestApi } from '@/entities/request/api/request.api'

interface UseAdminRequestsReturn {
  requests: Request[]
  pagination: PaginationMeta
  isLoading: boolean
  error: string | null
  loadRequests: (params?: GetRequestsParams) => Promise<void>
  deleteRequest: (id: string) => Promise<void>
  handlePageChange: (page: number) => void
}

export function useAdminRequests(): UseAdminRequestsReturn {
  const [requests, setRequests] = useState<Request[]>([])
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

  const loadRequests = useCallback(async (params?: GetRequestsParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await requestApi.getAll({
        page: currentPage,
        ...params,
      })
      setRequests(response.items)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки заявок')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  const deleteRequest = useCallback(async (id: string) => {
    try {
      await requestApi.delete(id)
      await loadRequests()
    } catch (err: any) {
      throw new Error(err.message || 'Ошибка удаления заявки')
    }
  }, [loadRequests])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    requests,
    pagination,
    isLoading,
    error,
    loadRequests,
    deleteRequest,
    handlePageChange,
  }
}