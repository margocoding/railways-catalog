import { useState, useEffect } from 'react'
import { categoryApi, type Category } from '@/entities/category'

export function useCategoriesCarousel() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        setLoading(true)
        const response = await categoryApi.getAll({ limit: 50 })
        if (!cancelled) {
          setCategories(response.items)
        }
      } catch (err) {
        console.error('Failed to load carousel categories:', err)
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

  return { categories, loading }
}