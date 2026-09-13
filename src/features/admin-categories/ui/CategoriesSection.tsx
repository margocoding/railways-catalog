import { useState } from 'react'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMove,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi'
import { CategoryFormModal } from './CategoryFormModal'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib'
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

  // Порядок категорий: пока идёт перестановка, работаем с черновиком списка,
  // чтобы обновление с сервера не сбрасывало начатое.
  const [ordering, setOrdering] = useState(false)
  const [draft, setDraft] = useState<Category[]>(categories)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)


  const move = (from: number, to: number) =>
    setDraft((current) => {
      if (from === to || to < 0 || to >= current.length) return current
      const next = [...current]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })

  const startOrdering = () => {
    setDraft(categories)
    setOrderError(null)
    setOrdering(true)
  }

  const cancelOrdering = () => {
    setDraft(categories)
    setOrderError(null)
    setOrdering(false)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    setOrderError(null)
    try {
      await categoryApi.reorder(draft.map((category) => category.id))
      await onRefresh()
      setOrdering(false)
    } catch {
      setOrderError('Не удалось сохранить порядок. Проверьте связь и попробуйте ещё раз.')
    } finally {
      setSavingOrder(false)
    }
  }

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
          {ordering ? (
            <div className="flex items-center gap-2">
              <Button onClick={saveOrder} size="sm" disabled={savingOrder}>
                {savingOrder ? 'Сохраняю…' : 'Сохранить порядок'}
              </Button>
              <Button
                onClick={cancelOrdering}
                size="sm"
                variant="secondary"
                disabled={savingOrder}
              >
                Отмена
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {categories.length > 1 && (
                <Button onClick={startOrdering} size="sm" variant="secondary">
                  <FiMove className="h-4 w-4" />
                  Изменить порядок
                </Button>
              )}
              <Button onClick={openCreate} size="sm">
                <FiPlus className="h-4 w-4" />
                Добавить категорию
              </Button>
            </div>
          )}
        </div>

        {categories.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">Категории ещё не созданы</p>
            <p className="mt-1 text-xs">
              Нажмите "Добавить категорию", чтобы создать первую
            </p>
          </div>
        ) : ordering ? (
          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              Перетащите категорию за ручку или двигайте стрелками. В этом порядке
              категории увидят посетители — в каталоге и в меню на главной.
            </p>

            <ol className="flex flex-col gap-2">
              {draft.map((category, index) => {
                const dragging = dragIndex === index
                const dropTarget = dropIndex === index && dragIndex !== index

                return (
                  <li
                    key={category.id}
                    draggable={!savingOrder}
                    onDragStart={(event) => {
                      setDragIndex(index)
                      event.dataTransfer.effectAllowed = 'move'
                      event.dataTransfer.setData('text/plain', String(index))
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      event.dataTransfer.dropEffect = 'move'
                      if (dropIndex !== index) setDropIndex(index)
                    }}
                    onDrop={(event) => {
                      event.preventDefault()
                      const from = dragIndex ?? Number(event.dataTransfer.getData('text/plain'))
                      if (Number.isInteger(from)) move(from, index)
                      setDragIndex(null)
                      setDropIndex(null)
                    }}
                    onDragEnd={() => {
                      setDragIndex(null)
                      setDropIndex(null)
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border bg-muted/30 p-3 transition-colors',
                      dragging ? 'opacity-50' : 'opacity-100',
                      dropTarget ? 'border-primary bg-primary/5' : 'border-border',
                      savingOrder ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                    )}
                  >
                    <span className="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
                      {index + 1}
                    </span>
                    <FiMove
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p className="min-w-0 flex-1 truncate font-medium text-foreground">
                      {category.name}
                    </p>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(index, index - 1)}
                        disabled={index === 0 || savingOrder}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                        aria-label={`Поднять «${category.name}» выше`}
                        title="Выше"
                      >
                        <FiChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, index + 1)}
                        disabled={index === draft.length - 1 || savingOrder}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                        aria-label={`Опустить «${category.name}» ниже`}
                        title="Ниже"
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ol>

            {orderError && (
              <p role="alert" className="mt-3 text-sm text-red-500">
                {orderError}
              </p>
            )}
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