import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { PageContextProvider } from './PageContextProvider'
import type { Context } from './types'

export function render(pageContext: Context): string {
  const { Page, pageProps } = pageContext
  const html = ReactDOMServer.renderToString(
    <PageContextProvider pageContext={pageContext}>
      <Page {...pageProps} />
    </PageContextProvider>
  )
  return html
}
