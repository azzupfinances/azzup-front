import type { Metadata } from 'next'

import { LoginPage } from '@/features/auth/components/LoginPage/LoginPage'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function Page() {
  return <LoginPage />
}
