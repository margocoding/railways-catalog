import { motion } from 'framer-motion'
import { FiMenu, FiSearch, FiPhone, FiX } from 'react-icons/fi'
import { CATEGORIES } from '../../entities/category/model/types'

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[hsl(var(--background))/80] border-b border-[hsl(var(--border))]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
          <button className="p-2 hover:bg-[hsl(var(--muted))] rounded-lg transition-colors">
            <FiSearch className="w-5 h-5" />
          </button>
          <a href="tel:+78000000000" className="flex items-center gap-2 text-sm font-medium">
            <FiPhone className="w-4 h-4" />
            8 (800) 000-00-00
          </a>
          <a 
            href="/contacts" 
            className="px-4 py-2 bg-accent-gradient rounded-lg font-bold text-sm text-white hover:opacity-90 transition-opacity"
          >
            Запросить КП
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2">
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

function CatalogMegaMenu() {
  return (
    <div className="relative group">
      <button className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
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
                className="p-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
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
