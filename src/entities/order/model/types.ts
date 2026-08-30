export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Ожидает',
  CONFIRMED: 'Подтверждён',
  SHIPPED: 'Отгружен',
  COMPLETED: 'Завершён',
  CANCELLED: 'Отменён',
}

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, 'default' | 'secondary' | 'outline'> = {
  PENDING: 'default',
  CONFIRMED: 'secondary',
  SHIPPED: 'secondary',
  COMPLETED: 'default',
  CANCELLED: 'outline',
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  productTitle: string
  productSku: string
  productSlug: string
  productImage?: string
  productId: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  name: string
  phone: string
  email?: string
  address?: string
  comment?: string
  policyAccepted: boolean
  status: OrderStatus
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface CreateOrderItemDto {
  productId: string
  quantity: number
}

export interface CreateOrderDto {
  name: string
  phone: string
  email?: string
  address?: string
  comment?: string
  policyAccepted: boolean
  items: CreateOrderItemDto[]
}

export interface UpdateOrderDto {
  status?: OrderStatus
  name?: string
  phone?: string
  email?: string
  address?: string
  comment?: string
}

export interface GetOrdersParams {
  page?: number
  limit?: number
  search?: string
  status?: OrderStatus
}