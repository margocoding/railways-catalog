import { useState, useEffect, useCallback } from 'react'
import type { Category } from '../types'
import { categoryApi } from '../../api/category.api'

interface UseCategoriesReturn {
  categories: Category[]
  isLoading: boolean
  error: string | null
  loadCategories: () => Promise<void>
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await categoryApi.getAll({ limit: 100 })
      setCategories(response.items)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки категорий')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    isLoading,
    error,
    loadCategories,
  }
}