import { Button } from '@/shared/ui/Button'
import { FiDownload } from 'react-icons/fi'

const CATALOG_FILE = {
  path: '/data/catalog-template.xlsx',
  filename: 'catalog-template.xlsx',
}

export function PriceActions() {
  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CATALOG_FILE.path}
            download={CATALOG_FILE.filename}
            className="inline-block"
          >
            <Button size="lg" variant="primary">
              <FiDownload className="w-5 h-5" />
              Скачать прайс XLSX
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}