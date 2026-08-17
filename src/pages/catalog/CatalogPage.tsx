import { useMemo, useState } from 'react'
import { products } from '../../entities/product/model/mockData'
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

export function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    condition: 'all',
    stock: 'all',
    sort: 'name',
  })

  const filteredProducts = useMemo(() => {
    let result = [...products]

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
        // Mock popularity by stock
        result.sort((a, b) => b.stock - a.stock)
        break
    }

    return result
  }, [filters])

  const breadcrumbs = getCategoryBreadcrumbs('all')

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-2">Каталог продукции</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          Все позиции в наличии и под заказ
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <CatalogSidebar />

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
