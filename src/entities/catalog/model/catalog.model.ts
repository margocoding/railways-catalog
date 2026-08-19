import type { Category, Subcategory } from '@/entities/product/model/types'

// Состояние для управления каталогом
export interface CatalogState {
  categories: Category[]
  subcategories: Subcategory[]
  selectedCategory: string | null
  selectedSubcategory: string | null
  isLoading: boolean
  error: string | null
}

export const initialCatalogState: CatalogState = {
  categories: [],
  subcategories: [],
  selectedCategory: null,
  selectedSubcategory: null,
  isLoading: false,
  error: null,
}

// Actions
export type CatalogAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_SUBCATEGORIES'; payload: Subcategory[] }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | { type: 'SELECT_SUBCATEGORY'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

// Reducer
export function catalogReducer(state: CatalogState, action: CatalogAction): CatalogState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_SUBCATEGORIES':
      return { ...state, subcategories: action.payload }
    case 'SELECT_CATEGORY':
      return { 
        ...state, 
        selectedCategory: action.payload,
        selectedSubcategory: null // Сбрасываем субкатегорию при смене категории
      }
    case 'SELECT_SUBCATEGORY':
      return { ...state, selectedSubcategory: action.payload }
    case 'CLEAR_SELECTION':
      return { ...state, selectedCategory: null, selectedSubcategory: null }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
