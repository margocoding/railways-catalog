// Main 15 categories for the catalog
export interface Category {
  slug: string
  title: string
  icon: string
  count: number
  description: string
}

export interface SubCategory {
  slug: string
  title: string
  brands?: Brand[]
}

export interface Brand {
  slug: string
  title: string
  variants?: Variant[]
}

export interface Variant {
  slug: string
  title: string
}

export const CATEGORIES: Category[] = [
  { slug: 'rails', title: 'Рельсы', icon: '🛤️', count: 18, description: 'Ж/д, крановые, узкоколейные, старогодные' },
  { slug: 'sleepers-beams', title: 'Шпалы и брус', icon: '🟫', count: 17, description: 'Деревянные, ж/б шпалы, брус' },
  { slug: 'nakladki', title: 'Накладки', icon: '🔩', count: 66, description: 'Рельсовые накладки всех типов' },
  { slug: 'crane-fasteners', title: 'Крепеж крановый', icon: '🔧', count: 24, description: 'Крепеж для крановых путей' },
  { slug: 'vibro-noise', title: 'Виброшумогасители для путей', icon: '🔇', count: 12, description: 'Элементы снижения шума и вибрации' },
  { slug: 'railway-fasteners', title: 'ЖД крепеж', icon: '⚙️', count: 45, description: 'Крепеж для железнодорожных путей' },
  { slug: 'rail-pads', title: 'Подкладки Ж.Д.', icon: '📐', count: 18, description: 'Подрельсовые подкладки' },
  { slug: 'switches', title: 'Стрелочные переводы', icon: '🔀', count: 8, description: 'Стрелочные переводы и комплектующие' },
  { slug: 'transformer-fasteners', title: 'Крепеж для трансформаторных путей', icon: '🔌', count: 10, description: 'Специальный крепеж' },
  { slug: 'buffer-stops', title: 'Тупиковые упоры', icon: '🛑', count: 6, description: 'Упоры для защиты концов путей' },
  { slug: 'track-tools', title: 'Инструмент путевой', icon: '🔨', count: 15, description: 'Ручной и механизированный инструмент' },
  { slug: 'brake-shoes', title: 'Башмаки тормозные', icon: '👞', count: 8, description: 'Тормозные башмаки для вагонов' },
  { slug: 'crossing-mats', title: 'Настилы для ж.д. переездов', icon: '🚧', count: 5, description: 'Резинокордовые настилы' },
  { slug: 'insulation-gaskets', title: 'Изоляция и прокладки', icon: '🧱', count: 20, description: 'Изоляционные материалы' },
  { slug: 'railway-signs', title: 'Знаки железнодорожные', icon: '🪧', count: 12, description: 'Сигнальные и указательные знаки' },
]

// Subcategories with brands for multi-level navigation
export const SUBCATEGORIES: Record<string, SubCategory[]> = {
  rails: [
    { slug: 'narrow-gauge', title: 'Узкоколейные', brands: [{ slug: 'r18', title: 'Р18' }, { slug: 'r24', title: 'Р24' }] },
    { slug: 'standard-gauge', title: 'Ширококолейные', brands: [{ slug: 'r65', title: 'Р65' }, { slug: 'r50', title: 'Р50' }, { slug: 'r43', title: 'Р43' }] },
    { slug: 'tram', title: 'Трамвайные', brands: [{ slug: 't62', title: 'Т62' }, { slug: 'tw1', title: 'TW1' }, { slug: 'tw2', title: 'TW2' }] },
    { slug: 'crane', title: 'Крановые', brands: [{ slug: 'kr70', title: 'КР70' }, { slug: 'kr80', title: 'КР80' }, { slug: 'kr100', title: 'КР100' }, { slug: 'kr120', title: 'КР120' }] },
    { slug: 'contact', title: 'Контактный провод', brands: [{ slug: 'mf85', title: 'МФ85' }, { slug: 'mf100', title: 'МФ100' }] },
  ],
  'sleepers-beams': [
    { slug: 'wooden-sleepers', title: 'Шпалы деревянные', brands: [{ slug: 'type1', title: 'Тип 1' }, { slug: 'type2', title: 'Тип 2' }] },
    { slug: 'concrete-sleepers', title: 'Шпалы железобетонные', brands: [{ slug: 'sh1', title: 'Ш-1' }, { slug: 'shs', title: 'ШС' }] },
    { slug: 'beam', title: 'Брус', brands: [{ slug: 'bridge', title: 'Мостовой' }, { slug: 'switch', title: 'Стрелочный' }] },
  ],
  nakladki: [
    { slug: 'joint-bars', title: 'Стыковые', brands: [{ slug: 'jb-r65', title: 'Для Р65' }, { slug: 'jb-r50', title: 'Для Р50' }] },
    { slug: 'compromise', title: 'Компромиссные', brands: [{ slug: 'cb-r65-r50', title: 'Р65/Р50' }, { slug: 'cb-r50-r43', title: 'Р50/Р43' }] },
  ],
  'crane-fasteners': [
    { slug: 'clips', title: 'Прижимы', brands: [{ slug: 'clip-k', title: 'К' }, { slug: 'clip-kp', title: 'КП' }] },
    { slug: 'bolts', title: 'Болты', brands: [{ slug: 'bolt-m24', title: 'М24' }, { slug: 'bolt-m27', title: 'М27' }] },
  ],
  'vibro-noise': [
    { slug: 'rubber-mats', title: 'Резиновые маты', brands: [{ slug: 'rm-10', title: 'РМ-10' }, { slug: 'rm-15', title: 'РМ-15' }] },
    { slug: 'dampers', title: 'Демпферы', brands: [{ slug: 'd-base', title: 'Базовый' }, { slug: 'd-pro', title: 'Профи' }] },
  ],
  'railway-fasteners': [
    { slug: 'kb-system', title: 'Скрепление КБ', brands: [{ slug: 'kb-standard', title: 'Стандарт' }] },
    { slug: 'bpr-system', title: 'Скрепление БПР', brands: [{ slug: 'bpr-standard', title: 'Стандарт' }] },
    { slug: 'fast-clamps', title: 'Быстрозажимные', brands: [{ slug: 'qc-1', title: 'QC-1' }] },
  ],
  'rail-pads': [
    { slug: 'kp-pads', title: 'Подкладки КП', brands: [{ slug: 'kp65', title: 'КП65' }, { slug: 'kp50', title: 'КП50' }] },
    { slug: 'rb-pads', title: 'Подкладки РБ', brands: [{ slug: 'rb65', title: 'РБ65' }] },
  ],
  switches: [
    { slug: 'main-track', title: 'Для главных путей', brands: [{ slug: 'st-main-1', title: 'Тип 1' }] },
    { slug: 'industrial', title: 'Для промышленных путей', brands: [{ slug: 'st-ind-1', title: 'Тип 1' }] },
  ],
  'transformer-fasteners': [
    { slug: 'tf-clips', title: 'Прижимы', brands: [{ slug: 'tf-clip-1', title: 'Тип 1' }] },
    { slug: 'tf-bolts', title: 'Болты', brands: [{ slug: 'tf-bolt-1', title: 'Тип 1' }] },
  ],
  'buffer-stops': [
    { slug: 'concrete-stops', title: 'Бетонные', brands: [{ slug: 'bs-c-1', title: 'Тип 1' }] },
    { slug: 'metal-stops', title: 'Металлические', brands: [{ slug: 'bs-m-1', title: 'Тип 1' }] },
  ],
  'track-tools': [
    { slug: 'manual-tools', title: 'Ручной', brands: [{ slug: 'hammer', title: 'Молотки' }, { slug: 'wrench', title: 'Ключи' }] },
    { slug: 'power-tools', title: 'Механизированный', brands: [{ slug: 'drill', title: 'Сверлильные' }, { slug: 'grinder', title: 'Шлифовальные' }] },
  ],
  'brake-shoes': [
    { slug: 'cast-shoes', title: 'Чугунные', brands: [{ slug: 'cs-std', title: 'Стандарт' }] },
    { slug: 'composite-shoes', title: 'Композитные', brands: [{ slug: 'comp-std', title: 'Стандарт' }] },
  ],
  'crossing-mats': [
    { slug: 'rubber-mats-crossing', title: 'Резинокордовые', brands: [{ slug: 'rcm-1', title: 'Тип 1' }] },
    { slug: 'polymer-mats', title: 'Полимерные', brands: [{ slug: 'pm-1', title: 'Тип 1' }] },
  ],
  'insulation-gaskets': [
    { slug: 'gaskets', title: 'Прокладки', brands: [{ slug: 'g-std', title: 'Стандарт' }] },
    { slug: 'insulators', title: 'Изоляторы', brands: [{ slug: 'i-std', title: 'Стандарт' }] },
  ],
  'railway-signs': [
    { slug: 'signal-signs', title: 'Сигнальные', brands: [{ slug: 'ss-1', title: 'Тип 1' }] },
    { slug: 'marker-signs', title: 'Указательные', brands: [{ slug: 'ms-1', title: 'Тип 1' }] },
  ],
}

// Variants for products (New, Used, etc.)
export const PRODUCT_VARIANTS: Variant[] = [
  { slug: 'new', title: 'Новые' },
  { slug: 'used', title: 'Б/У' },
  { slug: 'cat1', title: '1 категории' },
  { slug: 'cat2', title: '2 категории' },
]
