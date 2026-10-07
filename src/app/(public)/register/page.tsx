import type { Metadata } from 'next'

import { RegisterPage } from '@/features/auth/components/RegisterPage/RegisterPage'

export const metadata: Metadata = {
  title: 'Criar conta',
}

export default function Page() {
  return <RegisterPage />
}
