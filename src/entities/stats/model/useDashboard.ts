import { useState, useEffect, useCallback } from 'react'
import { statsApi } from '../api/stats.api'
import type { DashboardStats } from './types'

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await statsApi.getDashboardStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки статистики')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  return {
    stats,
    isLoading,
    error,
    reload: loadStats,
  }
}