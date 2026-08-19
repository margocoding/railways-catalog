import { useCatalog } from '@/entities/catalog'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Card } from '@/shared/ui/Card'

export function AdminCategoriesPage() {
  const { categories, subcategories, selectedCategory, selectCategory } = useCatalog()

  const getCategorySubcategories = (categorySlug: string) => {
    return subcategories.filter((sub) => sub.categorySlug === categorySlug)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Категории товаров</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Управление категориями и субкатегориями каталога
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Список категорий */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            Категории ({categories.length})
          </h2>
          
          {categories.length === 0 ? (
            <EmptyState
              title="Категории не найдены"
              description="Загрузка категорий..."
            />
          ) : (
            <div className="space-y-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category.slug
                const subcatCount = getCategorySubcategories(category.slug).length
                
                return (
                  <Card
                    key={category.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      isActive
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => selectCategory(category.slug)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[hsl(var(--foreground))]">
                          {category.name}
                        </h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                          {category.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                          {subcatCount} субкатегорий
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Список субкатегорий выбранной категории */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            {selectedCategory
              ? `Субкатегории: ${categories.find(c => c.slug === selectedCategory)?.name}`
              : 'Выберите категорию'}
          </h2>
          
          {!selectedCategory ? (
            <EmptyState
              title="Категория не выбрана"
              description="Выберите категорию слева для просмотра субкатегорий"
            />
          ) : (
            <>
              {getCategorySubcategories(selectedCategory).length === 0 ? (
                <EmptyState
                  title="Субкатегории не найдены"
                  description="У выбранной категории нет субкатегорий"
                />
              ) : (
                <div className="space-y-2">
                  {getCategorySubcategories(selectedCategory).map((subcategory) => (
                    <Card
                      key={subcategory.id}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[hsl(var(--foreground))]">
                            {subcategory.name}
                          </h3>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Slug: {subcategory.slug}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
