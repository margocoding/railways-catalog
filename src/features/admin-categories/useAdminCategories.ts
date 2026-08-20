import { useCallback, useState, useEffect } from 'react'
import type { Category, Subcategory } from '@/entities/product/model/types'
import {
  getCategoriesApi,
  getSubcategoriesApi,
} from '@/entities/product/api/product.api'

// Типы для API операций (мок, в реальности будут реальные API вызовы)
async function createCategoryApi(category: Omit<Category, 'id'>): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const newCategory: Category = {
    ...category,
    id: `cat-${Date.now()}`,
  }
  return newCategory
}

async function updateCategoryApi(id: string, updates: Partial<Category>): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 300))
  // В мок-реализации просто возвращаем обновлённые данные
  return { id, name: updates.name || '', slug: updates.slug || '', description: updates.description || '', image: updates.image || '' }
}

async function deleteCategoryApi(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300))
  // В мок-реализации ничего не делаем, но используем id для симуляции
  console.log('Deleting category:', id)
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
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

  // Создание категории
  const createCategory = useCallback(async (categoryData: Omit<Category, 'id'>): Promise<Category | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const newCategory = await createCategoryApi(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Обновление категории
  const updateCategory = useCallback(async (id: string, updates: Partial<Category>): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      await updateCategoryApi(id, updates)
      setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...updates } : cat))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Удаление категории
  const deleteCategory = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      await deleteCategoryApi(id)
      setCategories(prev => prev.filter(cat => cat.id !== id))
      // Также удаляем субкатегории этой категории
      setSubcategories(prev => prev.filter(sub => sub.categoryId !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Инициализация при монтировании
  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [loadCategories, loadSubcategories])

  return {
    categories,
    subcategories,
    isLoading,
    error,
    loadCategories,
    loadSubcategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
