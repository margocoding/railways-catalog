import { motion } from 'framer-motion'
import { sections } from '../../entities/product/model/mockData'
import { useState } from 'react'

export function Hero() {
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Darkened thematic background image placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for thematic railway image - replace src with actual image */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60"></div>
        </div>
      </div>

      {/* Decorative rails pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,45 50,50 T100,50" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,55 Q25,50 50,55 T100,55" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,60 Q25,55 50,60 T100,60" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-10 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Categories Sidebar - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <nav className="sticky top-20 space-y-1">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`/catalog/${section.slug}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block px-4 py-3 rounded-lg font-medium transition-colors hover:bg-white/10 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                      {getSectionIcon(section.id)}
                    </span>
                    <span className="text-white group-hover:text-[hsl(var(--primary))] transition-colors">
                      {section.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </nav>
          </motion.aside>

          {/* Mobile Categories Button - Visible only on mobile */}
          <div className="lg:hidden w-full">
            <button
              onClick={() => setMobileCategoriesOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20"
            >
              <span className="font-medium text-white">Категории</span>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--muted))] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"></span>
                <span className="text-sm font-medium">Отгрузка в течение 48 часов</span>
              </motion.div>

              {/* H1 - Reduced size and moved right */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight text-white max-w-2xl">
                Материалы ВСП для железных дорог{' '}
                <span className="bg-accent-gradient bg-clip-text text-white">
                  России и СНГ
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-[hsl(var(--muted-foreground))] mb-6 max-w-xl text-gray-300">
                Рельсы, шпалы, крепёж и башмаки с собственных складов. Поставки от 1 тонны с полным пакетом документов.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <a 
                  href="/catalog" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/30] hover:shadow-[hsl(var(--primary))/50] transition-all hover:scale-105 text-base md:text-lg"
                >
                  Открыть каталог
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/price" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/30] hover:shadow-[hsl(var(--primary))/50] transition-all hover:scale-105 text-base md:text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Скачать прайс
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-6 border-t border-[hsl(var(--border))]">
                {[
                  { value: '16+', label: 'лет на рынке' },
                  { value: '5000+', label: 'партнёров' },
                  { value: '48ч', label: 'отгрузка' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-black bg-accent-gradient bg-clip-text text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      {mobileCategoriesOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileCategoriesOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[hsl(var(--card))] shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Категории</h2>
              <button
                onClick={() => setMobileCategoriesOpen(false)}
                className="p-2 hover:bg-[hsl(var(--muted))] rounded-lg"
                aria-label="Закрыть меню"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`/catalog/${section.slug}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                  onClick={() => setMobileCategoriesOpen(false)}
                >
                  <span className="text-xl">{getSectionIcon(section.id)}</span>
                  <span className="font-medium text-white">{section.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </section>
  )
}

function getSectionIcon(sectionId: string): string {
  const icons: Record<string, string> = {
    rails: '🛤️',
    sleepers: '🟫',
    fasteners: '🔩',
    shoes: '👞',
    buffers: '🛑',
    metal: '📐',
    tools: '🔨',
  }
  return icons[sectionId] || '📦'
}
