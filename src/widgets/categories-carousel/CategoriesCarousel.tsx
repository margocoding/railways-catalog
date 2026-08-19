import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { categories } from '../../entities/product/model/mockData'
import { CarouselArrows } from '@/shared/ui/CarouselArrows'
import { FiArrowUpRight } from 'react-icons/fi'

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
            className="
              text-3xl
              font-black
              tracking-tight
              text-foreground
              md:text-4xl
            "
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
                className="
                  min-w-0
                  flex-[0_0_75%]
                  pl-3
                  sm:flex-[0_0_45%]
                  md:flex-[0_0_30%]
                  lg:flex-[0_0_20%]
                "
              >
                <motion.a
                  href={`/catalog/${category.slug}`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                  }}
                  className="
                    group
                    relative
                    block
                    aspect-3/4
                    overflow-hidden
                    rounded-3xl
                  "
                >
                  {/* Blurred image background */}
                  <div
                    className="
                      absolute
                      -inset-6.25
                      scale-110
                      bg-cover
                      bg-center
                      blur-2xl
                      transition-transform
                      duration-700
                      group-hover:scale-125
                    "
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  />

                  {/* Dark gradient */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/70
                      via-black/30
                      to-black/10
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      right-3
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/80
                      p-4
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      group-hover:bg-white
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className="
                          text-base
                          font-bold
                          leading-tight
                          text-foreground
                        "
                      >
                        {category.name}
                      </h3>
                        <span
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-muted
                            text-muted-foreground
                            transition-all
                            duration-300
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          <FiArrowUpRight
                            className="
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />
                        </span>
                    </div>
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