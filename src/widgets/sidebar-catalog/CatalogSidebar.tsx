import { sections, categories, products } from '../../entities/product/model/mockData'
import type { Section } from '../../entities/product/model/types'

interface CatalogSidebarProps {
  activeSection?: string
  activeCategory?: string
}

export function CatalogSidebar({ activeSection, activeCategory }: CatalogSidebarProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 z-10">
      <nav className="sticky top-20 space-y-1">
        {sections.map((section) => (
          <SidebarSection 
            key={section.id} 
            section={section}
            isActive={activeSection === section.slug}
            activeCategory={activeCategory}
          />
        ))}
      </nav>
    </aside>
  )
}

function SidebarSection({ section, isActive, activeCategory }: { section: Section; isActive: boolean; activeCategory?: string }) {
  const sectionCategories = categories.filter(c => c.sectionId === section.id)
  
  return (
    <div className="relative group z-10">
      {/* Desktop hover menu */}
      <a
        href={`/catalog/${section.slug}`}
        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive 
            ? 'bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))]' 
            : 'hover:bg-[hsl(var(--muted))]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{section.name}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {sectionCategories.reduce((acc, cat) => acc + getProductsCount(cat.id), 0)}
          </span>
        </div>
      </a>
      
      {/* Subcategories - Desktop dropdown on hover */}
      <div className="hidden lg:block absolute left-full top-0 ml-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-xl overflow-hidden">
          {sectionCategories.map((category) => {
            const subCategories = categories.filter(c => c.parentId === category.id)
            const isCategoryActive = activeCategory === category.slug
            return (
              <div key={category.id}>
                <a
                  href={`/catalog/${section.slug}/${category.slug}`}
                  className={`block px-4 py-3 transition-colors ${
                    isCategoryActive 
                      ? 'bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))]' 
                      : 'hover:bg-[hsl(var(--muted))]'
                  }`}
                >
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">
                    {getProductsCount(category.id)} позиций
                  </div>
                </a>
                {subCategories.length > 0 && (
                  <div className="border-t border-[hsl(var(--border))]">
                    {subCategories.map((sub) => (
                      <a
                        key={sub.id}
                        href={`/catalog/${section.slug}/${category.slug}/${sub.slug}`}
                        className="block px-4 py-2 pl-8 text-sm hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--muted-foreground))]"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Mobile accordion */}
      <div className="lg:hidden">
        <details className="group/details">
          <summary className="px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] cursor-pointer list-none">
            {sectionCategories.length} категорий
          </summary>
          <div className="px-4 pb-2 space-y-1">
            {sectionCategories.map((category) => (
              <a
                key={category.id}
                href={`/catalog/${section.slug}/${category.slug}`}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </details>
      </div>
    </div>
  )
}

function getProductsCount(categoryId: string): number {
  return products.filter(p => p.categoryId === categoryId).length
}
