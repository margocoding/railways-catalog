import { useState } from 'react'
import { FiMenu, FiSearch, FiPhone, FiChevronRight } from 'react-icons/fi'
import { CATEGORIES, SUBCATEGORIES } from '../../entities/category/model/types'
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)

  return (
    <div 
      className="relative group"
      onMouseLeave={() => {
        setActiveCategory(null)
        setActiveSubCategory(null)
      }}
    >
      <button 
        className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1 min-h-[44px]"
        onMouseEnter={() => setActiveCategory('main')}
      >
        Каталог
      </button>

      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="w-[900px] p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl">
          <div className="grid grid-cols-4 gap-4">
            {/* Left column - Main Categories */}
            <div className="col-span-1 border-r border-[hsl(var(--border))] pr-4">
              {CATEGORIES.map((category) => {
                const hasSubcategories = SUBCATEGORIES[category.slug]?.length > 0
                return (
                  <div
                    key={category.slug}
                    className={`relative group/category mb-1`}
                    onMouseEnter={() => setActiveCategory(category.slug)}
                  >
                    <a
                      href={`/catalog/${category.slug}`}
                      className={`w-full text-left p-2 rounded-lg transition-colors flex items-center justify-between gap-2 min-h-[44px] ${
                        activeCategory === category.slug 
                          ? 'bg-[hsl(var(--primary))] text-white' 
                          : 'hover:bg-[hsl(var(--muted))]'
                      }`}
                    >
                      <span className="text-sm font-medium truncate">{category.title}</span>
                      {hasSubcategories && (
                        <FiChevronRight className="w-4 h-4 flex-shrink-0" />
                      )}
                    </a>
                    
                    {/* Subcategories panel - appears to the right */}
                    {hasSubcategories && activeCategory === category.slug && (
                      <div className="absolute left-full top-0 ml-1 w-56 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-xl p-2">
                        {SUBCATEGORIES[category.slug].map((sub) => {
                          const hasBrands = (sub.brands?.length ?? 0) > 0
                          return (
                            <div
                              key={sub.slug}
                              className="relative group/subcategory"
                              onMouseEnter={() => setActiveSubCategory(sub.slug)}
                            >
                              <a
                                href={`/catalog/${category.slug}/${sub.slug}`}
                                className={`w-full text-left p-2 rounded-lg transition-colors text-sm flex items-center justify-between gap-2 min-h-[40px] ${
                                  activeSubCategory === sub.slug
                                    ? 'bg-[hsl(var(--primary))] text-white'
                                    : 'hover:bg-[hsl(var(--muted))]'
                                }`}
                              >
                                <span>{sub.title}</span>
                                {hasBrands && (
                                  <FiChevronRight className="w-3 h-3 flex-shrink-0" />
                                )}
                              </a>
                              
                              {/* Brands panel - appears further to the right */}
                              {hasBrands && activeSubCategory === sub.slug && (
                                <div className="absolute left-full top-0 ml-1 w-48 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-xl p-2">
                                  {sub.brands?.map((brand) => (
                                    <a
                                      key={brand.slug}
                                      href={`/catalog/${category.slug}/${sub.slug}/${brand.slug}`}
                                      className="block p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-sm min-h-[40px]"
                                    >
                                      {brand.title}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Right area - Category details when selected */}
            <div className="col-span-3 pl-4">
              {activeCategory && activeCategory !== 'main' && (
                <div>
                  {(() => {
                    const category = CATEGORIES.find(c => c.slug === activeCategory)
                    if (!category) return null
                    return (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{category.icon}</span>
                          <div>
                            <h3 className="text-lg font-bold">{category.title}</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">{category.description}</p>
                          </div>
                        </div>
                        {SUBCATEGORIES[activeCategory] && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-[hsl(var(--muted-foreground))]">Подкатегории:</h4>
                            <div className="flex flex-wrap gap-2">
                              {SUBCATEGORIES[activeCategory].map((sub) => (
                                <a
                                  key={sub.slug}
                                  href={`/catalog/${activeCategory}/${sub.slug}`}
                                  className="px-3 py-1.5 bg-[hsl(var(--muted))] rounded-full text-sm hover:bg-[hsl(var(--primary))] hover:text-white transition-colors"
                                >
                                  {sub.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )}
              {!activeCategory || activeCategory === 'main' ? (
                <div className="flex items-center justify-center h-full text-[hsl(var(--muted-foreground))]">
                  <div className="text-center">
                    <p className="text-sm">Выберите категорию для просмотра подкатегорий</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
