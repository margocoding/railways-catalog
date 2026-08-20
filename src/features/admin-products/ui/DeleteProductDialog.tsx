import { useState } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import type { Product } from '@/entities/product/model/types'

interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onDelete: (id: string) => Promise<boolean>
}

export function DeleteProductDialog({ open, onOpenChange, product, onDelete }: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!product) return

    setIsDeleting(true)
    setError(null)
    
    try {
      const success = await onDelete(product.id)
      if (success) {
        onOpenChange(false)
      } else {
        setError('Не удалось удалить продукт')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении продукта')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    setError(null)
    onOpenChange(false)
  }

  if (!product) return null

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Удалить продукт"
      description="Вы уверены, что хотите удалить этот продукт?"
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-[hsl(var(--foreground))]">
            Продукт: <span className="font-semibold">{product.title}</span>
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            SKU: {product.sku}
          </p>
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
