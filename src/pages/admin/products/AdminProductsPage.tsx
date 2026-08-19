import { useState } from 'react'
import { useCatalog } from '@/entities/catalog'
import { getProductsByCategoryApi } from '@/entities/product/api/product.api'
import type { Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/ProductCard'
import { Skeleton } from '@/shared/ui/Skeleton'
import { EmptyState } from '@/shared/ui/EmptyState'

export function AdminProductsPage() {
  const { categories, subcategories, selectedCategory, selectedSubcategory, selectCategory, selectSubcategory } = useCatalog()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCategorySelect = async (categorySlug: string) => {
    selectCategory(categorySlug)
    setIsLoading(true)
    try {
      const fetchedProducts = await getProductsByCategoryApi(categorySlug)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubcategorySelect = async (subcategorySlug: string) => {
    if (!selectedCategory) return
    
    selectSubcategory(subcategorySlug)
    setIsLoading(true)
    try {
      const fetchedProducts = await getProductsByCategoryApi(selectedCategory, subcategorySlug)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categorySubcategories = subcategories.filter(
    (sub) => sub.categorySlug === selectedCategory
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Каталог продуктов</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Управление продуктами по категориям и субкатегориям
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        {/* Выбор категории */}
        <div className="w-64">
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Категория
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Все категории</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Выбор субкатегории */}
        {selectedCategory && (
          <div className="w-64">
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Субкатегория
            </label>
            <select
              value={selectedSubcategory || ''}
              onChange={(e) => handleSubcategorySelect(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Все субкатегории</option>
              {categorySubcategories.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Список продуктов */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Продукты не найдены"
          description="Выберите категорию или субкатегорию для просмотра продуктов"
        />
      )}
    </div>
  )
}
