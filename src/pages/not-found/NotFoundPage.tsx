import { Link } from 'react-router'
import { Layout } from '@/widgets/Layout'
export function NotFoundPage() {
  return <Layout><div className="container mx-auto px-6 py-20"><h1 className="page-title">Страница не найдена</h1><p className="my-6 text-muted-foreground">Проверьте адрес или перейдите в каталог материалов.</p><Link to="/catalog" className="font-bold text-primary hover:underline">Открыть каталог</Link></div></Layout>
}
