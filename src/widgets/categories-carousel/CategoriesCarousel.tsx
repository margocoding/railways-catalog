import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { categories } from '../../entities/product/model/mockData'
import { getCategoryIcon } from '@/shared/lib'
import { CarouselArrows } from '@/shared/ui/CarouselArrows'

export function CategoriesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateButtons = useCallback(() => {
    if (!emblaApi) return

    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    updateButtons()

    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi, updateButtons])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <section className="bg-background py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight text-foreground md:text-4xl"
          >
            Каталог продукции
          </motion.h2>

          <CarouselArrows
            onPrev={scrollPrev}
            onNext={scrollNext}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
          />
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-3 flex">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="min-w-0 flex-[0_0_85%] pl-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
              >
                <motion.a
                  href={`/catalog/${category.slug}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                  }}
                  className="group relative flex h-[190px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  {/* Decorative background */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-muted/60 transition-transform duration-500 group-hover:scale-125" />

                  {/* Icon */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xl">
                    {getCategoryIcon(category.id)}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                        {category.name}
                      </h3>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </motion.a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}