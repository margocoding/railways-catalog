import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SERVICES } from '../../entities/service/model/mocks'

export function MaterialsServices() {
  return (
    <section className="py-16 bg-[hsl(var(--muted))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black mb-8 text-[hsl(var(--foreground))]"
        >
          Материалы и услуги
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group block h-64 rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary))/50] transition-all"
              >
                <div className="h-full flex">
                  {/* Image side */}
                  <div className="w-1/2 h-full bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--background))] flex items-center justify-center">
                    <span className="text-6xl">{service.icon}</span>
                  </div>
                  
                  {/* Content side */}
                  <div className="w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="font-bold text-xl text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))]">
                      Подробнее
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
