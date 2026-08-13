export interface GeographyPoint {
  city: string
  delivery: string
}

export const GEOGRAPHY: GeographyPoint[] = [
  { city: 'Москва', delivery: 'Рельсы Р-65 и крепёж' },
  { city: 'Санкт-Петербург', delivery: 'Рельс Р-24' },
  { city: 'Самара', delivery: 'Шпала ж/б Ш-1' },
  { city: 'Казань', delivery: 'Рельс Р-65 б/у' },
  { city: 'Волгоград', delivery: 'Рельсы Р-65' },
  { city: 'Екатеринбург', delivery: 'Башмаки тормозные' },
]
