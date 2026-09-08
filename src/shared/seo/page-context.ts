import { createContext, useContext } from 'react'
import type { PageData } from './route-data'

export const PageDataContext = createContext<PageData | null>(null)
export const CategoriesContext = createContext<{ categories: NonNullable<PageData['categories']>; isLoading: boolean; error: string | null; loadCategories: () => Promise<void> } | null>(null)
export function usePageData() {
  const value = useContext(PageDataContext)
  if (!value) throw new Error('PageDataProvider is missing')
  return value
}
export function useCategoryData() {
  const value = useContext(CategoriesContext)
  if (!value) throw new Error('PageDataProvider is missing')
  return value
}
