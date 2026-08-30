import { useState, useEffect } from 'react'
import { categoryApi, type Category } from '@/entities/category'

export function useCatalogSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        setLoading(true)
        setError(null)

        const response = await categoryApi.getAll({ limit: 100 })

        if (!cancelled) {
          setCategories(response.items)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load catalog')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  return {
    categories,
    loading,
    error,
  }
}