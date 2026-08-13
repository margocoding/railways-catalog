import { motion } from 'framer-motion'
import { CATEGORIES } from '../../entities/category/model/types'

export function CategoryGrid() {
  return (
    <section className="py-20 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">КАТАЛОГ ПРОДУКЦИИ</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Всё для верхнего строения пути</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <a
                href={`/catalog/${cat.slug}`}
                className="block p-6 rounded-xl border border-[hsl(var(--border))] bg-card-gradient hover:border-[hsl(var(--primary))/50] hover:translate-y-[-4px] transition-all h-full group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                    {cat.count} позиций
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{cat.description}</p>
                <div className="text-sm font-medium text-[hsl(var(--primary))] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Смотреть →
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
          >
            Весь каталог →
          </a>
        </div>
      </div>
    </section>
  )
}
