import type { Product } from '../../product/model/types'

export type OrderStatus = 'new' | 'processing' | 'completed' | 'cancelled'

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  customer: {
    name: string
    phone: string
    email?: string
    address?: string
    comment?: string
  }
  items: OrderItem[]
  totalItems: number
  totalPrice: number
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
  processing: 'В обработке',
  completed: 'Выполнен',
  cancelled: 'Отменён',
}

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  processing: 'secondary',
  completed: 'outline',
  cancelled: 'outline',
}
