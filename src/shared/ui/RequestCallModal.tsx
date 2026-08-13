import { useState } from 'react'
import { FiPhone } from 'react-icons/fi'
import { Dialog } from './Dialog'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { Button } from './Button'
import { FormField } from './FormField'

interface RequestCallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RequestCallModal({ open, onOpenChange }: RequestCallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки
    console.log('Заявка на звонок:', formData)
    onOpenChange(false)
    setFormData({ name: '', phone: '', comment: '' })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Заказать звонок"
      description="Оставьте свои контакты — мы перезвоним вам в течение 15 минут"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField>
          <Input 
            placeholder="Ваше имя" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormField>
        <FormField>
          <Input 
            type="tel" 
            placeholder="Телефон" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </FormField>
        <FormField>
          <Textarea 
            placeholder="Комментарий (опционально)" 
            rows={3}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
        </FormField>
        <Button type="submit" variant="primary" size="md" className="w-full">
          <FiPhone className="w-4 h-4" />
          Заказать звонок
        </Button>
        <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </Dialog>
  )
}
