import React from 'react'
import { Layout } from '../widgets/Layout'

export default function Page({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
