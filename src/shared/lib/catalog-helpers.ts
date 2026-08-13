import type { Product } from '../../entities/product/model/types'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function getProductBreadcrumbs(product: Product): BreadcrumbItem[] {
  return [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: product.sectionId === 'rails' ? 'Рельсы' : 
             product.sectionId === 'sleepers' ? 'Шпалы и плиты' :
             product.sectionId === 'fasteners' ? 'Крепёж' :
             product.sectionId === 'shoes' ? 'Башмаки' :
             product.sectionId === 'buffers' ? 'Упоры тупиковые' :
             product.sectionId === 'metal' ? 'Металлоизделия' :
             'Путевой инструмент', 
      href: `/catalog/${product.sectionId}` },
    { label: product.title, href: undefined },
  ]
}

export function getCategoryBreadcrumbs(sectionSlug: string, categoryName?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: getSectionName(sectionSlug), href: `/catalog/${sectionSlug}` },
  ]
  
  if (categoryName) {
    items.push({ label: categoryName, href: undefined })
  }
  
  return items
}

export function getSectionName(slug: string): string {
  const names: Record<string, string> = {
    rails: 'Рельсы',
    sleepers: 'Шпалы и плиты',
    fasteners: 'Крепёж',
    shoes: 'Башмаки',
    buffers: 'Упоры тупиковые',
    metal: 'Металлоизделия',
    tools: 'Путевой инструмент',
  }
  return names[slug] || slug
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
  return labels[condition] || condition
}

export function getConditionBadgeColor(condition: string): string {
  const colors: Record<string, string> = {
    new: 'bg-green-500/20 text-green-400 border-green-500/30',
    used: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    service: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
  return colors[condition] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}
