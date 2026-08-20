// Product entity exports
export type { Product, Category, Subcategory, ProductCondition, FilterOption } from './model/types'

// Mock data
export { categories, subcategories, products } from './model/mockData'

// API
export {
  getCategoriesApi,
  getSubcategoriesApi,
  getProductsApi,
  getProductsByCategoryApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from './api/product.api'

// UI components
export { ProductCard } from './ui/ProductCard'
export { ProductTableRow } from './ui/ProductTableRow'
