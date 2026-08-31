import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { CategoryFormModal } from './CategoryFormModal'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'
import { Button } from '@/shared/ui/Button'
import { categoryApi } from '@/entities/category'
import type { Category } from '@/entities/category'

interface CategoriesSectionProps {
  categories: Category[]
  isLoading: boolean
  onRefresh: () => void
}

export function CategoriesSection({
  categories,
  isLoading,
  onRefresh,
}: CategoriesSectionProps) {
  const [modalState, setModalState] = useState<{
    open: boolean
    mode: 'create' | 'edit'
    category?: Category
  }>({ open: false, mode: 'create' })

  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const openCreate = () => setModalState({ open: true, mode: 'create' })
  const openEdit = (category: Category) =>
    setModalState({ open: true, mode: 'edit', category })
  const closeModal = () =>
    setModalState({ open: false, mode: 'create' })

  const handleCreate = async (
    dto: { name: string; slug: string; description: string },
    image: File | null,
  ): Promise<Category | null> => {
    const created = await categoryApi.create(dto, image)
    await onRefresh()
    return created
  }

  const handleUpdate = async (
    dto: { name: string; slug: string; description: string },
    image: File | null,
  ): Promise<boolean> => {
    if (!modalState.category) return false
    await categoryApi.update(modalState.category.id, dto, image)
    onRefresh()
    return true
  }

  const handleDelete = async (id: string): Promise<boolean> => {
    await categoryApi.delete(id)
    onRefresh()
    return true
  }

  if (isLoading && categories.length === 0) {
    return (
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Загрузка категорий...</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Категории</h2>
            <p className="text-sm text-muted-foreground">
              {categories.length}{' '}
              {categories.length === 1
                ? 'категория'
                : categories.length < 5
                  ? 'категории'
                  : 'категорий'}
            </p>
          </div>
          <Button onClick={openCreate} size="sm">
            <FiPlus className="h-4 w-4" />
            Добавить категорию
          </Button>
        </div>

        {categories.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">Категории ещё не созданы</p>
            <p className="mt-1 text-xs">
              Нажмите "Добавить категорию", чтобы создать первую
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const subCount = category.subcategories?.length ?? 0

              return (
                <div
                  key={category.id}
                  className="group flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {subCount}{' '}
                      {subCount === 1
                        ? 'субкатегория'
                        : subCount < 5
                          ? 'субкатегории'
                          : 'субкатегорий'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(category)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      title="Редактировать"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCategory(category)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      title="Удалить"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <CategoryFormModal
        open={modalState.open}
        onOpenChange={(open) => !open && closeModal()}
        mode={modalState.mode}
        category={modalState.category}
        onSubmit={modalState.mode === 'create' ? handleCreate : handleUpdate}
      />

      {deletingCategory && (
        <DeleteCategoryDialog
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          category={deletingCategory}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}