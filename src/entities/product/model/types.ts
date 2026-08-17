export type ProductCondition = 'new' | 'used' | 'service'

export interface Product {
  id: string
  sku: string
  title: string
  slug: string

  gost: string

  weight: number
  length: number

  price: number
  priceOnRequest?: boolean

  stock: number
  condition: ProductCondition

  images: string[]

  categorySlug: string
  subcategorySlug: string

  description?: string
  specs?: Record<string, string>
  analogues?: string[]
}

export interface Section {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
}

export interface Subcategory {
  id: string
  name: string
  categorySlug: string;
  categoryId: string
  slug: string
}