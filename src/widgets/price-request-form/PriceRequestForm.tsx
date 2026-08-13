import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { FormField } from '../../shared/ui/FormField'
import { Card, CardContent } from '../../shared/ui/Card'

export function PriceRequestForm() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card variant="muted">
          <CardContent className="p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Получить полный прайс-лист</h2>
              <p className="text-muted-foreground text-center mb-6">
                Заполните форму — отправим актуальный прайс со всеми позициями и условиями поставки
              </p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Имя">
                    <Input placeholder="Ваше имя" size="lg" />
                  </FormField>
                  <FormField label="Телефон">
                    <Input type="tel" placeholder="+7 (___) ___-__-__" size="lg" inputMode="tel" />
                  </FormField>
                </div>
                
                <FormField label="Email">
                  <Input type="email" placeholder="your@email.com" size="lg" inputMode="email" />
                </FormField>
                
                <Button type="submit" size="lg" className="w-full">
                  Получить прайс
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
