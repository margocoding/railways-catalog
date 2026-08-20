import { useState } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import type { Product, Category, Subcategory } from '@/entities/product/model/types'

interface CreateProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (product: Omit<Product, 'id'>) => Promise<void>
  categories: Category[]
  subcategories: Subcategory[]
}

export function CreateProductModal({ open, onOpenChange, onCreate, categories, subcategories }: CreateProductModalProps) {
  const [sku, setSku] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [gost, setGost] = useState('')
  const [price, setPrice] = useState('')
  const [priceOnRequest, setPriceOnRequest] = useState(false)
  const [stock, setStock] = useState('1')
  const [condition, setCondition] = useState<Product['condition']>('new')
  const [categorySlug, setCategorySlug] = useState('')
  const [subcategorySlug, setSubcategorySlug] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredSubcategories = subcategories.filter(sub => sub.categorySlug === categorySlug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sku.trim() || !title.trim() || !slug.trim() || !categorySlug || !subcategorySlug) {
      setError('SKU, название, slug, категория и субкатегория обязательны')
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      await onCreate({
        sku: sku.trim(),
        title: title.trim(),
        slug: slug.trim(),
        gost: gost.trim(),
        price: priceOnRequest ? 0 : Number(price) || 0,
        priceOnRequest,
        stock: Number(stock) || 0,
        condition,
        images: ['/test-product.webp'],
        categorySlug,
        subcategorySlug,
        description: description.trim(),
      })
      // Reset form
      setSku('')
      setTitle('')
      setSlug('')
      setGost('')
      setPrice('')
      setPriceOnRequest(false)
      setStock('1')
      setCondition('new')
      setCategorySlug('')
      setSubcategorySlug('')
      setDescription('')
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании продукта')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSku('')
    setTitle('')
    setSlug('')
    setGost('')
    setPrice('')
    setPriceOnRequest(false)
    setStock('1')
    setCondition('new')
    setCategorySlug('')
    setSubcategorySlug('')
    setDescription('')
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Добавить продукт"
      description="Заполните информацию о новом продукте"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              SKU *
            </label>
            <Input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Например: RL-001"
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
              placeholder="Например: rels-r65"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Название *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Рельс железнодорожный Р65"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            ГОСТ
          </label>
          <Input
            value={gost}
            onChange={(e) => setGost(e.target.value)}
            placeholder="Например: ГОСТ Р 51685-2013"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Цена
            </label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              disabled={isSubmitting || priceOnRequest}
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={priceOnRequest}
                onChange={(e) => setPriceOnRequest(e.target.checked)}
                disabled={isSubmitting}
                className="rounded border-border"
              />
              <span className="text-sm text-[hsl(var(--foreground))]">Цена по запросу</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Остаток на складе
          </label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Состояние
          </label>
          <Select
            options={[
              { value: 'new', label: 'Новый' },
              { value: 'used', label: 'Б/У' },
              { value: 'service', label: 'Сервисный' },
            ]}
            value={condition}
            onChange={(e) => setCondition(e.target.value as Product['condition'])}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Категория *
            </label>
            <Select
              options={[{ value: '', label: 'Выберите категорию' }, ...categories.map(cat => ({ value: cat.slug, label: cat.name }))]}
              value={categorySlug}
              onChange={(e) => {
                setCategorySlug(e.target.value)
                setSubcategorySlug('')
              }}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Субкатегория *
            </label>
            <Select
              options={[{ value: '', label: 'Выберите субкатегорию' }, ...filteredSubcategories.map(sub => ({ value: sub.slug, label: sub.name }))]}
              value={subcategorySlug}
              onChange={(e) => setSubcategorySlug(e.target.value)}
              disabled={isSubmitting || !categorySlug}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание продукта"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors p-3 min-h-[100px]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-background pb-0">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Создание...' : 'Создать'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
