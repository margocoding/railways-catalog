import { motion } from 'framer-motion'
import { subcategories } from '../../entities/product/model/mockData'

// Filter fastener subcategories
const fastenerSubcategories = subcategories.filter(sub => sub.categoryId === 'fasteners')

export function FastenersSection() {
  return (
    <section className="py-16 bg-[hsl(var(--muted))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black mb-8 text-[hsl(var(--foreground))]"
        >
          Крепёжные элементы
        </motion.h2>

        {/* Horizontal scrollable carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {fastenerSubcategories.map((subcat, index) => (
              <motion.a
                key={subcat.id}
                href={`/catalog/${subcat.categorySlug}/${subcat.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-48 sm:w-56 snap-start group"
              >
                <div className="h-40 rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] group-hover:border-[hsl(var(--primary))/50] transition-all">
                  <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--background))] flex items-center justify-center">
                    <span className="text-4xl">🔩</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-base text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                    {subcat.name}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
