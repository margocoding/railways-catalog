import { useState } from 'react'
import { FiChevronDown, FiFilter, FiSearch, FiX } from 'react-icons/fi'

import type { ProductCondition } from '../../entities/product/model/types'
import { Input } from '../../shared/ui/Input'

interface FilterState {
  search: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
}

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void
}

const conditionOptions = [
  { value: 'all', label: 'Все состояния' },
  { value: 'new', label: 'Новый' },
  { value: 'used', label: 'Б/У' },
]

const sortOptions = [
  { value: 'name', label: 'По названию' },
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
]

export function ProductFilter({
  onFilterChange,
}: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    condition: 'all',
    stock: 'all',
    sort: 'name',
  })

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleChange = (
    key: keyof FilterState,
    value: string,
  ) => {
    const nextFilters = {
      ...filters,
      [key]: value,
    } as FilterState

    setFilters(nextFilters)
    onFilterChange(nextFilters)
  }

  const activeFiltersCount =
    Number(filters.condition !== 'all') +
    Number(filters.stock !== 'all') +
    Number(filters.sort !== 'name')

  return (
    <>
      {/* =========================================================
          DESKTOP
      ========================================================= */}
      <div className="mb-6 hidden lg:flex items-center gap-3">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
          />

          <Input
            placeholder="Поиск по названию, артикулу или ГОСТу"
            className="h-11 w-full rounded-lg bg-[hsl(var(--card))] pl-9"
            value={filters.search}
            onChange={(event) =>
              handleChange('search', event.target.value)
            }
          />

          {filters.search && (
            <button
              type="button"
              onClick={() => handleChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              aria-label="Очистить поиск"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Condition */}
        <div className="relative w-44 shrink-0">
          <select
            value={filters.condition}
            onChange={(event) =>
              handleChange('condition', event.target.value)
            }
            className="h-11 w-full appearance-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 pr-9 text-sm text-[hsl(var(--foreground))] outline-none transition-colors hover:border-[hsl(var(--primary))/50] focus:border-[hsl(var(--primary))]"
          >
            {conditionOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
        </div>

        {/* Sort */}
        <div className="relative w-48 shrink-0">
          <select
            value={filters.sort}
            onChange={(event) =>
              handleChange('sort', event.target.value)
            }
            className="h-11 w-full appearance-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 pr-9 text-sm text-[hsl(var(--foreground))] outline-none transition-colors hover:border-[hsl(var(--primary))/50] focus:border-[hsl(var(--primary))]"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
        </div>
      </div>

      {/* =========================================================
          MOBILE
      ========================================================= */}
      <div className="mb-5 flex gap-2 lg:hidden">
        <div className="relative min-w-0 flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
          />

          <Input
            placeholder="Поиск..."
            className="h-11 w-full rounded-lg bg-[hsl(var(--card))] pl-9"
            value={filters.search}
            onChange={(event) =>
              handleChange('search', event.target.value)
            }
          />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="relative flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))/50]"
        >
          <FiFilter className="h-4 w-4" />

          <span>Фильтры</span>

          {activeFiltersCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-1 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Закрыть фильтры"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[hsl(var(--card))] p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">
                  Фильтры
                </h2>

                {activeFiltersCount > 0 && (
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    Активно фильтров: {activeFiltersCount}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--muted))]"
                aria-label="Закрыть"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Condition */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Состояние
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {conditionOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleChange(
                          'condition',
                          option.value,
                        )
                      }
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                        filters.condition === option.value
                          ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white'
                          : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))/50]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Сортировка
                </label>

                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(event) =>
                      handleChange(
                        'sort',
                        event.target.value,
                      )
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 pr-9 text-sm outline-none focus:border-[hsl(var(--primary))]"
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-lg bg-[hsl(var(--primary))] py-3 font-bold text-white"
              >
                Показать товары
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}