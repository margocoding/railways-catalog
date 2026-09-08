import { useState, type FormEvent } from 'react'
import { FiFilter } from 'react-icons/fi'
import type { Category, FilterOption } from '@/entities/category'
import type {
  ProductCondition,
  SortOption,
} from '@/entities/product/model/types'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Drawer } from '@/shared/ui/Drawer'

export interface FilterState {
  search: string
  gost: string
  priceMin: string
  priceMax: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  sort: SortOption
  attributes: Record<string, string>
}
const emptyFilters: FilterState = {
  search: '',
  gost: '',
  priceMin: '',
  priceMax: '',
  condition: 'all',
  stock: 'all',
  sort: 'name',
  attributes: {},
}
const selectClass =
  'min-h-12 w-full min-w-0 rounded-lg border border-border bg-white px-3 text-base font-normal text-foreground'

interface ProductFilterProps {
  value: FilterState
  onFilterChange: (filters: FilterState, category?: string) => void
  categories: Category[]
  category: string
  filters?: FilterOption[]
}
export function ProductFilter({
  value,
  onFilterChange,
  categories,
  category,
  filters = [],
}: ProductFilterProps) {
  const [draft, setDraft] = useState(value)
  const [draftCategory, setDraftCategory] = useState(category)
  const [open, setOpen] = useState(false)
  const invalidRange =
    draft.priceMin !== '' &&
    draft.priceMax !== '' &&
    Number(draft.priceMin) > Number(draft.priceMax)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (invalidRange) return
    onFilterChange(draft, draftCategory)
    setOpen(false)
  }
  const reset = () => {
    const next = { ...emptyFilters, sort: value.sort }
    setDraft(next)
    setDraftCategory(category)
    onFilterChange(next, category)
    setOpen(false)
  }
  const activeCount = [
    value.search,
    value.gost,
    value.priceMin,
    value.priceMax,
    value.condition !== 'all',
    value.stock !== 'all',
    ...Object.values(value.attributes).filter((v) => v && v !== 'all'),
  ].filter(Boolean).length
  const form = (prefix: string) => (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm font-bold">
        Тип материала
        <select
          aria-label="Тип материала"
          value={draftCategory}
          onChange={(e) => {
            setDraftCategory(e.target.value)
            setDraft((current) => ({ ...current, attributes: {} }))
          }}
          className={`${selectClass} mt-2`}
        >
          <option value="">Все материалы</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-bold">
        Название или артикул
        <Input
          value={draft.search}
          onChange={(e) => setDraft({ ...draft, search: e.target.value })}
          placeholder="Например, Р65"
          className="mt-2 h-12 bg-white text-base font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        ГОСТ
        <Input
          value={draft.gost}
          onChange={(e) => setDraft({ ...draft, gost: e.target.value })}
          placeholder="Например, 16017-79"
          className="mt-2 h-12 bg-white text-base font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        Состояние
        <select
          value={draft.condition}
          onChange={(e) =>
            setDraft({
              ...draft,
              condition: e.target.value as FilterState['condition'],
            })
          }
          className={`${selectClass} mt-2`}
        >
          <option value="all">Любое состояние</option>
          <option value="new">Новый</option>
          <option value="used">Б/у</option>
          <option value="service">Услуга</option>
        </select>
      </label>
      <label className="block text-sm font-bold">
        Наличие
        <select
          value={draft.stock}
          onChange={(e) =>
            setDraft({
              ...draft,
              stock: e.target.value as FilterState['stock'],
            })
          }
          className={`${selectClass} mt-2`}
        >
          <option value="all">Любое наличие</option>
          <option value="in-stock">В наличии</option>
          <option value="on-order">Под заказ</option>
        </select>
      </label>
      <fieldset>
        <legend className="mb-2 text-sm font-bold">Цена, ₽</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="min-w-0">
            <span className="sr-only">Цена от</span>
            <Input
              type="number"
              min="0"
              step="any"
              value={draft.priceMin}
              onChange={(e) => setDraft({ ...draft, priceMin: e.target.value })}
              placeholder="От"
              aria-invalid={invalidRange}
              aria-describedby={
                invalidRange ? `${prefix}-price-error` : undefined
              }
              className="h-12 bg-white px-3 text-base"
            />
          </label>
          <label className="min-w-0">
            <span className="sr-only">Цена до</span>
            <Input
              type="number"
              min="0"
              step="any"
              value={draft.priceMax}
              onChange={(e) => setDraft({ ...draft, priceMax: e.target.value })}
              placeholder="До"
              aria-invalid={invalidRange}
              aria-describedby={
                invalidRange ? `${prefix}-price-error` : undefined
              }
              className="h-12 bg-white px-3 text-base"
            />
          </label>
        </div>
        {invalidRange && (
          <p
            id={`${prefix}-price-error`}
            role="alert"
            className="mt-2 text-sm text-destructive"
          >
            Цена «до» должна быть не меньше цены «от».
          </p>
        )}
      </fieldset>
      {filters
        .filter((filter) => filter.options?.length)
        .map((filter) => (
          <label key={filter.key} className="block text-sm font-bold">
            {filter.label}
            <select
              value={draft.attributes[filter.key] ?? 'all'}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  attributes: {
                    ...draft.attributes,
                    [filter.key]: e.target.value,
                  },
                })
              }
              className={`${selectClass} mt-2`}
            >
              <option value="all">Все значения</option>
              {filter.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      <div className="space-y-2 border-t border-border pt-5">
        <Button type="submit" disabled={invalidRange} className="w-full">
          Применить
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          className="w-full"
        >
          Сбросить фильтры
        </Button>
      </div>
    </form>
  )
  return (
    <>
      <div className="hidden rounded-lg border border-border bg-muted p-5 lg:block">
        <h2 className="mb-5 text-xl font-bold">Фильтры</h2>
        {form('desktop')}
      </div>
      <Button
        variant="outline"
        className="w-full lg:hidden"
        onClick={() => setOpen(true)}
      >
        <FiFilter />
        Фильтры
        {activeCount > 0 && (
          <span className="rounded bg-muted px-2">{activeCount}</span>
        )}
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        title="Фильтры каталога"
      >
        {form('mobile')}
      </Drawer>
    </>
  )
}
