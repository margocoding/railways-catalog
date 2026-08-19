import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

import { products } from '../../entities/product/model/mockData'
import { CarouselArrows } from '@/shared/ui/CarouselArrows'
import { getSpecValue } from '@/shared/lib'

const popularProducts = products.slice(0, 10)

export function PopularProducts() {
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
            Популярные материалы
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
          <div className="-ml-4 flex">
            {popularProducts.map((product, index) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.35,
                  }}
                >
                  <Link
                    to={`/catalog/${product.categorySlug}/${product.subcategorySlug}/product/${product.slug}`}
                    className="group block"
                  >
                    <article className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                      {/* Image */}
                      <div className="relative aspect-4/3 overflow-hidden bg-muted">
                        {/* TODO: заменить на реальное изображение товара */}
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-background">
                          <img src={product.images[0]} alt={product.title}/>
                        </div>

                        {/* Arrow */}
                        <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/95 text-foreground shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
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

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {product.title}
                        </h3>

                        {product.gost && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {product.gost}
                          </p>
                        )}

                        {getSpecValue(product, 'weight') && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Масса: {getSpecValue(product, 'weight')}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}