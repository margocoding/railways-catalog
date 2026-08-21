import { useState } from 'react'
import { FiSearch, FiEye, FiX } from 'react-icons/fi'
import { useAdminOrders } from '@/features/admin-orders'
import { Dialog } from '@/shared/ui/Dialog'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { Skeleton } from '@/shared/ui/Skeleton'
import { EmptyState } from '@/shared/ui/EmptyState'
import type { OrderStatus } from '@/entities/order/model/types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from '@/entities/order/model/types'

export function AdminOrdersPage() {
  const {
    orders,
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
  } = useAdminOrders()

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)

  const handleViewOrder = async (orderId: string) => {
    await loadOrderById(orderId)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = async (status: OrderStatus) => {
    if (!selectedOrder) return
    setIsChangingStatus(true)
    await updateOrderStatus(selectedOrder.id, status)
    setIsChangingStatus(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2 text-[hsl(var(--foreground))]">Заказы</h1>
        <p className="text-[hsl(var(--muted-foreground))]">Управление заказами клиентов</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Поиск по номеру или клиенту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as OrderStatus | 'all')}
          className="w-full sm:w-48"
        >
          <option value="all">Все статусы</option>
          <option value="new">Новый</option>
          <option value="processing">В обработке</option>
          <option value="completed">Выполнен</option>
          <option value="cancelled">Отменён</option>
        </Select>
      </div>

      {/* Content */}
      {isLoading && orders.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          title="Ошибка загрузки"
          description={error}
          action={
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          }
        />
      ) : orders.length === 0 ? (
        <EmptyState
          title="Заказов пока нет"
          description="Когда пользователи оформят заказы, они появятся здесь"
        />
      ) : (
        /* Orders Table */
        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[hsl(var(--muted))]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Заказ</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Клиент</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Товары</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Сумма</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Статус</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Дата</th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[hsl(var(--muted))/50] transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-mono font-semibold text-[hsl(var(--primary))]">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium">{order.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{order.totalItems} шт.</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold">
                        {order.totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={ORDER_STATUS_VARIANTS[order.status]}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order.id)}
                        className="gap-2"
                      >
                        <FiEye className="h-4 w-4" />
                        Просмотр
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog
          open={isDetailOpen}
          onOpenChange={handleCloseDetail}
          title={`Заказ ${selectedOrder.orderNumber}`}
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Status & Date */}
            <div className="flex items-center justify-between">
              <Badge variant={ORDER_STATUS_VARIANTS[selectedOrder.status]}>
                {ORDER_STATUS_LABELS[selectedOrder.status]}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(selectedOrder.createdAt)}
              </span>
            </div>

            {/* Customer Info */}
            <div className="rounded-lg border border-[hsl(var(--border))] p-4 bg-[hsl(var(--muted))/30]">
              <h3 className="font-bold mb-3">Контактные данные</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Клиент:</span>
                  <span className="font-medium">{selectedOrder.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Телефон:</span>
                  <span>{selectedOrder.customer.phone}</span>
                </div>
                {selectedOrder.customer.email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                )}
                {selectedOrder.customer.address && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Адрес:</span>
                    <span className="text-right max-w-[200px]">{selectedOrder.customer.address}</span>
                  </div>
                )}
                {selectedOrder.customer.comment && (
                  <div className="pt-2 mt-2 border-t border-[hsl(var(--border))]">
                    <span className="text-muted-foreground block mb-1">Комментарий:</span>
                    <p className="text-sm">{selectedOrder.customer.comment}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold mb-3">Товары в заказе</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 rounded-lg border border-[hsl(var(--border))] bg-card"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          📦
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">Арт. {item.product.sku}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <span>{item.quantity} шт × {item.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                    <div className="text-right font-semibold">
                      {(item.quantity * item.price).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-[hsl(var(--border))] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Итого ({selectedOrder.totalItems} шт):</span>
                <span className="text-xl font-bold text-[hsl(var(--primary))]">
                  {selectedOrder.totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Status Change */}
            <div className="border-t border-[hsl(var(--border))] pt-4">
              <h3 className="font-bold mb-3">Изменить статус</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((status) => (
                  <Button
                    key={status}
                    variant={selectedOrder.status === status ? 'default' : 'outline'}
                    size="sm"
                    disabled={isChangingStatus || selectedOrder.status === status}
                    onClick={() => handleStatusChange(status)}
                  >
                    {ORDER_STATUS_LABELS[status]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Close button */}
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={handleCloseDetail} className="gap-2">
                <FiX className="h-4 w-4" />
                Закрыть
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}
