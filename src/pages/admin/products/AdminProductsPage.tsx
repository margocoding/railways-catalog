import { useState, useMemo } from 'react'
import type { Product } from '@/entities/product/model/types'
import { ProductTableRow } from '@/entities/product/ui/ProductTableRow'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { EmptyState } from '@/shared/ui/EmptyState'
import { useAdminCategories, CategoriesSection } from '@/features/admin-categories'
import { useAdminProducts, CreateProductModal, EditProductModal, DeleteProductDialog } from '@/features/admin-products'

export function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Хук для управления категориями
  const {
    categories: adminCategories,
    subcategories: adminSubcategories,
    isLoading: categoriesLoading,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useAdminCategories()
  
  // Хук для управления продуктами
  const {
    products: adminProducts,
    categories,
    subcategories,
    isLoading: productsLoading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useAdminProducts()
  
  // Используем данные из хука или моковые данные как фоллбэк
  const categoriesList = adminCategories.length > 0 ? adminCategories : categories
  const subcategoriesList = adminSubcategories.length > 0 ? adminSubcategories : subcategories
  const productsList = adminProducts.length > 0 ? adminProducts : []

  // Фильтрация субкатегорий на основе выбранной категории
  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory) return []
    return subcategoriesList.filter(sub => sub.categorySlug === selectedCategory)
  }, [selectedCategory, subcategoriesList])

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    let result = productsList

    // Фильтр по категории
    if (selectedCategory) {
      result = result.filter(p => p.categorySlug === selectedCategory)
    }

    // Фильтр по субкатегории
    if (selectedSubcategory) {
      result = result.filter(p => p.subcategorySlug === selectedSubcategory)
    }

    // Поиск по названию или SKU
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      )
    }

    return result
  }, [selectedCategory, selectedSubcategory, searchQuery, productsList])

  // Опции для селекта категорий
  const categoryOptions = useMemo(() => {
    return categoriesList.map(cat => ({
      value: cat.slug,
      label: cat.name,
    }))
  }, [categoriesList])

  // Опции для селекта субкатегорий
  const subcategoryOptions = useMemo(() => {
    return filteredSubcategories.map(sub => ({
      value: sub.slug,
      label: sub.name,
    }))
  }, [filteredSubcategories])

  // Состояния для модалок продуктов
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const handleDelete = (id: string) => {
    const product = productsList.find(p => p.id === id)
    if (product) {
      setDeletingProduct(product)
    }
  }

  const handleCreateNew = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateProduct = async (productData: Omit<Product, 'id'>) => {
    await createProduct(productData)
  }

  const handleUpdateProduct = async (id: string, updates: Partial<Product>) => {
    return await updateProduct(id, updates)
  }

  const handleDeleteProduct = async (id: string) => {
    return await deleteProduct(id)
  }

  const isLoading = categoriesLoading || productsLoading

  return (
    <div className="p-4 md:p-6">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Каталог продуктов</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Управление продуктами, категориями и субкатегориями
        </p>
      </div>

      {/* Секция управления категориями */}
      <CategoriesSection
        categories={categoriesList}
        subcategories={subcategoriesList}
        isLoading={categoriesLoading}
        onCreateCategory={createCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />

      {/* Панель фильтров */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end">
        {/* Выбор категории */}
        <div className="w-full md:w-56">
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Категория
          </label>
          <Select
            options={[{ value: '', label: 'Все категории' }, ...categoryOptions]}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedSubcategory('')
            }}
          />
        </div>

        {/* Выбор субкатегории */}
        <div className="w-full md:w-56">
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Субкатегория
          </label>
          <Select
            options={[{ value: '', label: 'Все субкатегории' }, ...subcategoryOptions]}
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
          />
        </div>

        {/* Поиск */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Поиск
          </label>
          <Input
            placeholder="Поиск по названию или SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Кнопка создания */}
        <Button onClick={handleCreateNew} className="shrink-0">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Добавить продукт</span>
          <span className="sm:hidden">Добавить</span>
        </Button>
      </div>

      {/* Таблица продуктов */}
      {isLoading && productsList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[hsl(var(--muted-foreground))]">Загрузка продуктов...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground w-16">Фото</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Название</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">ГОСТ</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Состояние</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Масса</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Остаток</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Цена</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground w-24">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards - рендерятся внутри ProductTableRow */}
          <div className="md:hidden space-y-4">
            {filteredProducts.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="Продукты не найдены"
          description={
            searchQuery || selectedCategory || selectedSubcategory
              ? 'Измените параметры фильтрации или поиска'
              : 'Добавьте первый продукт в каталог'
          }
        />
      )}

      {/* Модалки для продуктов */}
      <CreateProductModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreate={handleCreateProduct}
        categories={categoriesList}
        subcategories={subcategoriesList}
      />

      {editingProduct && (
        <EditProductModal
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          categories={categoriesList}
          subcategories={subcategoriesList}
        />
      )}

      {deletingProduct && (
        <DeleteProductDialog
          open={!!deletingProduct}
          onOpenChange={(open) => !open && setDeletingProduct(null)}
          product={deletingProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  )
}
