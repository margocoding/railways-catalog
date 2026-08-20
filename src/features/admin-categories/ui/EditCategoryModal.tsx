import { useState, useEffect } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import type { Category } from '@/entities/product/model/types'

interface EditCategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onUpdate: (id: string, updates: Partial<Category>) => Promise<boolean>
}

export function EditCategoryModal({ open, onOpenChange, category, onUpdate }: EditCategoryModalProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Сброс формы при открытии модалки с новой категорией
  useEffect(() => {
    if (category && open) {
      setName(category.name)
      setSlug(category.slug)
      setDescription(category.description || '')
      setError(null)
    } else if (!open) {
      setName('')
      setSlug('')
      setDescription('')
      setError(null)
    }
  }, [category, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim() || !category) {
      setError('Название и slug обязательны')
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      const success = await onUpdate(category.id, { 
        name: name.trim(), 
        slug: slug.trim(), 
        description: description.trim() 
      })
      if (success) {
        onOpenChange(false)
      } else {
        setError('Не удалось обновить категорию')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении категории')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!category) return null

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Редактировать категорию"
      description="Измените информацию о категории"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Название *
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Рельсы"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Slug *
          </label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Например: rails"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание категории"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors p-3 min-h-[100px]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
