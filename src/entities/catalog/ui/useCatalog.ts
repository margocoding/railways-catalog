import {
  getCategoriesApi,
  getSubcategoriesApi,
} from '@/entities/product/api/product.api'
import type { Category, Subcategory } from '@/entities/product/model/types'
import { useCallback, useEffect, useState } from 'react'

export function useCatalog() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  // Выбор категории
  const selectCategory = useCallback((categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setSelectedSubcategory(null)
  }, [])

  // Выбор субкатегории
  const selectSubcategory = useCallback((subcategorySlug: string) => {
    setSelectedSubcategory(subcategorySlug)
  }, [])

  // Очистка выбора
  const clearSelection = useCallback(() => {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
  }, [])

  // Получение субкатегорий для выбранной категории
  const getSubcategoriesForCategory = useCallback(
    (categorySlug: string): Subcategory[] => {
      return subcategories.filter(
        (sub) => sub.categorySlug === categorySlug
      )
    },
    [subcategories]
  )

  // Инициализация при монтировании
  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [loadCategories, loadSubcategories])

  return {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    isLoading,
    error,
    selectCategory,
    selectSubcategory,
    clearSelection,
    getSubcategoriesForCategory,
    loadCategories,
    loadSubcategories,
  }
}
