import { Link } from 'react-router'
import { FiEye } from 'react-icons/fi'
import { Badge } from '@/shared/ui/Badge'
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from '@/entities/order/model/types'
import type { OrderStatus } from '@/entities/order/model/types'

interface RecentOrdersProps {
  orders: Array<{
    id: string
    orderNumber: string
    name: string
    totalAmount: number
    status: string
    createdAt: string
  }>
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Последние заказы</h3>
        <Link
          to="/admin/orders"
          className="text-sm text-primary hover:underline"
        >
          Все заказы →
        </Link>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/admin/orders`}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-semibold text-sm text-primary">
                  {order.orderNumber}
                </span>
                <Badge
                  variant={ORDER_STATUS_VARIANTS[order.status as OrderStatus]}
                >
                  {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                </Badge>
              </div>
              <p className="text-sm font-medium truncate">{order.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="font-semibold">
                {order.totalAmount.toLocaleString('ru-RU')} ₽
              </p>
              <FiEye className="h-4 w-4 text-muted-foreground ml-auto mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}