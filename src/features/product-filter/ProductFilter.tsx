import { useState } from 'react'
import { FiFilter, FiSearch, FiX } from 'react-icons/fi'

import type {
  FilterOption,
  ProductCondition,
} from '../../entities/product/model/types'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Select } from '../../shared/ui/Select'

export interface FilterState {
  search: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
  attributes: Record<string, string>
}

interface ProductFilterProps {
  filters?: FilterOption[]
  value?: FilterState
  onFilterChange: (filters: FilterState) => void
}

const conditionOptions: FilterOption[] = [
  {
    key: 'all',
    label: 'Все состояния',
  },
  {
    key: 'new',
    label: 'Новый',
  },
  {
    key: 'used',
    label: 'Б/У',
  },
]

const sortOptions: FilterOption[] = [
  {
    key: 'name',
    label: 'По названию',
  },
  {
    key: 'popular',
    label: 'По популярности',
  },
  {
    key: 'price-asc',
    label: 'Сначала дешевле',
  },
  {
    key: 'price-desc',
    label: 'Сначала дороже',
  },
]

function createInitialFilters(
  definitions: FilterOption[] = [],
): FilterState {
  return {
    search: '',
    condition: 'all',
    stock: 'all',
    sort: 'name',
    attributes: Object.fromEntries(
      definitions.map((filter) => [filter.key, 'all']),
    ),
  }
}

export function ProductFilter({
  filters = [],
  value,
  onFilterChange,
}: ProductFilterProps) {
  const [internalFilters, setInternalFilters] =
    useState<FilterState>(
      value ?? createInitialFilters(filters),
    )

  const [mobileOpen, setMobileOpen] = useState(false)

  const currentFilters = value ?? internalFilters

  const updateFilters = (nextFilters: FilterState) => {
    setInternalFilters(nextFilters)
    onFilterChange(nextFilters)
  }

  const handleChange = <K extends keyof FilterState>(
    key: K,
    nextValue: FilterState[K],
  ) => {
    updateFilters({
      ...currentFilters,
      [key]: nextValue,
    })
  }

  const handleAttributeChange = (
    key: string,
    nextValue: string,
  ) => {
    updateFilters({
      ...currentFilters,
      attributes: {
        ...currentFilters.attributes,
        [key]: nextValue,
      },
    })
  }

  const resetFilters = () => {
    updateFilters(createInitialFilters(filters))
  }

  const activeFiltersCount =
    Number(currentFilters.condition !== 'all') +
    Number(currentFilters.stock !== 'all') +
    Object.values(currentFilters.attributes).filter(
      (value) => value !== 'all',
    ).length

  return (
    <>
   <div className="mb-6 hidden flex-wrap items-center gap-3 lg:flex">
  <div className="relative min-w-[320px] flex-[1_1_420px]">
    <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

    <Input
      value={currentFilters.search}
      onChange={(event) =>
        handleChange('search', event.target.value)
      }
      placeholder="Поиск по названию, артикулу или ГОСТу"
      className="h-12 w-full bg-card pl-9 pr-9"
    />

    {currentFilters.search && (
      <button
        type="button"
        onClick={() => handleChange('search', '')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Очистить поиск"
      >
        <FiX className="h-4 w-4" />
      </button>
    )}
  </div>

  {filters.map((filter) => (
    <div
      key={filter.key}
      className="w-48 shrink-0"
    >
      <Select
        size="md"
        value={
          currentFilters.attributes[filter.key] ?? 'all'
        }
        onChange={(event) =>
          handleAttributeChange(
            filter.key,
            event.target.value,
          )
        }
        options={[
          {
            value: 'all',
            label: filter.label,
          },
          ...(filter.options ?? []),
        ]}
      />
    </div>
  ))}

  <div className="w-48 shrink-0">
    <Select
      size="md"
      value={currentFilters.condition}
      onChange={(event) =>
        handleChange(
          'condition',
          event.target.value as FilterState['condition'],
        )
      }
      options={conditionOptions.map((option) => ({
        value: option.key,
        label: option.label,
      }))}
    />
  </div>

  <div className="w-52 shrink-0">
    <Select
      size="md"
      value={currentFilters.sort}
      onChange={(event) =>
        handleChange(
          'sort',
          event.target.value as FilterState['sort'],
        )
      }
      options={sortOptions.map((option) => ({
        value: option.key,
        label: option.label,
      }))}
    />
  </div>
</div>

      {/* =========================================================
          MOBILE
      ========================================================= */}
      <div className="mb-5 flex gap-2 lg:hidden">
        <div className="relative min-w-0 flex-1">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={currentFilters.search}
            onChange={(event) =>
              handleChange('search', event.target.value)
            }
            placeholder="Поиск..."
            className="h-11 w-full bg-card pl-9 pr-9"
          />

          {currentFilters.search && (
            <button
              type="button"
              onClick={() => handleChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Очистить поиск"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => setMobileOpen(true)}
          className="shrink-0"
        >
          <FiFilter className="h-4 w-4" />
          <span>Фильтры</span>

          {activeFiltersCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>
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
          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-card p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Фильтры
                </h2>

                {activeFiltersCount > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Активно фильтров: {activeFiltersCount}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Закрыть"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Dynamic filters */}
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {filter.label}
                  </label>

                  <Select
                    value={
                      currentFilters.attributes[filter.key] ?? 'all'
                    }
                    onChange={(event) =>
                      handleAttributeChange(
                        filter.key,
                        event.target.value,
                      )
                    }
                    options={[
                      {
                        value: 'all',
                        label: 'Все варианты',
                      },
                      ...(filter.options ?? []),
                    ]}
                  />
                </div>
              ))}

              {/* Condition */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Состояние
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {conditionOptions.map((option) => (
                    <Button
                      key={option.key}
                      type="button"
                      size="sm"
                      variant={
                        currentFilters.condition === option.key
                          ? 'primary'
                          : 'secondary'
                      }
                      onClick={() =>
                        handleChange(
                          'condition',
                          option.key as FilterState['condition'],
                        )
                      }
                      className="w-full"
                    >
                      {option.key === 'all'
                        ? 'Все'
                        : option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Сортировка
                </label>

                <Select
                  value={currentFilters.sort}
                  onChange={(event) =>
                    handleChange(
                      'sort',
                      event.target.value as FilterState['sort'],
                    )
                  }
                  options={sortOptions.map((option) => ({
                    value: option.key,
                    label: option.label,
                  }))}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {activeFiltersCount > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={resetFilters}
                    className="flex-1"
                  >
                    Сбросить
                  </Button>
                )}

                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1"
                >
                  Показать товары
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}