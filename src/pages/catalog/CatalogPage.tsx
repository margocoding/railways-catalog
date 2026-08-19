import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import {
  products,
  categories,
  subcategories,
} from '../../entities/product/model/mockData'
import type {
  FilterOption,
  ProductCondition,
} from '../../entities/product/model/types'
import { ProductFilter } from '../../features/product-filter/ProductFilter'
import type { FilterState } from '../../features/product-filter/ProductFilter'
import { getCategoryBreadcrumbs } from '../../shared/lib/catalog-helpers'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { CatalogGrid } from '../../widgets/catalog-grid/CatalogGrid'
import { Layout } from '../../widgets/Layout'
import { CatalogSidebar } from '../../widgets/sidebar-catalog/CatalogSidebar'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categorySlug = searchParams.get('category') ?? undefined
  const subcategorySlug =
    searchParams.get('subcategory') ?? undefined

  const search = searchParams.get('search') ?? ''

  const condition =
    (searchParams.get('condition') as ProductCondition | 'all') ??
    'all'

  const sort =
    (searchParams.get('sort') as FilterState['sort']) ?? 'name'

  const stock =
    (searchParams.get('stock') as FilterState['stock']) ?? 'all'

  const categoryProducts = useMemo(() => {
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

    return result
  }, [categorySlug, subcategorySlug])

  const filters = useMemo<FilterOption[]>(() => {
    const specsById = new Map<
      string,
      {
        label: string
        values: Map<string, string>
      }
    >()

    for (const product of categoryProducts) {
      if (!product.specs) {
        continue
      }

      for (const spec of product.specs) {
        if (spec.value === undefined || spec.value === null) {
          continue
        }

        const value = String(spec.value)
        const displayValue = spec.unit
          ? `${value} ${spec.unit}`
          : value

        if (!specsById.has(spec.id)) {
          specsById.set(spec.id, {
            label: spec.label,
            values: new Map(),
          })
        }

        specsById.get(spec.id)!.values.set(value, displayValue)
      }
    }

    return Array.from(specsById.entries()).map(
      ([id, spec]) => ({
        key: id,
        label: spec.label,
        type: 'select',
        options: Array.from(spec.values.entries())
          .sort((a, b) =>
            a[1].localeCompare(b[1], 'ru', {
              numeric: true,
            }),
          )
          .map(([value, label]) => ({
            value,
            label,
          })),
      }),
    )
  }, [categoryProducts])

  const attributeFilters = useMemo(
    () =>
      Object.fromEntries(
        filters.map((filter) => [
          filter.key,
          searchParams.get(`filter_${filter.key}`) ?? 'all',
        ]),
      ),
    [filters, searchParams],
  )

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

    for (const filter of filters) {
      const value =
        nextFilters.attributes[filter.key] ?? 'all'

      if (value !== 'all') {
        params.set(`filter_${filter.key}`, value)
      } else {
        params.delete(`filter_${filter.key}`)
      }
    }

    setSearchParams(params)
  }

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts]

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

    if (stock === 'in-stock') {
      result = result.filter((product) => product.stock > 0)
    }

    if (stock === 'on-order') {
      result = result.filter((product) => product.stock <= 0)
    }

    result = result.filter((product) => {
      if (!product.specs) {
        return Object.values(attributeFilters).every(
          (value) => value === 'all',
        )
      }

      return Object.entries(attributeFilters).every(
        ([key, value]) => {
          if (value === 'all') {
            return true
          }

          return product.specs?.some(
            (spec) =>
              spec.id === key &&
              String(spec.value) === value,
          )
        },
      )
    })

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break

      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break

      case 'popular':
        result.sort((a, b) => b.stock - a.stock)
        break

      case 'name':
      default:
        result.sort((a, b) =>
          a.title.localeCompare(b.title, 'ru'),
        )
        break
    }

    return result
  }, [
    categoryProducts,
    search,
    condition,
    stock,
    sort,
    attributeFilters,
  ])

  const currentCategory = categories.find(
    (category) => category.slug === categorySlug,
  )

  const currentSubcategory = subcategories.find(
    (subcategory) =>
      subcategory.slug === subcategorySlug &&
      subcategory.categorySlug === categorySlug,
  )

  const breadcrumbs = getCategoryBreadcrumbs(
    categorySlug || 'Все',
    subcategorySlug,
  )

  const filterValue: FilterState = {
    search,
    condition,
    stock,
    sort,
    attributes: attributeFilters,
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            {currentSubcategory?.name ??
              currentCategory?.name ??
              'Каталог продукции'}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {`Найдено позиций: ${filteredProducts.length}`}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <CatalogSidebar
            activeCategory={categorySlug}
            activeSubcategory={subcategorySlug}
          />

          <div className="min-w-0 flex-1">
            <ProductFilter
              filters={filters}
              value={filterValue}
              onFilterChange={handleFilterChange}
            />

            <CatalogGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  )
}