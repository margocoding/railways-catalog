import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { ImageUpload } from '@/shared/ui/ImageUpload'
import { slugify, sanitizeSlug, getImageUrl } from '@/shared/lib'
import type { Service, CreateServiceDto } from '@/entities/service/model/types'

interface ServiceFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: Service | null
  onCreate: (dto: CreateServiceDto, image: File | null) => Promise<void>
  onUpdate?: (id: string, dto: Partial<CreateServiceDto>, image: File | null) => Promise<void>
}

export function ServiceFormModal({
  open,
  onOpenChange,
  service,
  onCreate,
  onUpdate,
}: ServiceFormModalProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const existingImageUrl =
    service?.image ? getImageUrl(service.image) : undefined

  useEffect(() => {
    if (!open) return

    if (service) {
      setTitle(service.title)
      setSlug(service.slug)
      setSlugTouched(true)
      setDescription(service.description)
      setFullDescription(service.fullDescription || '')
      setFeatures(service.features || [])
      setImage(null)
    } else {
      resetForm()
    }

    setError(null)
  }, [open, service])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(sanitizeSlug(value))
    setSlugTouched(true)
  }

  const handleAddFeature = () => {
    setFeatures([...features, ''])
  }

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleFeatureChange = (index: number, value: string) => {
    setFeatures(features.map((f, i) => (i === index ? value : f)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !slug.trim()) {
      setError('Название и slug обязательны')
      return
    }

    if (!description.trim()) {
      setError('Краткое описание обязательно')
      return
    }

    const validFeatures = features.filter((f) => f.trim())

    setIsSubmitting(true)
    setError(null)

    try {
      const dto: CreateServiceDto = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        fullDescription: fullDescription.trim() || undefined,
        features: validFeatures.length > 0 ? validFeatures : undefined,
      }

      if (service && onUpdate) {
        await onUpdate(service.id, dto, image)
      } else {
        await onCreate(dto, image)
      }

      resetForm()
      onOpenChange(false)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : service
            ? 'Ошибка при обновлении услуги'
            : 'Ошибка при создании услуги',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setSlugTouched(false)
    setDescription('')
    setFullDescription('')
    setFeatures([])
    setImage(null)
    setError(null)
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title={service ? 'Редактировать услугу' : 'Добавить услугу'}
      description="Заполните информацию об услуге"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Название *
          </label>
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Например: Ремонт оборудования"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Slug *
          </label>
          <Input
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="repair-service"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Генерируется автоматически. Только латиница, цифры и дефисы.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Краткое описание *
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание услуги"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Полное описание
          </label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="Подробное описание услуги..."
            disabled={isSubmitting}
            rows={4}
            className="min-h-[100px] w-full rounded-lg border border-border bg-muted/50 p-3 text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Особенности
              </h3>
              <p className="text-xs text-muted-foreground">
                {features.length}{' '}
                {features.length === 1
                  ? 'особенность'
                  : features.length < 5
                    ? 'особенности'
                    : 'особенностей'}
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleAddFeature}
              disabled={isSubmitting}
            >
              <FiPlus className="h-4 w-4" />
              Добавить
            </Button>
          </div>

          {features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Особенность услуги"
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    disabled={isSubmitting}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {features.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Особенности ещё не добавлены
            </p>
          )}
        </div>

        <ImageUpload
          value={image}
          onChange={setImage}
          existingUrl={existingImageUrl}
          disabled={isSubmitting}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

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
            {isSubmitting
              ? service
                ? 'Сохранение...'
                : 'Создание...'
              : service
                ? 'Сохранить'
                : 'Создать'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}