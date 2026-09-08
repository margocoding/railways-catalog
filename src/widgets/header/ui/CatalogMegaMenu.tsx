import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiChevronDown, FiGrid } from 'react-icons/fi'
import { getCategoryUrl, getSubcategoryUrl } from '@/shared/lib'
import { useCatalogMegaMenu } from '../model/use-catalog-mega-menu'

export function CatalogMegaMenu() {
  const [openLocation, setOpenLocation] = useState<string | null>(null)
  const { categories, loading, error } = useCatalogMegaMenu()
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const open = openLocation === location.key
  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpenLocation(null)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenLocation(null)
        toggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  return (
    <div ref={root}>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="catalog-panel"
        onClick={() => setOpenLocation(open ? null : location.key)}
        className="flex min-h-12 items-center gap-2 rounded-lg bg-accent px-4 font-bold text-accent-foreground hover:bg-[#E85E14]"
      >
        <FiGrid />
        Каталог
        <FiChevronDown
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          id="catalog-panel"
          aria-label="Категории каталога"
          className="panel-enter absolute inset-x-6 top-full max-h-[70dvh] overflow-y-auto rounded-lg border border-border bg-white p-6 text-foreground shadow-lg xl:inset-x-8"
        >
          {loading ? (
            <p role="status">Загрузка категорий…</p>
          ) : error ? (
            <p role="alert">
              Не удалось загрузить каталог.{' '}
              <Link to="/catalog" className="text-primary underline">
                Открыть каталог
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-x-8 gap-y-7">
              {categories.map((category) => (
                <div key={category.slug}>
                  <Link
                    to={getCategoryUrl(category.slug)}
                    className="mb-3 flex items-start gap-2 font-bold hover:text-primary"
                  >
                    <FiGrid className="mt-1 shrink-0 text-primary" />
                    {category.name}
                  </Link>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {category.subcategories?.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={getSubcategoryUrl(category.slug, item.slug)}
                          className="hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
