import { useState, type ChangeEvent, type FormEvent } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import { Dialog } from './Dialog'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { Button } from './Button'
import { FormField } from './FormField'
import { Checkbox } from './Checkbox'

interface RequestFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
}

interface UploadedFile {
  name: string
  file: File
}

export function RequestFormModal({ open, onOpenChange, title = 'Отправить заявку', description = 'Получите консультацию или коммерческое предложение' }: RequestFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: '',
    policyAccepted: false
  })
  
  const [requestFile, setRequestFile] = useState<UploadedFile | null>(null)
  const [partnerMapFile, setPartnerMapFile] = useState<UploadedFile | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'request' | 'partner') => {
    const file = e.target.files?.[0]
    if (file) {
      const uploadedFile: UploadedFile = {
        name: file.name,
        file
      }
      if (type === 'request') {
        setRequestFile(uploadedFile)
      } else {
        setPartnerMapFile(uploadedFile)
      }
    }
  }

  const removeFile = (type: 'request' | 'partner') => {
    if (type === 'request') {
      setRequestFile(null)
    } else {
      setPartnerMapFile(null)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки
    console.log('Заявка:', { ...formData, requestFile, partnerMapFile })
    onOpenChange(false)
    setFormData({ name: '', phone: '', email: '', comment: '', policyAccepted: false })
    setRequestFile(null)
    setPartnerMapFile(null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField>
          <Input 
            placeholder="Имя *" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormField>
        
        <FormField>
          <Input 
            type="tel" 
            placeholder="Телефон *" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </FormField>
        
        <FormField>
          <Input 
            type="email" 
            placeholder="Email *" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </FormField>
        
        <FormField>
          <Textarea 
            placeholder="Комментарий (адрес доставки)" 
            rows={3}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
        </FormField>

        {/* Прикрепление файлов */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'request')}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] cursor-pointer hover:bg-[hsl(var(--muted))]/80 transition-colors">
                <span className="text-sm font-medium">Прикрепить заявку</span>
                <FiUpload className="w-4 h-4" />
              </div>
            </label>
          </div>
          
          {requestFile && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[hsl(var(--primary))/10] text-sm">
              <span className="truncate">{requestFile.name}</span>
              <button
                type="button"
                onClick={() => removeFile('request')}
                className="p-1 hover:bg-[hsl(var(--primary))/20] rounded"
                aria-label="Удалить файл"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'partner')}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] cursor-pointer hover:bg-[hsl(var(--muted))]/80 transition-colors">
                <span className="text-sm font-medium">Прикрепить карту партнёра</span>
                <FiUpload className="w-4 h-4" />
              </div>
            </label>
          </div>
          
          {partnerMapFile && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[hsl(var(--primary))/10] text-sm">
              <span className="truncate">{partnerMapFile.name}</span>
              <button
                type="button"
                onClick={() => removeFile('partner')}
                className="p-1 hover:bg-[hsl(var(--primary))/20] rounded"
                aria-label="Удалить файл"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Политика конфиденциальности */}
        <div className="flex items-start gap-2">
          <Checkbox
            checked={formData.policyAccepted}
            onChange={(e) => setFormData({ ...formData, policyAccepted: e.target.checked })}
            id="policy"
            required
          />
          <label htmlFor="policy" className="text-xs text-[hsl(var(--muted-foreground))] leading-tight cursor-pointer">
            Я согласен с{' '}
            <a href="/privacy" className="text-[hsl(var(--primary))] hover:underline" target="_blank" rel="noopener noreferrer">
              политикой конфиденциальности
            </a>
          </label>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full">
          Отправить заявку
        </Button>
      </form>
    </Dialog>
  )
}
