import React, { createContext, useContext } from 'react'
import type { Context } from './types'

const PageContext = createContext<Context | null>(null)

export function PageContextProvider({ pageContext, children }: { pageContext: Context; children: React.ReactNode }) {
  return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
}

export function usePageContext() {
  const pageContext = useContext(PageContext)
  if (!pageContext) throw new Error('usePageContext must be used within PageContextProvider')
  return pageContext
}
