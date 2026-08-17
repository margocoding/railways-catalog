import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SERVICES } from '../../entities/service/model/mocks'

export function ServicesTeaser() {
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

        {/* Services List - Vertical layout instead of grid */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="block p-6 rounded-xl border border-[hsl(var(--border))] bg-card-gradient hover:border-[hsl(var(--primary))/50] transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="text-4xl flex-shrink-0">{service.icon}</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{service.description}</p>
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))] flex items-center gap-1 flex-shrink-0">
                    Подробнее
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
