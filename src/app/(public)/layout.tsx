import type { ReactNode } from 'react'

import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'

type PublicLayoutProps = {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>
}
