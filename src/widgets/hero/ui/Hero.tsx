import { Link } from 'react-router'
import { FiArrowRight, FiFileText } from 'react-icons/fi'
import { HomeCategoriesSidebar } from '@/widgets/home-categories-sidebar/HomeCategoriesSidebar'

export function Hero() {
  return (
    <section className="hero-section relative flex min-h-[560px] items-center overflow-hidden bg-foreground text-white lg:min-h-[680px]">
      <div
        className="hero-photo absolute inset-0 bg-cover bg-center bg-[url('/hero_background.png')]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-[#1C1F22]/95 via-[#1C1F22]/80 to-[#1C1F22]/25"
        aria-hidden="true"
      />
      <div className="container relative mx-auto grid gap-6 px-6 py-6 lg:min-h-[680px] lg:grid-cols-[264px_minmax(0,1fr)] lg:items-center lg:gap-10 lg:py-8 xl:gap-12 xl:px-8">
        <HomeCategoriesSidebar />
        <div className="hero-copy min-w-0 lg:self-center">
          <p className="hero-enter mb-5 text-sm font-bold tracking-[.05em] text-white/85">
            ИНВИА · МАТЕРИАЛЫ ВСП
          </p>
          <h1 className="hero-title hero-enter hero-delay-1">
            Материалы верхнего строения пути со склада в Татарстане
          </h1>
          <p className="hero-enter hero-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Рельсы, шпалы, накладки и скрепления. Новые и б/у. Поставки по
            Поволжью, России и СНГ.
          </p>
          <div className="hero-enter hero-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3 font-bold text-accent-foreground transition-colors hover:bg-[#E85E14]"
            >
              Открыть каталог
              <FiArrowRight />
            </Link>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent('open-request-form'))
              }
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/70 px-6 py-3 font-bold transition-colors hover:bg-white/10"
            >
              <FiFileText />
              Запросить спецификацию
            </button>
          </div>
          <dl className="hero-enter hero-delay-3 mt-10 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/25 pt-7 md:gap-10">
            {[
              ['16+', 'лет на рынке'],
              ['5000+', 'партнёров'],
              ['48ч', 'отгрузка'],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col">
                <dt className="mt-2 text-xs text-white/85 sm:text-sm">
                  {label}
                </dt>
                <dd className="-order-1 text-[30px] font-bold leading-none text-accent [font-variant-numeric:tabular-nums] sm:text-5xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
