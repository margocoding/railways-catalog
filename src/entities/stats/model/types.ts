export interface DashboardStats {
  ordersToday: number
  ordersYesterday: number
  revenueToday: number
  revenueYesterday: number
  requestsToday: number
  lowStockProducts: number
  totalProducts: number
  totalServices: number
  recentOrders: Array<{
    id: string
    orderNumber: string
    name: string
    totalAmount: number
    status: string
    createdAt: string
  }>
  recentRequests: Array<{
    id: string
    name: string
    phone: string
    serviceTitle?: string
    createdAt: string
  }>
  ordersChart: Array<{
    date: string
    count: number
    revenue: number
  }>
}