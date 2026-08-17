import type { Product } from '../../entities/product/model/types'
import {categories, subcategories} from "@/entities/product/model/mockData.ts";

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function getCategoryName(slug: string): string {
  return categories.find(category => category.slug === slug)?.name ?? slug
}

export function getSubcategoryName(slug: string): string {
  return subcategories.find(subcategory => subcategory.slug === slug)?.name ?? slug
}

export function getCategoryUrl(categorySlug: string) {
  const params = new URLSearchParams({
    category: categorySlug,
  })

  return `/catalog?${params.toString()}`
}

export function getSubcategoryUrl(
    categorySlug: string,
    subcategorySlug: string,
) {
  const params = new URLSearchParams({
    category: categorySlug,
    subcategory: subcategorySlug,
  })

  return `/catalog?${params.toString()}`
}


export function getProductBreadcrumbs(product: Product): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Каталог',
      href: '/catalog',
    },
    {
      label: getCategoryName(product.categorySlug),
      href: `/catalog/${product.categorySlug}`,
    },
  ]

  if (product.subcategorySlug) {
    items.push({
      label: getSubcategoryName(product.subcategorySlug),
      href: `/catalog/${product.categorySlug}/${product.subcategorySlug}`,
    })
  }

  items.push({
    label: product.title,
  })

  return items
}

export function getCategoryBreadcrumbs(
    categorySlug: string,
    subcategorySlug?: string,
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Каталог',
      href: '/catalog',
    },
    {
      label: getCategoryName(categorySlug),
      href: `/catalog/${categorySlug}`,
    },
  ]

  if (subcategorySlug) {
    items.push({
      label: getSubcategoryName(subcategorySlug),
      href: `/catalog/${categorySlug}/${subcategorySlug}`,
    })
  }

  return items
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    new: 'Новый',
    used: 'Б/У',
    service: 'Услуга',
  }

  return labels[condition] ?? condition
}

export function getConditionBadgeColor(condition: string): string {
  const colors: Record<string, string> = {
    new: 'bg-green-500/20 text-green-400 border-green-500/30',
    used: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    service: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  return (
      colors[condition] ??
      'bg-gray-500/20 text-gray-400 border-gray-500/30'
  )
}
export function getCategoryIcon(categoryId: string): string {
  const icons: Record<string, string> = {
    rails: '🛤️',
    sleepers: '🟫',
    fasteners: '🔩',
    shoes: '👞',
    buffers: '🛑',
    metal: '📐',
    tools: '🔨',
  }

  return icons[categoryId] || '📦'
}