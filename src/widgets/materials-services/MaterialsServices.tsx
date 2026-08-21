import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SERVICES } from '../../entities/service/model/mocks'

// Показываем только первые 2 услуги
const VISIBLE_SERVICES = SERVICES.slice(0, 2)

export function MaterialsServices() {
  return (
    <section className="py-20 bg-[hsl(var(--muted))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black mb-12 text-[hsl(var(--foreground))]"
        >
          Материалы и услуги
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {VISIBLE_SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="aspect-square"
            >
              <Link
                to={`/services/${service.slug}`}
                className="group relative h-full w-full rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary))] hover:shadow-2xl hover:shadow-[hsl(var(--primary))/0.15] transition-all duration-500 ease-out"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--card))] to-[hsl(var(--muted))] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))/0.1] to-[hsl(var(--primary))/0.05] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl md:text-5xl">{service.icon}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[hsl(var(--border))] flex items-center justify-center group-hover:border-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Title and description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {service.description}
                    </p>
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
