import type { Product } from '../../entities/product/model/types'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function getCategoryUrl(categorySlug: string) {
  const params = new URLSearchParams({
    category: categorySlug,
  })

  return `/catalog?${params.toString()}`
}


export function getSpecValue(
    product: Product,
    id: string,
) {
    const spec = product.specs?.find(
        (item) => item.id === id,
    )

    if (!spec) {
        return '—'
    }

    return `${spec.value}${spec.unit ? ` ${spec.unit}` : ''}`
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


export function getProductBreadcrumbs(product: Product, categoryName: string, subcategoryName?: string): BreadcrumbItem[] {
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
      label: categoryName,
      href: `/catalog?category=${product.categorySlug}`,
    },
  ]

  if (product.subcategorySlug && subcategoryName) {
    items.push({
      label: subcategoryName,
      href: `/catalog?category=${product.categorySlug}&subcategory=${product.subcategorySlug}`,
    })
  }

  items.push({
    label: product.title,
  })

  return items
}

export function getCategoryBreadcrumbs(
    categorySlug: string,
    categoryName: string,
    subcategorySlug?: string,
    subcategoryName?: string
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
      label: categoryName,
      href: `/catalog?category=${categorySlug}`,
    },
  ]

  if (subcategorySlug && subcategoryName) {
    items.push({
      label: subcategoryName,
      href: `/catalog?category=${categorySlug}&subcategory=${subcategorySlug}`,
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