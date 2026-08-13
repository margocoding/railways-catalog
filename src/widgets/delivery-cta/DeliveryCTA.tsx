import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { FormField } from '../../shared/ui/FormField'
import { Card, CardContent } from '../../shared/ui/Card'

export function DeliveryCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card >
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Рассчитать стоимость доставки</h2>
                <p className="text-muted-foreground mb-6">
                  Заполните форму — менеджер свяжется с вами в течение 30 минут с точным расчётом стоимости и сроков доставки
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Бесплатный расчёт логистики
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Оптимальный маршрут под ваш объект
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Полное сопровождение до получения груза
                  </li>
                </ul>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Откуда">
                    <Input placeholder="Город отправления" size="lg" />
                  </FormField>
                  <FormField label="Куда">
                    <Input placeholder="Город назначения" size="lg" />
                  </FormField>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Тип груза">
                    <select className="w-full h-14 px-6 rounded-lg border border-border bg-muted/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-base">
                      <option>Рельсы</option>
                      <option>Шпалы</option>
                      <option>Крепёж</option>
                      <option>Накладки</option>
                      <option>Другое</option>
                    </select>
                  </FormField>
                  <FormField label="Объём (тонн)">
                    <Input type="number" placeholder="Например: 20" size="lg" inputMode="numeric" />
                  </FormField>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Имя">
                    <Input placeholder="Ваше имя" size="lg" />
                  </FormField>
                  <FormField label="Телефон">
                    <Input type="tel" placeholder="+7 (___) ___-__-__" size="lg" inputMode="tel" />
                  </FormField>
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Рассчитать стоимость
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
