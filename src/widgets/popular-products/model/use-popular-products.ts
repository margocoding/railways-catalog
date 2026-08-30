import { useState, useEffect } from 'react'
import { productApi, type Product } from '@/entities/product'

export function usePopularProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        setLoading(true)
        const response = await productApi.getAll({ limit: 10 })
        if (!cancelled) {
          setProducts(response.items)
        }
      } catch (err) {
        console.error('Failed to load popular products:', err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading }
}