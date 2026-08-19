import {motion} from 'framer-motion'
import { Button } from '../../shared/ui/Button'
import heroImage from '../../assets/hero.png'

interface HeroProps {
  onOpenRequestForm?: () => void
}

export function Hero({ onOpenRequestForm }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"/>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q25,45 50,50 T100,50"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M0,55 Q25,50 50,55 T100,55"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-20 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{opacity: 0, x: -40}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
          >
            {/* Badge */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.2}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--muted))] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"/>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                Отгрузка в течение 48 часов
              </span>
            </motion.div>

            {/* H1 */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight text-[hsl(var(--foreground))] max-w-2xl">
              Надёжный поставщик материалов для{' '}
              <span className="bg-accent-gradient bg-clip-text text-transparent">
                железнодорожного строительства
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-xl">
              Рельсы, шпалы, крепёж и башмаки с собственных складов.
              Поставки от 1 тонны с полным пакетом документов по России и СНГ.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                variant="primary"
                className="text-base px-8"
                onClick={() => window.location.href = '/catalog'}
              >
                Перейти в каталог
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>

              <Button
                onClick={onOpenRequestForm}
                size="lg"
                variant="outline"
                className="text-base px-8"
              >
                Отправить заявку
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-[hsl(var(--border))]">
              {[
                {value: '16+', label: 'лет на рынке'},
                {value: '5000+', label: 'партнёров'},
                {value: '48ч', label: 'отгрузка'},
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl md:text-3xl font-black bg-accent-gradient bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
