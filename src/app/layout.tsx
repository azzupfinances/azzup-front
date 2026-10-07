import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/globals.scss'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Azzup',
    default: 'Azzup',
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
