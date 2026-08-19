import { motion } from 'framer-motion'
import { useState } from 'react'
import { categories } from '../../entities/product/model/mockData'
import { getCategoryIcon } from '@/shared/lib'

export function Hero() {
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)

  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

        {/* Soft bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      {/* Decorative rails pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]">
        <svg
          className="h-full w-full"
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
          <path
            d="M0,60 Q25,55 50,60 T100,60"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* Categories Sidebar - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden w-56 flex-shrink-0 lg:block"
          >
            <nav className="space-y-1">
              {categories.map((category, index) => (
                <motion.a
                  key={category.id}
                  href={`/catalog?category=${category.slug}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group block rounded-lg px-4 py-2.5 font-medium transition-colors hover:bg-white/80"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-60 transition-opacity group-hover:opacity-100">
                      {getCategoryIcon(category.id)}
                    </span>

                    <span className="text-sm text-foreground transition-colors group-hover:text-primary">
                      {category.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </nav>
          </motion.aside>

          {/* Mobile Categories Button */}
          <div className="w-full lg:hidden">
            <button
              onClick={() => setMobileCategoriesOpen(true)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm"
            >
              <span className="font-medium text-foreground">
                Категории
              </span>

              <svg
                className="h-5 w-5 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:pt-2">
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
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

                <span className="text-sm font-medium text-foreground">
                  Отгрузка в течение 48 часов
                </span>
              </motion.div>

              {/* H1 */}
              <h1 className="mb-4 max-w-2xl text-2xl font-black leading-tight text-foreground md:text-3xl lg:text-4xl">
                Материалы ВСП для железных дорог{' '}
                <span className="text-primary">
                  России и СНГ
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mb-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Рельсы, шпалы, крепёж и башмаки с собственных складов.
                Поставки от 1 тонны с полным пакетом документов.
              </p>

              {/* CTA */}
              <div className="mb-7 flex flex-wrap gap-3">
                <a
                  href="/catalog"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                >
                  Открыть каталог

                  <svg
                    className="h-5 w-5"
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
                </a>

                <a
                  href="/price"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/90 px-6 py-3 text-base font-bold text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>

                  Скачать прайс
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-5">
                {[
                  { value: '16+', label: 'лет на рынке' },
                  { value: '5000+', label: 'партнёров' },
                  { value: '48ч', label: 'отгрузка' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-primary md:text-3xl">
                      {stat.value}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      {mobileCategoriesOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileCategoriesOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 top-0 w-72 overflow-y-auto bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-bold text-foreground">
                Категории
              </h2>

              <button
                onClick={() => setMobileCategoriesOpen(false)}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                aria-label="Закрыть меню"
              >
                <svg
                  className="h-5 w-5 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="space-y-1 p-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/catalog?category=${category.slug}`}
                  className="flex items-center gap-3 rounded-lg px-4 py-1 transition-colors hover:bg-muted"
                  onClick={() => setMobileCategoriesOpen(false)}
                >
                  <span className="text-xl">
                    {getCategoryIcon(category.id)}
                  </span>

                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </section>
  )
}