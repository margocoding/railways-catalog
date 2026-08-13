import { FiDownload, FiMail } from 'react-icons/fi'
import { Button } from '../../shared/ui/Button'

export function PriceActions() {
  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary">
            <FiDownload className="w-5 h-5" />
            Скачать прайс PDF
          </Button>
          <Button size="lg" variant="secondary">
            <FiMail className="w-5 h-5" />
            Получить прайс на email
          </Button>
        </div>
      </div>
    </section>
  )
}
