import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { ImageUpload } from '@/shared/ui/ImageUpload'
import { slugify, sanitizeSlug, getImageUrl } from '@/shared/lib'
import { subcategoryApi } from '@/entities/subcategory'
import type { Category } from '@/entities/category'

interface SubcategoryDraft {
  id?: string
  name: string
  slug: string
  slugTouched: boolean
  originalName?: string
  originalSlug?: string
  _deleted?: boolean
  _created?: boolean
}

interface CategoryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  category?: Category
  onSubmit: (
    dto: { name: string; slug: string; description: string },
    image: File | null,
  ) => Promise<Category | boolean | null>
}

export function CategoryFormModal({
  open,
  onOpenChange,
  mode,
  category,
  onSubmit,
}: CategoryFormModalProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [subcategories, setSubcategories] = useState<SubcategoryDraft[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const existingImageUrl =
    mode === 'edit' && category?.image
      ? getImageUrl(category.image)
      : undefined

  useEffect(() => {
    if (!open) return

    if (mode === 'edit' && category) {
      setName(category.name)
      setSlug(category.slug)
      setSlugTouched(true)
      setDescription(category.description ?? '')
      setImage(null)
      setSubcategories(
        (category.subcategories ?? []).map((s) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          slugTouched: true,
          originalName: s.name,
          originalSlug: s.slug,
        })),
      )
    } else {
      resetForm()
    }

    setError(null)
  }, [open, mode, category])

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(sanitizeSlug(value))
    setSlugTouched(true)
  }

  const handleAddSubcategory = () => {
    setSubcategories((prev) => [
      ...prev,
      { name: '', slug: '', slugTouched: false, _created: true },
    ])
  }

  const handleRemoveSubcategory = (index: number) => {
    setSubcategories((prev) => {
      const item = prev[index]
      if (!item) return prev

      if (item.id && !item._created) {
        return prev.map((s, i) =>
          i === index ? { ...s, _deleted: true, name: '', slug: '' } : s,
        )
      }

      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubcategoryChange = (
    index: number,
    field: 'name' | 'slug',
    value: string,
  ) => {
    setSubcategories((prev) =>
      prev.map((s, i) => {
        if (i !== index) return s

        if (field === 'name') {
          const autoSlug = s.slugTouched ? s.slug : slugify(value)
          return { ...s, name: value, slug: autoSlug }
        }

        return {
          ...s,
          slug: sanitizeSlug(value),
          slugTouched: true,
        }
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim()) {
      setError('Название и slug обязательны')
      return
    }

    const activeSubs = subcategories.filter((s) => !s._deleted)
    const invalidSub = activeSubs.find((s) => !s.name.trim() || !s.slug.trim())
    if (invalidSub) {
      setError('Заполните название и slug для всех субкатегорий')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await onSubmit(
        {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
        },
        image,
      )

      const createdCategory =
        typeof result === 'object' && result !== null && 'slug' in result
          ? (result as Category)
          : null

      if (mode === 'create' && createdCategory && activeSubs.length > 0) {
        await Promise.all(
          activeSubs.map((s) =>
            subcategoryApi.create({
              name: s.name.trim(),
              slug: s.slug.trim(),
              categorySlug: createdCategory.slug,
            }),
          ),
        )
      }

      if (mode === 'edit' && category) {
        const toDelete = subcategories.filter((s) => s._deleted && s.id)
        const toCreate = activeSubs.filter((s) => !s.id || s._created)
        const toUpdate = activeSubs.filter(
          (s) =>
            s.id &&
            !s._created &&
            (s.name !== s.originalName || s.slug !== s.originalSlug),
        )

        await Promise.all([
          ...toDelete.map((s) => subcategoryApi.delete(s.id!)),
          ...toCreate.map((s) =>
            subcategoryApi.create({
              name: s.name.trim(),
              slug: s.slug.trim(),
              categorySlug: category.slug,
            }),
          ),
          ...toUpdate.map((s) =>
            subcategoryApi.update(s.id!, {
              name: s.name.trim(),
              slug: s.slug.trim(),
            }),
          ),
        ])
      }

      resetForm()
      onOpenChange(false)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : mode === 'create'
            ? 'Ошибка при создании категории'
            : 'Ошибка при обновлении категории',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName('')
    setSlug('')
    setSlugTouched(false)
    setDescription('')
    setImage(null)
    setSubcategories([])
    setError(null)
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  const visibleSubs = subcategories.filter((s) => !s._deleted)

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title={mode === 'create' ? 'Добавить категорию' : 'Редактировать категорию'}
      description="Заполните информацию о категории"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Название *
          </label>
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Например: Рельсы"
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
            placeholder="Например: relsy"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Генерируется автоматически. Только латиница, цифры и дефисы.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание категории"
            disabled={isSubmitting}
            className="min-h-[100px] w-full rounded-lg border border-border bg-muted/50 p-3 text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <ImageUpload
          value={image}
          onChange={setImage}
          existingUrl={existingImageUrl}
          disabled={isSubmitting}
        />

        <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Субкатегории
              </h3>
              <p className="text-xs text-muted-foreground">
                {visibleSubs.length}{' '}
                {visibleSubs.length === 1
                  ? 'субкатегория'
                  : visibleSubs.length < 5
                    ? 'субкатегории'
                    : 'субкатегорий'}
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleAddSubcategory}
              disabled={isSubmitting}
            >
              <FiPlus className="h-4 w-4" />
              Добавить
            </Button>
          </div>

          {visibleSubs.length > 0 && (
            <div className="space-y-2">
              {subcategories.map((sub, index) => {
                if (sub._deleted) return null

                return (
                  <div
                    key={sub.id ?? `new-${index}`}
                    className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 rounded-lg border border-border bg-card p-2"
                  >
                    <Input
                      value={sub.name}
                      onChange={(e) =>
                        handleSubcategoryChange(index, 'name', e.target.value)
                      }
                      placeholder="Название"
                      disabled={isSubmitting}
                    />
                    <Input
                      value={sub.slug}
                      onChange={(e) =>
                        handleSubcategoryChange(index, 'slug', e.target.value)
                      }
                      placeholder="slug"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubcategory(index)}
                      disabled={isSubmitting}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {visibleSubs.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Субкатегории ещё не добавлены
            </p>
          )}
        </div>

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
              ? mode === 'create'
                ? 'Создание...'
                : 'Сохранение...'
              : mode === 'create'
                ? 'Создать'
                : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}