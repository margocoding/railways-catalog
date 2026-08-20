import type { Product, Category, Subcategory } from '@/entities/product/model/types'
import { categories, subcategories, products } from '@/entities/product/model/mockData'

// Мок API для получения всех категорий
export async function getCategoriesApi(): Promise<Category[]> {
  return Promise.resolve(categories)
}

// Мок API для получения всех субкатегорий
export async function getSubcategoriesApi(): Promise<Subcategory[]> {
  return Promise.resolve(subcategories)
}

// Мок API для получения всех продуктов
export async function getProductsApi(): Promise<Product[]> {
  return Promise.resolve(products)
}

// Мок API для получения продуктов по категории и субкатегории
export async function getProductsByCategoryApi(
  categorySlug: string,
  subcategorySlug?: string
): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 300)) // Имитация задержки сети
  
  let filtered = products.filter(p => p.categorySlug === categorySlug)
  
  if (subcategorySlug) {
    filtered = filtered.filter(p => p.subcategorySlug === subcategorySlug)
  }
  
  return Promise.resolve(filtered)
}

// Мок API для создания продукта
export async function createProductApi(product: Omit<Product, 'id'>): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newProduct: Product = {
    ...product,
    id: `new-${Date.now()}`,
  }
  
  return Promise.resolve(newProduct)
}

// Мок API для обновления продукта
export async function updateProductApi(id: string, updates: Partial<Product>): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const product = products.find(p => p.id === id)
  if (!product) {
    throw new Error('Product not found')
  }
  
  return Promise.resolve({ ...product, ...updates })
}

// Мок API для удаления продукта
export async function deleteProductApi(_id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300))
  // В реальном проекте здесь был бы DELETE запрос
  return Promise.resolve()
}
