import { usePageData } from '@/shared/seo/page-context'

export function useService(slug: string | undefined) {
  const data = usePageData()
  return {
    service: data.service?.slug === slug ? data.service : null,
    isLoading: data.status === 0,
    notFound: data.status === 404,
    error: data.status >= 500 ? 'Не удалось загрузить услугу. Повторите попытку позже.' : null,
  }
}
