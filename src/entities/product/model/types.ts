export type ProductCondition = 'new' | 'used' | 'service'

export interface Product {
  id: string
  sku: string
  title: string
  gost: string
  weight: number // kg per meter
  length: number // meters
  price: number
  priceOnRequest?: boolean
  stock: number
  condition: ProductCondition
  images: string[]
  categoryId: string
  sectionId: string
  description?: string
  specs?: Record<string, string>
  analogues?: string[]
}

export interface Category {
  id: string
  name: string
  sectionId: string
  parentId?: string
  slug: string
}

export interface Section {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Lead {
  id: string
  productId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  message?: string
  quantity?: number
  status: 'new' | 'contacted' | 'completed'
  createdAt: string
}
