import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '../../widgets/Layout'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { ProductCard } from '../../entities/product/ui/ProductCard'
import { products, categories } from '../../entities/product/model/mockData'
import type { Product } from '../../entities/product/model/types'
import { getProductBreadcrumbs, formatPrice, getConditionBadgeColor, getConditionLabel } from '../../shared/lib/catalog-helpers'
import { FiShoppingCart, FiPlus, FiTruck, FiFileText, FiSettings } from 'react-icons/fi'

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'delivery'>('specs')
  const [railType, setRailType] = useState('Р-65')
  const [railLength, setRailLength] = useState('12.5')

  const product = products.find(p => p.id === slug || p.sku === slug)

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Товар не найден</h1>
        </div>
      </Layout>
    )
  }

  const breadcrumbs = getProductBreadcrumbs(product)
  
  // Similar products
  const similarProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  // Weight calculator for rails
  const isRail = product.sectionId === 'rails'
  const weightPerMeter = product.weight
  const totalWeight = weightPerMeter * Number(railLength)
  const tons = totalWeight / 1000

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] bg-[hsl(var(--muted))] rounded-xl overflow-hidden mb-4">
              <img 
                src={product.images[0] || '/placeholders/product.svg'} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  className="w-20 h-20 rounded-lg bg-[hsl(var(--muted))] overflow-hidden border-2 border-transparent hover:border-[hsl(var(--primary))]"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getConditionBadgeColor(product.condition)}`}>
                {getConditionLabel(product.condition)}
              </span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Артикул: {product.sku}</span>
            </div>

            <h1 className="text-3xl font-black mb-4">{product.title}</h1>

            {product.gost && (
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{product.gost}</p>
            )}

            {/* Price */}
            <div className="mb-4">
              {product.priceOnRequest ? (
                <span className="text-2xl font-bold text-[hsl(var(--accent))]">По запросу</span>
              ) : (
                <div>
                  <span className="text-3xl font-bold text-[hsl(var(--accent))]">от {formatPrice(product.price)} ₽</span>
                  <span className="text-sm text-[hsl(var(--muted-foreground))] ml-2">за тонну</span>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6 p-4 bg-[hsl(var(--muted))] rounded-lg">
              <div className="text-sm text-[hsl(var(--muted-foreground))]">Наличие</div>
              <div className="font-bold">
                {product.stock > 100 ? '✓ В наличии, отгрузка 1-3 дня' : 
                 product.stock > 0 ? `✓ Остаток: ${product.stock} шт` : 
                 'Под заказ, срок 7-14 дней'}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="flex-1 py-3 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Запросить КП
              </button>
              <button className="flex-1 py-3 bg-[hsl(var(--muted))] rounded-lg font-bold hover:bg-[hsl(var(--muted))]/80 transition-colors flex items-center justify-center gap-2">
                <FiPlus className="w-5 h-5" />
                В спецификацию
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-[hsl(var(--border))] mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'specs' 
                  ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' 
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              <FiSettings className="inline w-4 h-4 mr-2" />
              Характеристики
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'description' 
                  ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' 
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              <FiFileText className="inline w-4 h-4 mr-2" />
              Описание
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'delivery' 
                  ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' 
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              <FiTruck className="inline w-4 h-4 mr-2" />
              Доставка
            </button>
          </div>

          {/* Tab content */}
          <div className="min-h-[200px]">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                    <span className="text-[hsl(var(--muted-foreground))]">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">Масса 1 пог.м</span>
                  <span className="font-medium">{product.weight} кг</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">Длина</span>
                  <span className="font-medium">{product.length} м</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">Категория</span>
                  <span className="font-medium">
                    {categories.find(c => c.id === product.categoryId)?.name || '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  {product.description || `${product.title} — высококачественная продукция, соответствующая всем требованиям ГОСТ и техническим условиям. Изделие прошло обязательную сертификацию и готово к отгрузке.`}
                </p>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Наша компания осуществляет поставку данной продукции по всей России и странам СНГ. Возможны различные условия оплаты и гибкая система скидок для постоянных клиентов.
                </p>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Для получения детальной информации о технических характеристиках, условиях доставки и актуальных ценах свяжитесь с нашими менеджерами или запросите коммерческое предложение.
                </p>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Осуществляем доставку всеми видами транспорта: ж/д, автомобильным, смешанным. 
                  Отгрузка со склада в течение 1-3 дней при наличии на складе.
                </p>
                <ul className="list-disc list-inside text-[hsl(var(--muted-foreground))] space-y-2">
                  <li>Самовывоз со склада в Екатеринбурге</li>
                  <li>Доставка ж/д транспортом (для крупных партий)</li>
                  <li>Автомобильная доставка по России</li>
                  <li>Возможна упаковка и консервация груза</li>
                </ul>
                <Link to="/delivery" className="text-[hsl(var(--primary))] hover:underline mt-4 inline-block">
                  Подробнее о доставке →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Weight Calculator (for rails only) */}
        {isRail && (
          <div className="mb-12 p-6 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))]">
            <h3 className="text-xl font-bold mb-4">Калькулятор массы рельса</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Тип рельса</label>
                <select
                  value={railType}
                  onChange={(e) => setRailType(e.target.value)}
                  className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] outline-none"
                >
                  <option value="Р-65">Р-65 (64.72 кг/м)</option>
                  <option value="Р-50">Р-50 (51.67 кг/м)</option>
                  <option value="КР-70">КР-70 (крановый)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Длина, м</label>
                <input
                  type="number"
                  value={railLength}
                  onChange={(e) => setRailLength(e.target.value)}
                  className="w-full px-3 py-2 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[hsl(var(--muted-foreground))] mb-1 block">Итого</label>
                <div className="px-3 py-2 bg-[hsl(var(--muted))] rounded-lg font-bold">
                  {totalWeight.toFixed(1)} кг ({tons.toFixed(3)} т)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Похожие товары</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
