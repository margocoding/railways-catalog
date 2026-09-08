import { useState, useEffect } from 'react'
import { productApi, type Product } from '@/entities/product'
export function usePopularProducts(category: string) {
  const [result, setResult] = useState<{
    category: string
    products: Product[]
    error: boolean
  } | null>(null)
  useEffect(() => {
    let cancelled = false
    productApi
      .getAll({ category, limit: 8, sort: 'popular' })
      .then((response) => {
        if (!cancelled)
          setResult({ category, products: response.items, error: false })
      })
      .catch(() => {
        if (!cancelled) setResult({ category, products: [], error: true })
      })
    return () => {
      cancelled = true
    }
  }, [category])
  const currentResult = result?.category === category ? result : null
  return {
    products: currentResult?.products ?? [],
    loading: !currentResult,
    error: currentResult?.error ?? false,
  }
}
