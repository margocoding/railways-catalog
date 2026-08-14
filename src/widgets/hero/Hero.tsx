import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Darkened thematic background image placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for thematic railway image - replace src with actual image */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60"></div>
        </div>
      </div>

      {/* Decorative rails pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,45 50,50 T100,50" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,55 Q25,50 50,55 T100,55" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
          <path d="M0,60 Q25,55 50,60 T100,60" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-10 py-20 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--muted))] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"></span>
              <span className="text-sm font-medium">Отгрузка в течение 48 часов</span>
            </motion.div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
              Материалы ВСП для железных дорог{' '}
              <span className="bg-accent-gradient bg-clip-text text-white">
                России и СНГ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-xl text-gray-300">
              Рельсы, шпалы, крепёж и башмаки с собственных складов. Поставки от 1 тонны с полным пакетом документов.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="/catalog" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gradient rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/30] hover:shadow-[hsl(var(--primary))/50] transition-all hover:scale-105 text-lg"
              >
                Открыть каталог
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="/price" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(var(--primary))] rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/30] hover:shadow-[hsl(var(--primary))/50] transition-all hover:scale-105 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Скачать прайс
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-[hsl(var(--border))]">
              {[
                { value: '16+', label: 'лет на рынке' },
                { value: '5000+', label: 'партнёров' },
                { value: '48ч', label: 'отгрузка' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-black bg-accent-gradient bg-clip-text text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
