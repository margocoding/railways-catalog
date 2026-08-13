import { useState } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import type { ProductCondition } from '../../product/model/types'

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  search: string
  condition: ProductCondition | 'all'
  stock: 'in-stock' | 'on-order' | 'all'
  priceFrom: string
  priceTo: string
  sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    condition: 'all',
    stock: 'all',
    priceFrom: '',
    priceTo: '',
    sort: 'name',
  })
  
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <>
      {/* Mobile filter button */}
      <button 
        className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-accent-gradient rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
      >
        <FiFilter className="w-6 h-6 text-white" />
      </button>
      
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[hsl(var(--card))] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Фильтры</h2>
              <button onClick={() => setMobileOpen(false)}>
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <FilterContent filters={filters} handleChange={handleChange} />
          </div>
        </div>
      )}
      
      {/* Desktop filters */}
      <div className="hidden lg:block bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 mb-6">
        <FilterContent filters={filters} handleChange={handleChange} />
      </div>
    </>
  )
}

function FilterContent({ filters, handleChange }: { 
  filters: FilterState
  handleChange: (key: keyof FilterState, value: string) => void 
}) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
        <input
          type="text"
          placeholder="Поиск по названию, артикулу, ГОСТу"
          className="w-full pl-10 pr-4 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Condition */}
        <div>
          <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Состояние</label>
          <select
            className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none text-sm"
            value={filters.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          >
            <option value="all">Все</option>
            <option value="new">Новый</option>
            <option value="used">Б/У</option>
            <option value="service">Услуга</option>
          </select>
        </div>
        
        {/* Stock */}
        <div>
          <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Наличие</label>
          <select
            className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none text-sm"
            value={filters.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
          >
            <option value="all">Все</option>
            <option value="in-stock">В наличии</option>
            <option value="on-order">Под заказ</option>
          </select>
        </div>
        
        {/* Price From */}
        <div>
          <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Цена от, ₽</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none text-sm"
            value={filters.priceFrom}
            onChange={(e) => handleChange('priceFrom', e.target.value)}
          />
        </div>
        
        {/* Price To */}
        <div>
          <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Цена до, ₽</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none text-sm"
            value={filters.priceTo}
            onChange={(e) => handleChange('priceTo', e.target.value)}
          />
        </div>
      </div>
      
      {/* Sort */}
      <div className="flex items-center gap-4 pt-2 border-t border-[hsl(var(--border))]">
        <label className="text-xs text-[hsl(var(--muted-foreground))]">Сортировка:</label>
        <select
          className="px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none text-sm"
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option value="name">По названию</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="popular">По популярности</option>
        </select>
      </div>
    </div>
  )
}
