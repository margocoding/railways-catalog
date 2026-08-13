import { useParams } from 'react-router-dom'
import { Layout } from '../../widgets/Layout'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { CatalogSidebar } from '../../widgets/sidebar-catalog/CatalogSidebar'
import { CatalogGrid } from '../../widgets/catalog-grid/CatalogGrid'
import { ProductFilter } from '../../features/product-filter/ProductFilter'
import { products, sections, categories } from '../../entities/product/model/mockData'
import type { Product, ProductCondition } from '../../entities/product/model/types'
import { getSectionBySlug, getCategoryBreadcrumbs, getSectionName } from '../../shared/lib/catalog-helpers'
import { useState, useMemo } from 'react'

interface FilterState {
  search: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  priceFrom: string
  priceTo: string
  sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
}

export function SectionPage() {
  const { section: sectionSlug } = useParams<{ section: string }>()
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    condition: 'all',
    stock: 'all',
    priceFrom: '',
    priceTo: '',
    sort: 'name',
  })

  const section = getSectionBySlug(sectionSlug || '')
  
  const sectionProducts = useMemo(() => {
    if (!section) return []
    return products.filter(p => p.sectionId === section.id)
  }, [section])

  const filteredProducts = useMemo(() => {
    let result = [...sectionProducts]

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.gost.toLowerCase().includes(q)
      )
    }

    // Condition
    if (filters.condition !== 'all') {
      result = result.filter(p => p.condition === filters.condition)
    }

    // Stock
    if (filters.stock === 'in-stock') {
      result = result.filter(p => p.stock > 100)
    } else if (filters.stock === 'on-order') {
      result = result.filter(p => p.stock <= 100 && p.stock > 0)
    }

    // Price range
    if (filters.priceFrom) {
      result = result.filter(p => p.price >= Number(filters.priceFrom))
    }
    if (filters.priceTo) {
      result = result.filter(p => p.price <= Number(filters.priceTo))
    }

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
        result.sort((a, b) => b.stock - a.stock)
        break
    }

    return result
  }, [sectionProducts, filters])

  const breadcrumbs = getCategoryBreadcrumbs(sectionSlug || '')

  if (!section) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Раздел не найден</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-2">{section.name}</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          {section.id === 'rails' && 'Железнодорожные, крановые и узкоколейные рельсы всех типов'}
          {section.id === 'sleepers' && 'Деревянные, железобетонные шпалы и подрельсовые плиты'}
          {section.id === 'fasteners' && 'Рельсовый крепёж: болты, гайки, накладки, скрепления'}
          {section.id === 'shoes' && 'Тормозные и подкладочные башмаки для железнодорожных вагонов'}
          {section.id === 'buffers' && 'Тупиковые упоры для защиты концов путей'}
          {section.id === 'metal' && 'Металлоизделия по чертежам заказчика'}
          {section.id === 'tools' && 'Путевой инструмент: ручной и механизированный'}
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <CatalogSidebar activeSection={sectionSlug} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ProductFilter onFilterChange={setFilters} />
            <CatalogGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
