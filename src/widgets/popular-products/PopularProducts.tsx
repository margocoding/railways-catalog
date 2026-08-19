import { motion } from 'framer-motion'
import { products } from '../../entities/product/model/mockData'
import { Link } from 'react-router'

// Show first 4 popular products
const popularProducts = products.slice(0, 4)

export function PopularProducts() {
  return (
    <section className="py-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black mb-8 text-[hsl(var(--foreground))]"
        >
          Популярные материалы
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/catalog/${product.categorySlug}/${product.subcategorySlug}/product/${product.slug}`}
                className="group block"
              >
                <div className="rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] group-hover:border-[hsl(var(--primary))/50] transition-all">
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--background))] flex items-center justify-center">
                    <span className="text-4xl">🛤️</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-base text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    {product.gost && (
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        {product.gost}
                      </p>
                    )}
                    {product.weight && (
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        Масса: {product.weight} кг/м
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
