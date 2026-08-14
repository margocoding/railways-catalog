import { motion } from 'framer-motion'

// Extended categories list as per requirements
const CATEGORIES_LIST = [
  { slug: '/catalog/fasteners', name: 'Комплекты скреплений', icon: '🔩' },
  { slug: '/catalog/rails', name: 'Рельсы железнодорожные', icon: '🛤️' },
  { slug: '/catalog/rails#crane', name: 'Рельсы крановые', icon: '🏗️' },
  { slug: '/catalog/rails#narrow', name: 'Рельсы узкоколейные', icon: '🚂' },
  { slug: '/catalog/sleepers#concrete', name: 'Шпалы железобетонные', icon: '🟫' },
  { slug: '/catalog/switches', name: 'Стрелочные переводы', icon: '➡️' },
  { slug: '/catalog/switches-parts', name: 'Детали стрелочных переводов', icon: '🔧' },
  { slug: '/catalog/fasteners', name: 'Крепёж (болты, гайки, шайбы)', icon: '⚙️' },
  { slug: '/catalog/crane-fasteners', name: 'Крановый крепёж', icon: '🔩' },
  { slug: '/catalog/shoes', name: 'Башмаки', icon: '👞' },
  { slug: '/catalog/buffers', name: 'Тупиковые упоры', icon: '🛑' },
  { slug: '/catalog/tools', name: 'Путевой инструмент', icon: '🔨' },
  { slug: '/catalog/metal', name: 'Металлоизделия по чертежам', icon: '📐' },
  { slug: '/catalog/signaling', name: 'Ж/Д автоматика / СЦБ', icon: '🚦' },
  { slug: '/services', name: 'Услуги', icon: '🛠️' },
]

export function HomeCategoriesSidebar() {
  return (
    <section className="py-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-3">КАТАЛОГ ПРОДУКЦИИ</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Выберите нужную категорию</p>
        </motion.div>

        {/* Categories List */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
            <ul className="space-y-2">
              {CATEGORIES_LIST.map((cat, i) => (
                <motion.li
                  key={cat.slug}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <a
                    href={cat.slug}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-all group"
                  >
                    <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                    <span className="font-medium flex-grow group-hover:text-[hsl(var(--primary))] transition-colors">
                      {cat.name}
                    </span>
                    <svg 
                      className="w-5 h-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] group-hover:translate-x-1 transition-all flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] text-center">
              <a
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              >
                Весь каталог →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
