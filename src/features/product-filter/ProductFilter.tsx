import {useState} from 'react'
import {FiFilter, FiSearch, FiX} from 'react-icons/fi'
import type {ProductCondition} from '../../entities/product/model/types'
import {Input} from '../../shared/ui/Input'

interface ProductFilterProps {
    onFilterChange: (filters: FilterState) => void
}

interface FilterState {
    search: string
    condition: ProductCondition | 'all'
    stock: 'in-stock' | 'on-order' | 'all'
    sort: 'name' | 'price-asc' | 'price-desc' | 'popular'
}

export function ProductFilter({onFilterChange}: ProductFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        condition: 'all',
        stock: 'all',
        sort: 'name',
    })

    const [mobileOpen, setMobileOpen] = useState(false)

    const handleChange = (key: keyof FilterState, value: string) => {
        const newFilters = {...filters, [key]: value}
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
                <FiFilter className="w-6 h-6 text-white"/>
            </button>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)}/>
                    <div
                        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[hsl(var(--card))] p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Фильтры</h2>
                            <button onClick={() => setMobileOpen(false)}>
                                <FiX className="w-6 h-6"/>
                            </button>
                        </div>
                        <FilterContent filters={filters} handleChange={handleChange}/>
                    </div>
                </div>
            )}

            {/* Desktop filters */}
            <div
                className="hidden lg:block bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 mb-6">
                <FilterContent filters={filters} handleChange={handleChange}/>
            </div>
        </>
    )
}

const conditionOptions = [
    {value: 'all', label: 'Все'},
    {value: 'new', label: 'Новый'},
    {value: 'used', label: 'Б/У'},
]

function FilterContent({filters, handleChange}: {
    filters: FilterState
    handleChange: (key: keyof FilterState, value: string) => void
}) {
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]"/>
                <Input
                    placeholder="Поиск по названию, артикулу, ГОСТу"
                    className="w-full pl-10"
                    value={filters.search}
                    onChange={(e) => handleChange('search', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Condition - as clickable buttons */}
                <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Состояние</label>
                    <div className="flex gap-1">
                        {conditionOptions.filter(opt => opt.value !== 'all').map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleChange('condition', opt.value)}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                                    filters.condition === opt.value
                                        ? 'bg-[hsl(var(--primary))] text-white'
                                        : 'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))/0.8]'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
