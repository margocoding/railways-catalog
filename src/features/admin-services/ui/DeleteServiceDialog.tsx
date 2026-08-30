import { useState } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import type { Service } from '@/entities/service/model/types'

interface DeleteServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service
  onDelete: (id: string) => Promise<void>
}

export function DeleteServiceDialog({
  open,
  onOpenChange,
  service,
  onDelete,
}: DeleteServiceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    try {
      await onDelete(service.id)
      onOpenChange(false)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка удаления услуги',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Удалить услугу?"
      description={`Вы уверены, что хотите удалить услугу «${service.title}»? Это действие нельзя отменить.`}
    >
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          variant="outline"
          onClick={handleClose}
          disabled={isDeleting}
        >
          Отмена
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Удаление...' : 'Удалить'}
        </Button>
      </div>
    </Dialog>
  )
}