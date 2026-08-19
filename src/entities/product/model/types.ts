export type ProductCondition = 'new' | 'used' | 'service'

interface ProductSpecs {
  id: string, value: number | string; unit?: string; label: string;
}

export interface Product {
  id: string
  sku: string
  title: string
  slug: string

  gost: string
  price: number
  priceOnRequest?: boolean

  stock: number
  condition: ProductCondition

  images: string[]

  categorySlug: string
  subcategorySlug: string

  description?: string
  specs?: ProductSpecs[];
  analogues?: string[]
}

export interface FilterOption {
  key: string
  label: string
  type?: 'select' | 'range'
    options?: Array<{
    value: string
    label: string
  }>
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string;
  filters?: FilterOption[]
}

export interface Subcategory {
  id: string
  name: string
  categoryId: string
  categorySlug: string
  slug: string
  filters?: FilterOption[]
}