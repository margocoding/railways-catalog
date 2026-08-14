import { useState } from 'react'
import { FiMenu, FiSearch, FiPhone } from 'react-icons/fi'
import { CATEGORIES } from '../../entities/category/model/types'
import { Drawer } from '../../shared/ui/Drawer'
import { Button } from '../../shared/ui/Button'
import { Link } from 'react-router'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogAccordionOpen, setCatalogAccordionOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[hsl(var(--background))/80] border-b border-[hsl(var(--border))]">
      <div className="container mx-auto px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
            <span className="text-xl">🛤️</span>
          </div>
          <div>
            <div className="font-black text-lg leading-none">СтальПуть</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Материалы ВСП</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <CatalogMegaMenu />
          <a href="/services" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">Услуги</a>
          <a href="/delivery" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">Доставка</a>
          <a href="/price" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">Прайс</a>
          <a href="/about" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">О компании</a>
          <a href="/contacts" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">Контакты</a>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-[hsl(var(--muted))] rounded-lg transition-colors min-h-[44px] min-w-[44px]">
            <FiSearch className="w-5 h-5" />
          </button>
          <a href="tel:+78000000000" className="flex items-center gap-2 text-sm font-medium min-h-[44px]">
            <FiPhone className="w-4 h-4" />
            8 (800) 000-00-00
          </a>
          <Link
            to="/contacts"
          >
            <Button>
              Запросить КП
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px]"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        title="Меню"
        side="right"
      >
        <div className="flex flex-col space-y-4">
          {/* Каталог accordion */}
          <div className="border-b border-border pb-4">
            <button
              className="flex items-center justify-between w-full py-3 text-left font-semibold min-h-[44px]"
              onClick={() => setCatalogAccordionOpen(!catalogAccordionOpen)}
            >
              Каталог
              <span className={`transform transition-transform ${catalogAccordionOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {catalogAccordionOpen && (
              <div className="space-y-2 mt-2">
                {CATEGORIES.map((category) => (
                  <a
                    key={category.slug}
                    href={`/catalog/${category.slug}`}
                    className="block py-2 px-3 rounded-lg hover:bg-muted/50 min-h-[44px] flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.title}</div>
                      <div className="text-xs text-muted-foreground">{category.count} позиций</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Other nav links */}
          <a href="/services" className="py-3 font-semibold min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>Услуги</a>
          <a href="/delivery" className="py-3 font-semibold min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>Доставка</a>
          <a href="/price" className="py-3 font-semibold min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>Прайс</a>
          <a href="/about" className="py-3 font-semibold min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>О компании</a>
          <a href="/contacts" className="py-3 font-semibold min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>Контакты</a>

          {/* Contact button */}
          <Button className="w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
            Запросить КП
          </Button>
        </div>
      </Drawer>
    </header>
  )
}

function CatalogMegaMenu() {
  return (
    <div className="relative group">
      <button className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1 min-h-[44px]">
        Каталог
      </button>

      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="w-[900px] p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl">
          <div className="grid grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="p-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <div className="font-bold">{category.title}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{category.count} позиций</div>
                  </div>
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] pl-10">
                  {category.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
