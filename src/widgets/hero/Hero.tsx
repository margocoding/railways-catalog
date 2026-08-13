import { motion } from 'framer-motion'
import { sections, products } from '../../entities/product/model/mockData'

// Helper function to count products in a section
function getProductsCount(sectionId: string): number {
  return products.filter(p => p.sectionId === sectionId).length
}

export function Hero() {
  // Get top 4 sections by product count (most popular)
  const topSections = [...sections]
    .map(section => ({
      ...section,
      productCount: getProductsCount(section.id),
    }))
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 4)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
      {/* Decorative rails pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,45 50,50 T100,50" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,55 Q25,50 50,55 T100,55" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,60 Q25,55 50,60 T100,60" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
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

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Материалы ВСП для железных дорог{' '}
              <span className="bg-accent-gradient ">
                России и СНГ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-xl">
              Рельсы, шпалы, крепёж и башмаки с собственных складов. Поставки от 1 тонны с полным пакетом документов.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="/catalog" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/20] hover:shadow-[hsl(var(--primary))/40] transition-all hover:scale-105"
              >
                Открыть каталог
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="/price" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/50] transition-all hover:scale-105"
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
                  <div className="text-2xl md:text-3xl font-black bg-accent-gradient bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right tiles - Top 4 sections by product count */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {topSections.map((section, i) => (
              <motion.a
                key={section.slug}
                href={`/catalog/${section.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: 'hsl(var(--primary))' }}
                className="p-4 rounded-xl border border-[hsl(var(--border))] bg-card-gradient hover:shadow-[hsl(var(--primary))/20] transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/10] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl mb-2">{section.icon || '📦'}</div>
                  <div className="font-bold">{section.name}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{section.description}</div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))] flex items-center gap-1">
                    {section.productCount} позиций →
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
