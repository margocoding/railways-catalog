import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { getSectionBySlug, products, getCategoryBySlug } from '../../entities/product/model/mockData'
import type { ProductCondition } from '../../entities/product/model/types'
import { ProductFilter } from '../../features/product-filter/ProductFilter'
import { getCategoryBreadcrumbs } from '../../shared/lib/catalog-helpers'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { CatalogGrid } from '../../widgets/catalog-grid/CatalogGrid'
import { Layout } from '../../widgets/Layout'
import { CatalogSidebar } from '../../widgets/sidebar-catalog/CatalogSidebar'

interface FilterState {
  search: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
}

export function SectionPage() {
  const { section: sectionSlug, category: categorySlug } = useParams<{ section: string; category?: string }>()
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    condition: 'all',
    stock: 'all',
    sort: 'name',
  })

  const section = getSectionBySlug(sectionSlug || '')
  
  // Filter products by section and optionally by category
  const sectionProducts = useMemo(() => {
    if (!section) return []
    let filtered = products.filter(p => p.sectionId === section.id)
    
    // If category is specified, filter by category
    if (categorySlug) {
      const category = getCategoryBySlug(categorySlug)
      if (category) {
        filtered = filtered.filter(p => p.categoryId === category.id)
      }
    }
    
    return filtered
  }, [section, categorySlug])

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

  const breadcrumbs = getCategoryBreadcrumbs(sectionSlug || '', categorySlug)

  if (!section) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Раздел не найден</h1>
        </div>
      </Layout>
    )
  }

  // Get category name for display if category is specified
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-2">
          {category ? category.name : section.name}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          {category ? 'Категория товаров' : section.description}
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <CatalogSidebar activeSection={sectionSlug} activeCategory={categorySlug} />

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
