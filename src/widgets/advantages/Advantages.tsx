import { motion } from 'framer-motion'
import { FiClock, FiTruck, FiAward, FiUsers } from 'react-icons/fi'
import { ADVANTAGES } from '../../entities/advantage/model/mocks'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: FiClock,
  truck: FiTruck,
  award: FiAward,
  users: FiUsers,
}

export function Advantages() {
  return (
    <section className="py-20 bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ADVANTAGES.map((item, i) => {
            const Icon = iconMap[item.icon] || FiClock
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-[hsl(var(--border))] bg-card-gradient text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-gradient flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
