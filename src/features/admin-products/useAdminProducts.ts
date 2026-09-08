import { categoryApi, type Category } from '@/entities/category'
import { productApi, type CreateProductDto, type Product, type UpdateProductDto } from '@/entities/product'
import type { PaginationMeta } from '@/shared/api'
import { useCallback, useEffect, useState } from 'react'

const ITEMS_PER_PAGE = 20

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async (page: number = 1) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await productApi.getAll({ page, limit: ITEMS_PER_PAGE })
      setProducts(response.items)
      setPagination(response.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadCategories = useCallback(async () => {
    try {
      const response = await categoryApi.getAll({ limit: 100 })
      setCategories(response.items)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }, [])

  const createProduct = useCallback(async (dto: CreateProductDto, images: File[] = []): Promise<Product | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const newProduct = await productApi.create(dto, images)
      setProducts((prev) => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProduct = useCallback(async (
    id: string,
    dto: UpdateProductDto,
    newImages: File[] = [],
  ): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedProduct = await productApi.update(id, dto, newImages)
      setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      await productApi.delete(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [loadProducts, loadCategories])

  const handlePageChange = useCallback((page: number) => {
    loadProducts(page)
  }, [loadProducts])

  return {
    products,
    categories,
    pagination,
    isLoading,
    error,
    loadProducts,
    loadCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    handlePageChange,
  }
}
