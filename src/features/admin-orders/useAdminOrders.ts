import { useCallback, useState, useEffect } from 'react'
import type { Order, OrderStatus } from '@/entities/order/model/types'
import { getOrdersApi, getOrderByIdApi, updateOrderStatusApi } from '@/entities/order/api/order.api'

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Фильтры и поиск
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

  // Загрузка заказов
  const loadOrders = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getOrdersApi()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Загрузка конкретного заказа
  const loadOrderById = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const order = await getOrderByIdApi(id)
      setSelectedOrder(order)
      return order
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Обновление статуса заказа
  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedOrder = await updateOrderStatusApi(id, status)
      setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o))
      if (selectedOrder?.id === id) {
        setSelectedOrder(updatedOrder)
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [selectedOrder])

  // Отфильтрованные заказы
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      searchQuery === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Сортировка по дате (новые сверху)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Инициализация при монтировании
  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  return {
    orders: sortedOrders,
    isLoading,
    error,
    selectedOrder,
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    loadOrders,
    loadOrderById,
    updateOrderStatus,
    setSelectedOrder,
  }
}
