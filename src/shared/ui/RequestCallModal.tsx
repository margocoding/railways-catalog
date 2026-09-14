import { RequestFormModal } from './RequestFormModal'

interface RequestCallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * «Заказать звонок». Раньше это была отдельная заглушка, которая ничего не отправляла.
 * Теперь — короткий режим общей формы заявки: заявка уходит на сервер, после успеха
 * засчитывается цель Метрики. Шапка и подвал открывают тот же режим напрямую.
 */
export function RequestCallModal({ open, onOpenChange }: RequestCallModalProps) {
  return (
    <RequestFormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Заказать звонок"
      description="Оставьте контакты — перезвоним в течение 15 минут"
      callback
    />
  )
}
