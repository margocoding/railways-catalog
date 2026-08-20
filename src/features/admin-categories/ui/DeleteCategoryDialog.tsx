import { useState } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import type { Category } from '@/entities/product/model/types'

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onDelete: (id: string) => Promise<boolean>
}

export function DeleteCategoryDialog({ open, onOpenChange, category, onDelete }: DeleteCategoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!category) return

    setIsDeleting(true)
    setError(null)
    
    try {
      const success = await onDelete(category.id)
      if (success) {
        onOpenChange(false)
      } else {
        setError('Не удалось удалить категорию')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении категории')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    setError(null)
    onOpenChange(false)
  }

  if (!category) return null

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Удалить категорию"
      description="Вы уверены, что хотите удалить эту категорию?"
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-[hsl(var(--foreground))]">
            Категория: <span className="font-semibold">{category.name}</span>
          </p>
          {category.description && (
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              {category.description}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
