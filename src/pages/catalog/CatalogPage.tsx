import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

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
  const [searchParams, setSearchParams] = useSearchParams()

  const categorySlug = searchParams.get('category') ?? undefined
  const subcategorySlug = searchParams.get('subcategory') ?? undefined

  const search = searchParams.get('search') ?? ''

  const condition =
      (searchParams.get('condition') as ProductCondition | 'all') ?? 'all'


  const handleFilterChange = (nextFilters: FilterState) => {
    const params = new URLSearchParams(searchParams)

    if (nextFilters.search) {
      params.set('search', nextFilters.search)
    } else {
      params.delete('search')
    }

    if (nextFilters.condition !== 'all') {
      params.set('condition', nextFilters.condition)
    } else {
      params.delete('condition')
    }

    if (nextFilters.stock !== 'all') {
      params.set('stock', nextFilters.stock)
    } else {
      params.delete('stock')
    }

    if (nextFilters.sort !== 'name') {
      params.set('sort', nextFilters.sort)
    } else {
      params.delete('sort')
    }

    setSearchParams(params)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (categorySlug) {
      result = result.filter(
          (product) => product.categorySlug === categorySlug,
      )
    }

    if (subcategorySlug) {
      result = result.filter(
          (product) => product.subcategorySlug === subcategorySlug,
      )
    }

    if (search) {
      const query = search.toLowerCase().trim()

      result = result.filter((product) => {
        const title = product.title.toLowerCase()
        const sku = product.sku.toLowerCase()
        const gost = product.gost?.toLowerCase() ?? ''

        return (
            title.includes(query) ||
            sku.includes(query) ||
            gost.includes(query)
        )
      })
    }

    if (condition !== 'all') {
      result = result.filter(
          (product) => product.condition === condition,
      )
    }

    return result
  }, [
    categorySlug,
    subcategorySlug,
    search,
    condition,
  ])

  const breadcrumbs = getCategoryBreadcrumbs(
      categorySlug || 'Все',
      subcategorySlug,
  )

  return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mb-8">
            <h1 className="text-3xl font-black">
              Каталог продукции
            </h1>

            <p className="mt-2 text-[hsl(var(--muted-foreground))]">
              {categorySlug || subcategorySlug
                  ? `Найдено позиций: ${filteredProducts.length}`
                  : 'Все позиции в наличии и под заказ'}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CatalogSidebar
                activeCategory={categorySlug}
                activeSubcategory={subcategorySlug}
            />

            <div className="min-w-0 flex-1">
              <ProductFilter
                  onFilterChange={handleFilterChange}
              />

              <CatalogGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </Layout>
  )
}