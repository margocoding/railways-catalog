import { useMemo, useState } from 'react'
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
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Layout } from '../../widgets/Layout'
import { RequestFormModal } from '../../shared/ui/RequestFormModal'

const specLabels: Record<string, string> = {
  type: 'Тип',
  steel: 'Марка стали',
  material: 'Материал',
  length: 'Длина',
  weight: 'Масса',
  diameter: 'Диаметр',
  thickness: 'Толщина',
  size: 'Размер',
  drive: 'Привод',
}

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

  const [requestFormOpen, setRequestFormOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [railLength, setRailLength] = useState('12.5')

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

  const weightSpec = product.specs?.find(
    (spec) => spec.id === 'weight',
  )

  const lengthSpec = product.specs?.find(
    (spec) => spec.id === 'length',
  )

  const weightPerMeter =
    typeof weightSpec?.value === 'number'
      ? weightSpec.value
      : 0

  const defaultRailLength =
    typeof lengthSpec?.value === 'number'
      ? lengthSpec.value
      : 12.5

  const totalWeight =
    weightPerMeter * Number(railLength || 0)

  const tons = totalWeight / 1000

  const displaySpecs = useMemo(
    () =>
      product.specs?.filter(
        (spec) => spec.id !== 'weight' || spec.unit !== 'кг/м',
      ) ?? [],
    [product.specs],
  )

  const selectedProductImage =
    product.images[selectedImage] ||
    product.images[0] ||
    '/placeholders/product.svg'

  return (
    <Layout>
      <RequestFormModal
        open={requestFormOpen}
        onOpenChange={setRequestFormOpen}
      />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={selectedProductImage}
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
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-primary'
                    }`}
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

          <div>
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

            <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              {product.title}
            </h1>

            {product.gost && (
              <p className="mb-5 text-sm text-muted-foreground">
                {product.gost}
              </p>
            )}

            <div className="mb-5">
              {product.priceOnRequest ? (
                <span className="text-2xl font-bold text-primary">
                  По запросу
                </span>
              ) : (
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    от {formatPrice(product.price)} ₽
                  </span>

                  <span className="text-sm text-muted-foreground">
                    за тонну
                  </span>
                </div>
              )}
            </div>

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

            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FiSettings className="h-5 w-5 text-primary" />

                <h2 className="text-xl font-bold text-foreground">
                  Характеристики
                </h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
                {displaySpecs.map((spec) => (
                  <div
                    key={spec.id}
                    className="flex items-center justify-between gap-6 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {specLabels[spec.id] ?? spec.id}
                    </span>

                    <span className="text-right text-sm font-medium text-foreground">
                      {spec.value}
                      {spec.unit ? ` ${spec.unit}` : ''}
                    </span>
                  </div>
                ))}

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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={() => setRequestFormOpen(true)}
                className="flex-1"
              >
                Отправить заявку или запрос
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleAddToCart}
              >
                <FiShoppingCart className="h-5 w-5" />
                <span>В корзину</span>
              </Button>
            </div>
          </div>
        </div>

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
              <li>Самовывоз со склада в Екатеринбурге</li>
              <li>Доставка ж/д транспортом для крупных партий</li>
              <li>Автомобильная доставка по России</li>
              <li>Возможна упаковка и консервация груза</li>
            </ul>

            <Link
              to="/delivery"
              className="inline-block font-medium text-primary hover:underline"
            >
              Подробнее о доставке →
            </Link>
          </div>
        </section>

        {isRail && (
          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-5 text-xl font-bold text-foreground">
              Калькулятор массы рельса
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Тип рельса
                </label>

                <div className="flex h-11 items-center rounded-lg border border-border bg-muted/50 px-4 text-sm text-foreground">
                  {product.specs?.find(
                    (spec) => spec.id === 'type',
                  )?.value ?? product.title}
                </div>
              </div>

              <div>
                <label
                  htmlFor="rail-length"
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                >
                  Длина, м
                </label>

                <Input
                  id="rail-length"
                  type="number"
                  min="0"
                  step="0.1"
                  value={railLength}
                  onChange={(event) =>
                    setRailLength(event.target.value)
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Итого
                </label>

                <div className="flex h-11 items-center rounded-lg bg-muted px-4 font-bold text-foreground">
                  {totalWeight.toFixed(1)} кг (
                  {tons.toFixed(3)} т)
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Расчёт выполнен исходя из массы{' '}
              {weightPerMeter} кг/м.
              {defaultRailLength
                ? ` Стандартная длина товара: ${defaultRailLength} м.`
                : ''}
            </p>
          </section>
        )}

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