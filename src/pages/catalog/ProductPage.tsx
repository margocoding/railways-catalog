import { useState } from 'react'
import { Link, useParams } from 'react-router'
import {
  FiFileText,
  FiSettings,
  FiShoppingCart,
  FiTruck,
} from 'react-icons/fi'

import { products } from '../../entities/product/model/mockData'
import { ProductCard } from '../../entities/product/ui/ProductCard'
import { useCart } from '../../entities/cart/model/use-cart'
import {
  formatPrice,
  getCategoryName,
  getConditionBadgeColor,
  getConditionLabel,
  getProductBreadcrumbs,
  getSubcategoryName,
} from '../../shared/lib/catalog-helpers'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Layout } from '../../widgets/Layout'
import { RequestFormModal } from '../../shared/ui/RequestFormModal'

export function ProductPage() {
  const {
    categorySlug,
    subcategorySlug,
    productSlug,
  } = useParams<{
    categorySlug: string
    subcategorySlug: string
    productSlug: string
  }>()

  const [railType, setRailType] = useState('Р-65')
  const [railLength, setRailLength] = useState('12.5')
  const [requestFormOpen, setRequestFormOpen] = useState(false)

  const { addToCart } = useCart()

  const product = products.find(
    (item) =>
      item.slug === productSlug &&
      item.categorySlug === categorySlug &&
      item.subcategorySlug === subcategorySlug,
  )

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground">
            Товар не найден
          </h1>
        </div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const breadcrumbs = getProductBreadcrumbs(product)

  const similarProducts = products
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug &&
        item.subcategorySlug === product.subcategorySlug &&
        item.id !== product.id,
    )
    .slice(0, 4)

  const isRail = product.categorySlug === 'rails'

  const weightPerMeter = product.weight
  const totalWeight = weightPerMeter * Number(railLength)
  const tons = totalWeight / 1000

  return (
    <Layout>
      <RequestFormModal
        open={requestFormOpen}
        onOpenChange={setRequestFormOpen}
      />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* =========================================================
            PRODUCT
        ========================================================= */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* =======================================================
              LEFT — IMAGE
          ======================================================= */}
          <div>
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={
                  product.images[0] ||
                  '/placeholders/product.svg'
                }
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-transparent bg-muted transition-colors hover:border-primary"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =======================================================
              RIGHT — PRODUCT INFO
          ======================================================= */}
          <div>
            {/* Status + SKU */}
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-md border px-2 py-1 text-xs font-medium ${getConditionBadgeColor(
                  product.condition,
                )}`}
              >
                {getConditionLabel(product.condition)}
              </span>

              <span className="text-sm text-muted-foreground">
                Артикул: {product.sku}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              {product.title}
            </h1>

            {/* GOST */}
            {product.gost && (
              <p className="mb-5 text-sm text-muted-foreground">
                {product.gost}
              </p>
            )}

            {/* Price */}
            <div className="mb-5">
              {product.priceOnRequest ? (
                <span className="text-2xl font-bold text-primary">
                  По запросу
                </span>
              ) : (
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-3xl font-bold text-primary">
                    от {formatPrice(product.price)} ₽
                  </span>

                  <span className="text-sm text-muted-foreground">
                    за тонну
                  </span>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6 rounded-lg bg-muted p-4">
              <div className="mb-1 text-sm text-muted-foreground">
                Наличие
              </div>

              <div className="font-bold text-foreground">
                {product.stock > 100
                  ? '✓ В наличии, отгрузка 1-3 дня'
                  : product.stock > 0
                    ? `✓ Остаток: ${product.stock} шт`
                    : 'Под заказ, срок 7-14 дней'}
              </div>
            </div>

            {/* =====================================================
                SPECIFICATIONS
            ===================================================== */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FiSettings className="h-5 w-5 text-primary" />

                <h2 className="text-xl font-bold text-foreground">
                  Характеристики
                </h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
                {product.specs &&
                  Object.entries(product.specs).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-6 border-b border-border px-4 py-3 last:border-b-0"
                      >
                        <span className="text-sm text-muted-foreground">
                          {key}
                        </span>

                        <span className="text-right text-sm font-medium text-foreground">
                          {value}
                        </span>
                      </div>
                    ),
                  )}

                <div className="flex items-center justify-between gap-6 border-b border-border px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Масса 1 пог.м
                  </span>

                  <span className="text-right text-sm font-medium text-foreground">
                    {product.weight} кг
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6 border-b border-border px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Длина
                  </span>

                  <span className="text-right text-sm font-medium text-foreground">
                    {product.length} м
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6 border-b border-border px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Категория
                  </span>

                  <span className="text-right text-sm font-medium text-foreground">
                    {getCategoryName(product.categorySlug)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6 px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Подкатегория
                  </span>

                  <span className="text-right text-sm font-medium text-foreground">
                    {getSubcategoryName(product.subcategorySlug)}
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================
                CTA
            ===================================================== */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Main CTA */}
              <button
                type="button"
                onClick={() => setRequestFormOpen(true)}
                className="flex-1 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90"
              >
                Отправить заявку или запрос
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FiShoppingCart className="h-5 w-5" />

                <span>В корзину</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            DESCRIPTION
        ========================================================= */}
        <section className="mb-12 border-t border-border pt-10">
          <div className="mb-5 flex items-center gap-2">
            <FiFileText className="h-5 w-5 text-primary" />

            <h2 className="text-2xl font-bold text-foreground">
              Описание
            </h2>
          </div>

          <div className="max-w-4xl text-base leading-7 text-muted-foreground">
            <p className="mb-4">
              {product.description ||
                `${product.title} — высококачественная продукция, соответствующая всем требованиям ГОСТ и техническим условиям. Изделие прошло обязательную сертификацию и готово к отгрузке.`}
            </p>

            <p className="mb-4">
              Наша компания осуществляет поставку данной
              продукции по всей России и странам СНГ. Возможны
              различные условия оплаты и гибкая система скидок
              для постоянных клиентов.
            </p>

            <p>
              Для получения детальной информации о технических
              характеристиках, условиях доставки и актуальных
              ценах свяжитесь с нашими менеджерами или запросите
              коммерческое предложение.
            </p>
          </div>
        </section>

        {/* =========================================================
            DELIVERY
        ========================================================= */}
        <section className="mb-12 border-t border-border pt-10">
          <div className="mb-5 flex items-center gap-2">
            <FiTruck className="h-5 w-5 text-primary" />

            <h2 className="text-2xl font-bold text-foreground">
              Доставка
            </h2>
          </div>

          <div className="max-w-4xl text-base leading-7 text-muted-foreground">
            <p className="mb-4">
              Осуществляем доставку всеми видами транспорта:
              ж/д, автомобильным, смешанным. Отгрузка со склада
              в течение 1-3 дней при наличии на складе.
            </p>

            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>
                Самовывоз со склада в Екатеринбурге
              </li>

              <li>
                Доставка ж/д транспортом для крупных партий
              </li>

              <li>
                Автомобильная доставка по России
              </li>

              <li>
                Возможна упаковка и консервация груза
              </li>
            </ul>

            <Link
              to="/delivery"
              className="inline-block font-medium text-primary hover:underline"
            >
              Подробнее о доставке →
            </Link>
          </div>
        </section>

        {/* =========================================================
            RAIL CALCULATOR
        ========================================================= */}
        {isRail && (
          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-5 text-xl font-bold text-foreground">
              Калькулятор массы рельса
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Rail type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Тип рельса
                </label>

                <select
                  value={railType}
                  onChange={(event) =>
                    setRailType(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Р-65">
                    Р-65 (64.72 кг/м)
                  </option>

                  <option value="Р-50">
                    Р-50 (51.67 кг/м)
                  </option>

                  <option value="КР-70">
                    КР-70 (крановый)
                  </option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Длина, м
                </label>

                <input
                  type="number"
                  value={railLength}
                  onChange={(event) =>
                    setRailLength(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Result */}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Итого
                </label>

                <div className="rounded-lg bg-muted px-3 py-2 font-bold text-foreground">
                  {totalWeight.toFixed(1)} кг (
                  {tons.toFixed(3)} т)
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            SIMILAR PRODUCTS
        ========================================================= */}
        {similarProducts.length > 0 && (
          <section className="border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Похожие товары
            </h2>

            <div className="space-y-3">
              {similarProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}