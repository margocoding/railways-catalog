import type { Product, Section, Category } from './types'

export const sections: Section[] = [
  { id: 'rails', name: 'Рельсы', slug: 'rails' },
  { id: 'sleepers', name: 'Шпалы и плиты', slug: 'sleepers' },
  { id: 'fasteners', name: 'Крепёж', slug: 'fasteners' },
  { id: 'shoes', name: 'Башмаки', slug: 'shoes' },
  { id: 'buffers', name: 'Упоры тупиковые', slug: 'buffers' },
  { id: 'metal', name: 'Металлоизделия', slug: 'metal' },
  { id: 'tools', name: 'Путевой инструмент', slug: 'tools' },
]

export const categories: Category[] = [
  // Рельсы
  { id: 'rails-new', name: 'Рельсы новые', sectionId: 'rails', slug: 'new' },
  { id: 'rails-used', name: 'Рельсы б/у', sectionId: 'rails', slug: 'used' },
  { id: 'rails-parts', name: 'Части рельсов', sectionId: 'rails', slug: 'parts' },
  
  // Шпалы
  { id: 'sleepers-wood', name: 'Шпалы деревянные', sectionId: 'sleepers', slug: 'wood' },
  { id: 'sleepers-concrete', name: 'Шпалы железобетонные', sectionId: 'sleepers', slug: 'concrete' },
  { id: 'sleepers-plates', name: 'Плиты подрельсовые', sectionId: 'sleepers', slug: 'plates' },
  
  // Крепёж
  { id: 'fasteners-bolts', name: 'Болты', sectionId: 'fasteners', slug: 'bolts' },
  { id: 'fasteners-nuts', name: 'Гайки', sectionId: 'fasteners', slug: 'nuts' },
  { id: 'fasteners-clamps', name: 'Скрепления', sectionId: 'fasteners', slug: 'clamps' },
  
  // Башмаки
  { id: 'shoes-brake', name: 'Башмаки тормозные', sectionId: 'shoes', slug: 'brake' },
  { id: 'shoes-rail', name: 'Башмаки подкладочные', sectionId: 'shoes', slug: 'rail' },
  
  // Упоры
  { id: 'buffers-concrete', name: 'Упоры бетонные', sectionId: 'buffers', slug: 'concrete' },
  { id: 'buffers-metal', name: 'Упоры металлические', sectionId: 'buffers', slug: 'metal' },
  
  // Металлоизделия
  { id: 'metal-sheets', name: 'Листы', sectionId: 'metal', slug: 'sheets' },
  { id: 'metal-bars', name: 'Прутки', sectionId: 'metal', slug: 'bars' },
  { id: 'metal-pipes', name: 'Трубы', sectionId: 'metal', slug: 'pipes' },
  
  // Инструмент
  { id: 'tools-manual', name: 'Ручной инструмент', sectionId: 'tools', slug: 'manual' },
  { id: 'tools-mechanized', name: 'Механизированный', sectionId: 'tools', slug: 'mechanized' },
]

export const products: Product[] = [
  // Рельсы новые
  {
    id: 'rel-r65-n',
    sku: 'REL-R65-N',
    title: 'Рельс Р-65 новый',
    gost: 'ГОСТ Р 51685-2022',
    weight: 64.72,
    length: 12.5,
    price: 68500,
    stock: 150,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'rails-new',
    sectionId: 'rails',
    description: 'Рельс железнодорожный новый типа Р-65 для главных путей.',
    specs: {
      'Тип': 'Р-65',
      'Длина': '12.5 м',
      'Масса 1 пог.м': '64.72 кг',
      'Сталь': 'Э76ХФ',
    },
  },
  {
    id: 'rel-r50-n',
    sku: 'REL-R50-N',
    title: 'Рельс Р-50 новый',
    gost: 'ГОСТ Р 51685-2022',
    weight: 51.67,
    length: 12.5,
    price: 52000,
    stock: 200,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'rails-new',
    sectionId: 'rails',
    description: 'Рельс железнодорожный новый типа Р-50 для промышленных путей.',
    specs: {
      'Тип': 'Р-50',
      'Длина': '12.5 м',
      'Масса 1 пог.м': '51.67 кг',
      'Сталь': 'Э76ХФ',
    },
  },
  {
    id: 'rel-r65-n-25m',
    sku: 'REL-R65-N-25',
    title: 'Рельс Р-65 новый 25м',
    gost: 'ГОСТ Р 51685-2022',
    weight: 64.72,
    length: 25,
    price: 137000,
    stock: 80,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp', '/test-product.webp'],
    categoryId: 'rails-new',
    sectionId: 'rails',
    description: 'Рельс железнодорожный новый типа Р-65 длиной 25 метров.',
  },
  
  // Рельсы б/у
  {
    id: 'rel-r65-u',
    sku: 'REL-R65-U',
    title: 'Рельс Р-65 б/у',
    gost: 'ГОСТ Р 51685-2022',
    weight: 64.72,
    length: 12.5,
    price: 35000,
    stock: 300,
    condition: 'used',
    images: ['/test-product.webp'],
    categoryId: 'rails-used',
    sectionId: 'rails',
    description: 'Рельс железнодорожный б/у типа Р-65 после ревизии.',
  },
  {
    id: 'rel-r50-u',
    sku: 'REL-R50-U',
    title: 'Рельс Р-50 б/у',
    gost: 'ГОСТ Р 51685-2022',
    weight: 51.67,
    length: 12.5,
    price: 28000,
    stock: 400,
    condition: 'used',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'rails-used',
    sectionId: 'rails',
    description: 'Рельс железнодорожный б/у типа Р-50 для подъездных путей.',
  },
  
  // Части рельсов
  {
    id: 'rel-cut',
    sku: 'REL-CUT',
    title: 'Рельс резаный',
    gost: 'ГОСТ Р 51685-2022',
    weight: 64.72,
    length: 1,
    price: 5500,
    stock: 1000,
    condition: 'service',
    images: ['/test-product.webp'],
    categoryId: 'rails-parts',
    sectionId: 'rails',
    description: 'Рельс резаный любой длины под заказ.',
  },
  
  // Шпалы деревянные
  {
    id: 'sleeper-wood-1',
    sku: 'SLP-WD-1',
    title: 'Шпала деревянная тип 1',
    gost: 'ГОСТ 78-2011',
    weight: 70,
    length: 2.75,
    price: 1200,
    stock: 5000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'sleepers-wood',
    sectionId: 'sleepers',
    description: 'Шпала деревянная пропитанная тип 1.',
  },
  {
    id: 'sleeper-wood-2',
    sku: 'SLP-WD-2',
    title: 'Шпала деревянная тип 2',
    gost: 'ГОСТ 78-2011',
    weight: 65,
    length: 2.75,
    price: 950,
    stock: 7000,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'sleepers-wood',
    sectionId: 'sleepers',
    description: 'Шпала деревянная пропитанная тип 2.',
  },
  
  // Шпалы железобетонные
  {
    id: 'sleeper-conc-sh1',
    sku: 'SLP-CN-SH1',
    title: 'Шпала Ш-1',
    gost: 'ГОСТ 19291-2019',
    weight: 270,
    length: 2.7,
    price: 4500,
    stock: 2000,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp', '/test-product.webp'],
    categoryId: 'sleepers-concrete',
    sectionId: 'sleepers',
    description: 'Шпала железобетонная Ш-1 для бесстыкового пути.',
  },
  
  // Плиты подрельсовые
  {
    id: 'plate-rc65',
    sku: 'PLT-RC65',
    title: 'Плита подрельсовая RC65',
    gost: 'ТУ 0941-001-44659632-2018',
    weight: 12,
    length: 0.5,
    price: 2800,
    stock: 10000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'sleepers-plates',
    sectionId: 'sleepers',
    description: 'Плита подрельсовая полимеркомпозитная RC65.',
  },
  
  // Болты
  {
    id: 'bolt-track',
    sku: 'BLT-TRK',
    title: 'Болт путевой М24',
    gost: 'ГОСТ 11530-93',
    weight: 0.45,
    length: 0.14,
    price: 180,
    stock: 50000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'fasteners-bolts',
    sectionId: 'fasteners',
    description: 'Болт рельсового скрепления М24.',
  },
  {
    id: 'bolt-fish',
    sku: 'BLT-FSH',
    title: 'Болт стыковой М27',
    gost: 'ГОСТ 11530-93',
    weight: 0.62,
    length: 0.16,
    price: 250,
    stock: 30000,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'fasteners-bolts',
    sectionId: 'fasteners',
    description: 'Болт стыковой высокопрочный М27.',
  },
  
  // Гайки
  {
    id: 'nut-m24',
    sku: 'NUT-M24',
    title: 'Гайка М24',
    gost: 'ГОСТ 5915-70',
    weight: 0.08,
    length: 0.02,
    price: 45,
    stock: 100000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'fasteners-nuts',
    sectionId: 'fasteners',
    description: 'Гайка шестигранная М24 оцинкованная.',
  },
  
  // Скрепления
  {
    id: 'clamp-kb',
    sku: 'CLP-KB',
    title: 'Скрепление КБ',
    gost: 'ГОСТ 19646-90',
    weight: 2.5,
    length: 0.3,
    price: 850,
    stock: 20000,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'fasteners-clamps',
    sectionId: 'fasteners',
    description: 'Скрепление раздельное промежуточное КБ.',
  },
  
  // Башмаки тормозные
  {
    id: 'shoe-brake-cast',
    sku: 'SHO-BR-C',
    title: 'Башмак тормозной чугунный',
    gost: 'ГОСТ 1101-93',
    weight: 38,
    length: 0.4,
    price: 4500,
    stock: 5000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'shoes-brake',
    sectionId: 'shoes',
    description: 'Башмак тормозной литой чугунный для грузовых вагонов.',
  },
  {
    id: 'shoe-brake-comp',
    sku: 'SHO-BR-P',
    title: 'Башмак тормозной композитный',
    gost: 'ГОСТ Р 55093-2012',
    weight: 22,
    length: 0.4,
    price: 8900,
    stock: 3000,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp', '/test-product.webp'],
    categoryId: 'shoes-brake',
    sectionId: 'shoes',
    description: 'Башмак тормозной композиционный износостойкий.',
  },
  
  // Башмаки подкладочные
  {
    id: 'shoe-rail-pad',
    sku: 'SHO-PAD',
    title: 'Подкладка КП',
    gost: 'ГОСТ 19646-90',
    weight: 4.2,
    length: 0.25,
    price: 650,
    stock: 40000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'shoes-rail',
    sectionId: 'shoes',
    description: 'Подкладка подрельсовая КП для деревянных шпал.',
  },
  
  // Упоры бетонные
  {
    id: 'buffer-conc',
    sku: 'BUF-CN',
    title: 'Упор тупиковый бетонный',
    gost: 'ТУ 0941-002-44659632-2019',
    weight: 1500,
    length: 1.5,
    price: 45000,
    stock: 100,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'buffers-concrete',
    sectionId: 'buffers',
    description: 'Упор тупиковый монолитный бетонный.',
  },
  
  // Упоры металлические
  {
    id: 'buffer-metal',
    sku: 'BUF-MT',
    title: 'Упор тупиковый металлический',
    gost: 'ТУ 0941-003-44659632-2020',
    weight: 800,
    length: 2.0,
    price: 85000,
    stock: 50,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'buffers-metal',
    sectionId: 'buffers',
    description: 'Упор тупиковый сварной металлический с амортизатором.',
  },
  
  // Листы
  {
    id: 'sheet-steel-10',
    sku: 'SHT-ST-10',
    title: 'Лист стальной 10мм',
    gost: 'ГОСТ 19903-2015',
    weight: 78.5,
    length: 2,
    price: 12000,
    stock: 500,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'metal-sheets',
    sectionId: 'metal',
    description: 'Лист горячекатаный стальной толщиной 10мм.',
  },
  
  // Прутки
  {
    id: 'bar-steel-20',
    sku: 'BAR-ST-20',
    title: 'Пруток стальной Ø20',
    gost: 'ГОСТ 2590-2006',
    weight: 2.47,
    length: 6,
    price: 4500,
    stock: 1000,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'metal-bars',
    sectionId: 'metal',
    description: 'Пруток круглый стальной диаметром 20мм.',
  },
  
  // Трубы
  {
    id: 'pipe-steel-50',
    sku: 'PIP-ST-50',
    title: 'Труба стальная Ø50',
    gost: 'ГОСТ 3262-75',
    weight: 5.5,
    length: 6,
    price: 8500,
    stock: 800,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'metal-pipes',
    sectionId: 'metal',
    description: 'Труба водогазопроводная Ø50мм.',
  },
  
  // Ручной инструмент
  {
    id: 'tool-hammer',
    sku: 'TL-HAM',
    title: 'Молоток путевой',
    gost: 'ТУ 12-06-39-2016',
    weight: 1.5,
    length: 0.35,
    price: 2500,
    stock: 200,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'tools-manual',
    sectionId: 'tools',
    description: 'Молоток путевой специальный.',
  },
  {
    id: 'tool-wrench',
    sku: 'TL-WRN',
    title: 'Ключ путевой',
    gost: 'ТУ 12-06-40-2016',
    weight: 3.2,
    length: 0.6,
    price: 4500,
    stock: 150,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp'],
    categoryId: 'tools-manual',
    sectionId: 'tools',
    description: 'Ключ путевой универсальный.',
  },
  
  // Механизированный инструмент
  {
    id: 'tool-drill',
    sku: 'TL-DRL',
    title: 'Сверлильная машина БМ-2А',
    gost: 'ТУ 12-06-41-2017',
    weight: 28,
    length: 0.8,
    price: 125000,
    stock: 20,
    condition: 'new',
    images: ['/test-product.webp', '/test-product.webp', '/test-product.webp'],
    categoryId: 'tools-mechanized',
    sectionId: 'tools',
    description: 'Машина сверлильная бензиновая для рельсов.',
  },
  {
    id: 'tool-grinder',
    sku: 'TL-GRN',
    title: 'Шлифмашина угловая',
    gost: 'ТУ 12-06-42-2017',
    weight: 12,
    length: 0.5,
    price: 85000,
    stock: 30,
    condition: 'new',
    images: ['/test-product.webp'],
    categoryId: 'tools-mechanized',
    sectionId: 'tools',
    description: 'Машина шлифовальная бензиновая.',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId)
}

export function getProductsBySection(sectionId: string): Product[] {
  return products.filter(p => p.sectionId === sectionId)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.gost.toLowerCase().includes(q)
  )
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id)
}

export function getCategoriesBySection(sectionId: string): Category[] {
  return categories.filter(c => c.sectionId === sectionId)
}

export function getSectionById(id: string): Section | undefined {
  return sections.find(s => s.id === id)
}

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find(s => s.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}