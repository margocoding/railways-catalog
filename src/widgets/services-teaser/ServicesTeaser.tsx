import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SERVICES } from '../../entities/service/model/mocks'

export function ServicesTeaser() {
  // Берём только первые 2 услуги для главной страницы
  const displayedServices = SERVICES.slice(0, 2)

  return (
    <section className="py-20 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">УСЛУГИ</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Не только поставка, но и обработка</p>
        </motion.div>

        {/* Services Grid - 2 large square cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {displayedServices.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group relative block aspect-square rounded-2xl border border-[hsl(var(--border))] bg-card-gradient overflow-hidden hover:border-[hsl(var(--primary))/50] transition-all duration-300"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
                  {/* Icon */}
                  <div className="text-5xl sm:text-6xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Title and description */}
                  <div className="space-y-3">
                    <h3 className="font-black text-xl sm:text-2xl md:text-3xl leading-tight group-hover:text-[hsl(var(--primary))] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[hsl(var(--muted-foreground))] line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Подробнее
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
          >
            Все услуги →
          </Link>
        </div>
      </div>
    </section>
  )
}
