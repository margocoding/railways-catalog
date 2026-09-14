import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { FormField } from '@/shared/ui/FormField'
import { Card, CardContent } from '@/shared/ui/Card'
import { Checkbox } from '@/shared/ui/Checkbox'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import type { CreateRequestDto } from '@/entities/request/model/types'
import { requestApi } from '@/entities/request/api/request.api'
import { FORM_GOAL, metrikaReachGoal } from '@/shared/analytics/metrika'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  policyAccepted: false,
}

export function PriceRequestForm() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.policyAccepted) {
      toast.error('Необходимо согласие с политикой конфиденциальности')
      return
    }

    setIsSubmitting(true)

    try {
      // Отдельного типа заявки «прайс» нет, поэтому назначение пишем в комментарий —
      // так менеджер сразу видит, что отправить в ответ.
      const dto: CreateRequestDto = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        policyAccepted: formData.policyAccepted,
        comment: 'Запрос полного прайс-листа',
      }

      await requestApi.create(dto, { requestFile: null, partnerMapFile: null })

      metrikaReachGoal(FORM_GOAL)
      toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время')
      setFormData(EMPTY_FORM)
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Ошибка при отправке заявки. Попробуйте позже'

      const errors = Array.isArray(message) ? message : [message]
      errors.forEach((error: string) => {
        toast.error(error)
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Имя *">
                    <Input
                      placeholder="Ваше имя"
                      size="lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </FormField>
                  <FormField label="Телефон *">
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData({ ...formData, phone: value })}
                      required
                      disabled={isSubmitting}
                    />
                  </FormField>
                </div>

                <FormField label="Email *">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    size="lg"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </FormField>

                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={formData.policyAccepted}
                    onChange={(e) => setFormData({ ...formData, policyAccepted: e.target.checked })}
                    id="price-policy"
                    required
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="price-policy"
                    className="text-xs text-muted-foreground leading-tight cursor-pointer"
                  >
                    Я согласен с{' '}
                    <a
                      href="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Получить прайс'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
