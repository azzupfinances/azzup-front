import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import type { ReactNode } from 'react'

import { getThemeInitScript } from '@/lib/theme/theme'
import { ToastProvider } from '@/shared/components/ToastProvider/ToastProvider'
import { SYSTEM_HREF } from '@/shared/constants/routes'

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
    // The init script sets `data-theme` before hydration, so React must not flag it.
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript(SYSTEM_HREF) }} />
      </head>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
