import { useState } from 'react'
import { Link, useParams } from 'react-router'
import {
  FiFileText,
  FiPlus,
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

  const [activeTab, setActiveTab] = useState<
      'specs' | 'description' | 'delivery'
  >('specs')

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
            <h1 className="text-3xl font-bold">Товар не найден</h1>
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
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 aspect-4/3 overflow-hidden rounded-xl bg-[hsl(var(--muted))]">
                <img
                    src={
                        product.images[0] ||
                        '/placeholders/product.svg'
                    }
                    alt={product.title}
                    className="h-full w-full object-cover"
                />
              </div>

              <div className="flex gap-2">
                {product.images.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        className="h-20 w-20 overflow-hidden rounded-lg border-2 border-transparent bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]"
                    >
                      <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                      />
                    </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-3">
              <span
                  className={`rounded-md border px-2 py-1 text-xs font-medium ${getConditionBadgeColor(
                      product.condition,
                  )}`}
              >
                {getConditionLabel(product.condition)}
              </span>

                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Артикул: {product.sku}
              </span>
              </div>

              <h1 className="mb-4 text-3xl font-black">
                {product.title}
              </h1>

              {product.gost && (
                  <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
                    {product.gost}
                  </p>
              )}

              <div className="mb-4">
                {product.priceOnRequest ? (
                    <span className="text-2xl font-bold text-[hsl(var(--accent))]">
                  По запросу
                </span>
                ) : (
                    <div>
                  <span className="text-3xl font-bold text-[hsl(var(--accent))]">
                    от {formatPrice(product.price)} ₽
                  </span>

                      <span className="ml-2 text-sm text-[hsl(var(--muted-foreground))]">
                    за тонну
                  </span>
                    </div>
                )}
              </div>

              <div className="mb-6 rounded-lg bg-[hsl(var(--muted))] p-4">
                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                  Наличие
                </div>

                <div className="font-bold">
                  {product.stock > 100
                      ? '✓ В наличии, отгрузка 1-3 дня'
                      : product.stock > 0
                          ? `✓ Остаток: ${product.stock} шт`
                          : 'Под заказ, срок 7-14 дней'}
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 rounded-lg bg-accent-gradient py-3 font-bold text-white transition-opacity hover:opacity-90"
                >
                <span className="flex items-center justify-center gap-2">
                  <FiShoppingCart className="h-5 w-5" />
                  Добавить в корзину
                </span>
                </button>

                <button
                    type="button"
                    onClick={() => setRequestFormOpen(true)}
                    className="flex-1 rounded-lg bg-[hsl(var(--muted))] py-3 font-bold transition-colors hover:bg-[hsl(var(--muted))]/80"
                >
                <span className="flex items-center justify-center gap-2">
                  <FiPlus className="h-5 w-5" />
                  Отправить заявку или запрос
                </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-6 flex gap-4 border-b border-[hsl(var(--border))]">
              <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 font-medium transition-colors ${
                      activeTab === 'specs'
                          ? 'border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
              >
                <FiSettings className="mr-2 inline h-4 w-4" />
                Характеристики
              </button>

              <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 font-medium transition-colors ${
                      activeTab === 'description'
                          ? 'border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
              >
                <FiFileText className="mr-2 inline h-4 w-4" />
                Описание
              </button>

              <button
                  type="button"
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-3 font-medium transition-colors ${
                      activeTab === 'delivery'
                          ? 'border-b-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
              >
                <FiTruck className="mr-2 inline h-4 w-4" />
                Доставка
              </button>
            </div>

            <div className="min-h-50">
              {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {product.specs &&
                        Object.entries(product.specs).map(
                            ([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between border-b border-[hsl(var(--border))] py-2"
                                >
                        <span className="text-[hsl(var(--muted-foreground))]">
                          {key}
                        </span>

                                  <span className="font-medium">
                          {value}
                        </span>
                                </div>
                            ),
                        )}

                    <div className="flex justify-between border-b border-[hsl(var(--border))] py-2">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Масса 1 пог.м
                  </span>

                      <span className="font-medium">
                    {product.weight} кг
                  </span>
                    </div>

                    <div className="flex justify-between border-b border-[hsl(var(--border))] py-2">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Длина
                  </span>

                      <span className="font-medium">
                    {product.length} м
                  </span>
                    </div>

                    <div className="flex justify-between border-b border-[hsl(var(--border))] py-2">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Категория
                  </span>

                      <span className="font-medium">
                    {getCategoryName(product.categorySlug)}
                  </span>
                    </div>

                    <div className="flex justify-between border-b border-[hsl(var(--border))] py-2">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Подкатегория
                  </span>

                      <span className="font-medium">
                    {getSubcategoryName(product.subcategorySlug)}
                  </span>
                    </div>
                  </div>
              )}

              {activeTab === 'description' && (
                  <div className="prose prose-invert max-w-none">
                    <p className="mb-4 text-[hsl(var(--muted-foreground))]">
                      {product.description ||
                          `${product.title} — высококачественная продукция, соответствующая всем требованиям ГОСТ и техническим условиям. Изделие прошло обязательную сертификацию и готово к отгрузке.`}
                    </p>

                    <p className="mb-4 text-[hsl(var(--muted-foreground))]">
                      Наша компания осуществляет поставку данной
                      продукции по всей России и странам СНГ. Возможны
                      различные условия оплаты и гибкая система скидок
                      для постоянных клиентов.
                    </p>

                    <p className="text-[hsl(var(--muted-foreground))]">
                      Для получения детальной информации о технических
                      характеристиках, условиях доставки и актуальных
                      ценах свяжитесь с нашими менеджерами или запросите
                      коммерческое предложение.
                    </p>
                  </div>
              )}

              {activeTab === 'delivery' && (
                  <div>
                    <p className="mb-4 text-[hsl(var(--muted-foreground))]">
                      Осуществляем доставку всеми видами транспорта:
                      ж/д, автомобильным, смешанным. Отгрузка со склада
                      в течение 1-3 дней при наличии на складе.
                    </p>

                    <ul className="list-inside list-disc space-y-2 text-[hsl(var(--muted-foreground))]">
                      <li>Самовывоз со склада в Екатеринбурге</li>
                      <li>
                        Доставка ж/д транспортом (для крупных партий)
                      </li>
                      <li>Автомобильная доставка по России</li>
                      <li>Возможна упаковка и консервация груза</li>
                    </ul>

                    <Link
                        to="/delivery"
                        className="mt-4 inline-block text-[hsl(var(--primary))] hover:underline"
                    >
                      Подробнее о доставке →
                    </Link>
                  </div>
              )}
            </div>
          </div>

          {isRail && (
              <div className="mb-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <h3 className="mb-4 text-xl font-bold">
                  Калькулятор массы рельса
                </h3>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs text-[hsl(var(--muted-foreground))]">
                      Тип рельса
                    </label>

                    <select
                        value={railType}
                        onChange={(event) =>
                            setRailType(event.target.value)
                        }
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2 outline-none"
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

                  <div>
                    <label className="mb-1 block text-xs text-[hsl(var(--muted-foreground))]">
                      Длина, м
                    </label>

                    <input
                        type="number"
                        value={railLength}
                        onChange={(event) =>
                            setRailLength(event.target.value)
                        }
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[hsl(var(--muted-foreground))]">
                      Итого
                    </label>

                    <div className="rounded-lg bg-[hsl(var(--muted))] px-3 py-2 font-bold">
                      {totalWeight.toFixed(1)} кг ({tons.toFixed(3)} т)
                    </div>
                  </div>
                </div>
              </div>
          )}

          {similarProducts.length > 0 && (
              <div>
                <h3 className="mb-6 text-xl font-bold">
                  Похожие товары
                </h3>

                <div className="space-y-4">
                  {similarProducts.map((item) => (
                      <ProductCard
                          key={item.id}
                          product={item}
                      />
                  ))}
                </div>
              </div>
          )}
        </div>

        <RequestFormModal open={requestFormOpen} onOpenChange={setRequestFormOpen}/>
      </Layout>
  )
}