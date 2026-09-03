import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FiArrowRight } from 'react-icons/fi'

import { CarouselArrows } from '@/shared/ui/CarouselArrows'
import { getSpecValue } from '@/shared/lib'
import { usePopularProducts } from '../model/use-popular-products'
import { getImageUrl } from '@/shared/lib/product-helpers'

export function PopularProducts() {
  const { products, loading } = usePopularProducts()

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

  if (!products.length) return;

  return (
    <section className="bg-background py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
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

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-4 flex">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <div className="aspect-4/3 animate-pulse rounded-xl bg-muted" />
                  <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              ))
              : products.map((product, index) => (
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
                        <div className="relative aspect-4/3 overflow-hidden bg-muted">
                          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-background">
                            {product.images[0] ? (
                              <img
                                src={getImageUrl(product.images[0])}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                Нет изображения
                              </div>
                            )}
                          </div>

                          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/95 text-foreground shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>

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
                              Масса: {getSpecValue(product, 'Масса')}
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