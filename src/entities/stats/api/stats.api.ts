import { baseApi } from '@/shared/api'
import type { DashboardStats } from '../model/types'

export const statsApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const { data } = await baseApi.get<DashboardStats>('/stats/dashboard')
    return data
  },
}