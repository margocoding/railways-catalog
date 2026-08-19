import { motion } from 'framer-motion'
import { categories } from '../../entities/product/model/mockData'
import { getCategoryIcon } from '@/shared/lib'

export function CategoriesCarousel() {
  return (
    <section className="py-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black mb-8 text-[hsl(var(--foreground))]"
        >
          Каталог продукции
        </motion.h2>

        {/* Horizontal scrollable carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`/catalog/${category.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-64 sm:w-72 snap-start group"
              >
                <div className="h-48 rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] group-hover:border-[hsl(var(--primary))/50] transition-all">
                  <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--background))] flex items-center justify-center">
                    <span className="text-5xl mb-4">{getCategoryIcon(category.id)}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
