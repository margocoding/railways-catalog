import ReactDOM from 'react-dom/client'
import { PageContextProvider } from './PageContextProvider'
import type { Context } from './types'

export function render(pageContext: Context) {
  const { Page, pageProps } = pageContext
  const rootElement = document.getElementById('root')!
  
  if (rootElement.innerHTML === '') {
    ReactDOM.hydrateRoot(
      rootElement,
      <PageContextProvider pageContext={pageContext}>
        <Page {...pageProps} />
      </PageContextProvider>
    )
  } else {
    ReactDOM.createRoot(rootElement).render(
      <PageContextProvider pageContext={pageContext}>
        <Page {...pageProps} />
      </PageContextProvider>
    )
  }
}
