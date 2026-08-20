import { useState } from 'react'
import type { Category, Subcategory } from '@/entities/product/model/types'
import { CreateCategoryModal } from './CreateCategoryModal'
import { EditCategoryModal } from './EditCategoryModal'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'

interface CategoriesSectionProps {
  categories: Category[]
  subcategories: Subcategory[]
  isLoading: boolean
  onCreateCategory: (category: Omit<Category, 'id'>) => Promise<Category | null>
  onUpdateCategory: (id: string, updates: Partial<Category>) => Promise<boolean>
  onDeleteCategory: (id: string) => Promise<boolean>
}

export function CategoriesSection({
  categories,
  subcategories,
  isLoading,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoriesSectionProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleCreate = async (categoryData: Omit<Category, 'id'>) => {
    await onCreateCategory(categoryData)
  }

  const getCategorySubcategoriesCount = (categoryId: string) => {
    return subcategories.filter(sub => sub.categoryId === categoryId).length
  }

  if (isLoading && categories.length === 0) {
    return (
      <div className="mb-6 p-4 rounded-xl border border-border bg-card">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Загрузка категорий...</p>
      </div>
    )
  }

  return (
    <>
      {/* Секция управления категориями */}
      <div className="mb-6 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Категории</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {categories.length} {categories.length === 1 ? 'категория' : categories.length < 5 ? 'категории' : 'категорий'}
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Добавить категорию
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">
            <p className="text-sm">Категории ещё не созданы</p>
            <p className="text-xs mt-1">Нажмите "Добавить категорию", чтобы создать первую</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => {
              const subcatCount = getCategorySubcategoriesCount(category.id)
              
              return (
                <div
                  key={category.id}
                  className="group flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{category.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {subcatCount} {subcatCount === 1 ? 'субкатегория' : subcatCount < 5 ? 'субкатегории' : 'субкатегорий'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="p-1.5 rounded-md hover:bg-[hsl(var(--primary))/0.1] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                      title="Редактировать"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeletingCategory(category)}
                      className="p-1.5 rounded-md hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500"
                      title="Удалить"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Модалки */}
      {isCreateModalOpen && (
        <CreateCategoryModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onCreate={handleCreate}
        />
      )}

      {editingCategory && (
        <EditCategoryModal
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          category={editingCategory}
          onUpdate={onUpdateCategory}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          category={deletingCategory}
          onDelete={onDeleteCategory}
        />
      )}
    </>
  )
}
