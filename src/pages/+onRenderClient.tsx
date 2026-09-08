import { createRoot, hydrateRoot } from 'react-dom/client'
import type { PageContextClient } from 'vike/types'
import { AppRoot } from '@/renderer/AppRoot'
import type { PageData } from '@/shared/seo/route-data'

export function onRenderClient(pageContext: PageContextClient) {
  const data = pageContext.data as PageData
  const root = document.getElementById('root')!
  if (data.ssr) hydrateRoot(root, <AppRoot data={data} />)
  else createRoot(root).render(<AppRoot data={data} />)
}
