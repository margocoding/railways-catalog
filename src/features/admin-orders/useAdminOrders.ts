import { useCallback, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import type { Order, OrderStatus, GetOrdersParams } from '@/entities/order/model/types'
import type { PaginationMeta } from '@/shared/api'
import { orderApi } from '@/entities/order/api/order.api'

interface UseAdminOrdersReturn {
  orders: Order[]
  pagination: PaginationMeta
  isLoading: boolean
  error: string | null
  selectedOrder: Order | null
  searchQuery: string
  statusFilter: OrderStatus | 'all'
  setSearchQuery: (value: string) => void
  setStatusFilter: (value: OrderStatus | 'all') => void
  loadOrderById: (id: string) => Promise<Order | null>
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<boolean>
  setSelectedOrder: (order: Order | null) => void
  handlePageChange: (page: number) => void
  reloadOrders: () => Promise<void>
}

export function useAdminOrders(): UseAdminOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([])
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const loadOrders = useCallback(async (params?: GetOrdersParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await orderApi.getAll({
        page: currentPage,
        search: searchQuery || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
        ...params,
      })
      setOrders(response.items)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки заказов')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, statusFilter])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const loadOrderById = useCallback(async (id: string): Promise<Order | null> => {
    try {
      const order = await orderApi.getById(id)
      setSelectedOrder(order)
      return order
    } catch (err: any) {
      toast.error(err.message || 'Ошибка загрузки заказа')
      return null
    }
  }, [])

  const updateOrderStatus = useCallback(
    async (id: string, status: OrderStatus): Promise<boolean> => {
      try {
        const updatedOrder = await orderApi.update(id, { status })
        setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)))
        if (selectedOrder?.id === id) {
          setSelectedOrder(updatedOrder)
        }
        toast.success('Статус заказа обновлён')
        return true
      } catch (err: any) {
        toast.error(err.message || 'Ошибка обновления статуса')
        return false
      }
    },
    [selectedOrder],
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    orders,
    pagination,
    isLoading,
    error,
    selectedOrder,
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    loadOrderById,
    updateOrderStatus,
    setSelectedOrder,
    handlePageChange,
    reloadOrders: loadOrders,
  }
}