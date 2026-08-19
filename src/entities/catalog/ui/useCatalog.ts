import { useReducer, useEffect, useCallback } from 'react'
import {
  getCategoriesApi,
  getSubcategoriesApi,
} from '@/entities/product/api/product.api'
import type { Category, Subcategory } from '@/entities/product/model/types'
import {
  catalogReducer,
  initialCatalogState,
  type CatalogAction,
} from '../model/catalog.model'

export function useCatalog() {
  const [state, dispatch] = useReducer(catalogReducer, initialCatalogState)

  // Загрузка категорий
  const loadCategories = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const categories = await getCategoriesApi()
      dispatch({ type: 'SET_CATEGORIES', payload: categories })
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load categories' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Загрузка субкатегорий
  const loadSubcategories = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const subcategories = await getSubcategoriesApi()
      dispatch({ type: 'SET_SUBCATEGORIES', payload: subcategories })
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load subcategories' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Выбор категории
  const selectCategory = useCallback((categorySlug: string) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: categorySlug })
  }, [])

  // Выбор субкатегории
  const selectSubcategory = useCallback((subcategorySlug: string) => {
    dispatch({ type: 'SELECT_SUBCATEGORY', payload: subcategorySlug })
  }, [])

  // Очистка выбора
  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' })
  }, [])

  // Получение субкатегорий для выбранной категории
  const getSubcategoriesForCategory = useCallback(
    (categorySlug: string): Subcategory[] => {
      return state.subcategories.filter(
        (sub) => sub.categorySlug === categorySlug
      )
    },
    [state.subcategories]
  )

  // Инициализация при монтировании
  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [loadCategories, loadSubcategories])

  return {
    ...state,
    selectCategory,
    selectSubcategory,
    clearSelection,
    getSubcategoriesForCategory,
    loadCategories,
    loadSubcategories,
  }
}
