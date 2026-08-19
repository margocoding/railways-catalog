import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function VisualBlock() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-[hsl(var(--background))] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-[hsl(var(--border))]"
        >
          {/* Background image with parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1517420837603-a9dc6d15c6fa?auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"/>
          </div>
          
          {/* Content overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Качество, проверенное временем
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Вся продукция сертифицирована и соответствует ГОСТ. 
                Работаем с ведущими производителями России и СНГ.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
