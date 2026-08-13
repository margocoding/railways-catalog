import { motion } from 'framer-motion'
import { GEOGRAPHY } from '../../entities/geography/model/mocks'

export function GeographyMap() {
  return (
    <section className="py-20 bg-[hsl(var(--card))]" style={{ background: 'var(--hero-gradient)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">ГЕОГРАФИЯ ПОСТАВОК</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Работаем по всей России и СНГ</p>
        </motion.div>

        {/* SVG Map placeholder */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-[2/1] rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 overflow-hidden">
            {/* Simplified Russia silhouette */}
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              <path 
                d="M50,80 Q80,60 120,70 T200,80 Q250,90 300,70 T380,80 L380,140 Q300,160 200,150 T50,140 Z" 
                fill="hsl(var(--muted)/30)" 
                stroke="hsl(var(--primary)/30)" 
                strokeWidth="2"
              />
              {/* City dots */}
              {[
                { cx: 80, cy: 100 },
                { cx: 120, cy: 90 },
                { cx: 180, cy: 85 },
                { cx: 240, cy: 80 },
                { cx: 300, cy: 90 },
                { cx: 340, cy: 100 },
              ].map((dot, i) => (
                <motion.circle
                  key={i}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="4"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="cursor-pointer hover:r-6 transition-all"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Cities list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {GEOGRAPHY.map((city, i) => (
            <motion.div
              key={city.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-lg bg-[hsl(var(--card))]/50 border border-[hsl(var(--border))] text-center"
            >
              <div className="font-medium text-sm">{city.city}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{city.delivery}</div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-xl bg-[hsl(var(--card))]/30 border border-[hsl(var(--border))] text-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            📍 Отгружаем более 5 000 тонн продукции ежемесячно в 85 регионов России
          </p>
        </motion.div>
      </div>
    </section>
  )
}
