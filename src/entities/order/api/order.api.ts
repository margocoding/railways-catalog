import { baseApi, type PaginatedResponse } from '@/shared/api'
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  GetOrdersParams,
} from '../model/types'

export const orderApi = {
  async getAll(params?: GetOrdersParams): Promise<PaginatedResponse<Order>> {
    const { data } = await baseApi.get<PaginatedResponse<Order>>('/order', {
      params,
    })
    return data
  },

  async getById(id: string): Promise<Order> {
    const { data } = await baseApi.get<Order>(`/order/${id}`)
    return data
  },

  async create(dto: CreateOrderDto): Promise<Order> {
    const { data } = await baseApi.post<Order>('/order', dto)
    return data
  },

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    const { data } = await baseApi.put<Order>(`/order/${id}`, dto)
    return data
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/order/${id}`)
  },
}