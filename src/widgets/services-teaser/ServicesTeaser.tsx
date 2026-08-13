import { motion } from 'framer-motion'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a
                href={`/services#${service.slug}`}
                className="block p-6 rounded-xl border border-[hsl(var(--border))] bg-card-gradient hover:border-[hsl(var(--primary))/50] hover:translate-y-[-4px] transition-all h-full group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{service.description}</p>
                <div className="text-sm font-medium text-[hsl(var(--primary))] mt-4 group-hover:gap-2 transition-all">
                  Подробнее →
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/50] transition-all"
          >
            Все услуги →
          </a>
        </div>
      </div>
    </section>
  )
}
