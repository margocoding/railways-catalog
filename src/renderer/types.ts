import type { ComponentType } from 'react'

export interface PageProps {
  [key: string]: unknown
}

export interface Context {
  Page: ComponentType
  pageProps: Record<string, unknown>
  documentProps?: DocumentProps
  urlOriginal: string
}

export interface DocumentProps {
  title?: string
  description?: string
}
