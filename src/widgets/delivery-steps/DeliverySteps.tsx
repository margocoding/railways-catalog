import { Card, CardContent } from '../../shared/ui/Card'

export function DeliverySteps() {
  const steps = [
    {
      number: '01',
      title: 'Заявка и уточнение объёма',
      description: 'Оставляете заявку на сайте или по телефону, уточняем детали и объём партии',
    },
    {
      number: '02',
      title: 'Расчёт логистики и сроков',
      description: 'Рассчитываем оптимальный маршрут, стоимость и сроки доставки',
    },
    {
      number: '03',
      title: 'Отгрузка со склада (48 часов)',
      description: 'Комплектуем заказ и отгружаем со склада в течение 48 часов',
    },
    {
      number: '04',
      title: 'Доставка на объект + пакет документов',
      description: 'Доставляем груз на объект, передаём полный пакет сопроводительных документов',
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Как происходит доставка</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <Card key={step.number} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-black text-primary/20 mb-2">{step.number}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
