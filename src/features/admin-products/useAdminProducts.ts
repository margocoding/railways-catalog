import { useCallback, useState, useEffect } from 'react'
import type { Product, Category, Subcategory } from '@/entities/product/model/types'
import {
  getProductsApi,
  getCategoriesApi,
  getSubcategoriesApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from '@/entities/product/api/product.api'

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузка продуктов
  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getProductsApi()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Загрузка категорий
  const loadCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getCategoriesApi()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Загрузка субкатегорий
  const loadSubcategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getSubcategoriesApi()
      setSubcategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subcategories')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Создание продукта
  const createProduct = useCallback(async (productData: Omit<Product, 'id'>): Promise<Product | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const newProduct = await createProductApi(productData)
      setProducts(prev => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Обновление продукта
  const updateProduct = useCallback(async (id: string, updates: Partial<Product>): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedProduct = await updateProductApi(id, updates)
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Удаление продукта
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      await deleteProductApi(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Инициализация при монтировании
  useEffect(() => {
    loadProducts()
    loadCategories()
    loadSubcategories()
  }, [loadProducts, loadCategories, loadSubcategories])

  return {
    products,
    categories,
    subcategories,
    isLoading,
    error,
    loadProducts,
    loadCategories,
    loadSubcategories,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
