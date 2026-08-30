import { useState, useEffect } from 'react'
import { categoryApi, type Category } from '@/entities/category'

export function useCatalogMegaMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const response = await categoryApi.getAll({ limit: 50 })

        if (!cancelled) {
          setCategories(response.items)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Ошибка загрузки')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
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