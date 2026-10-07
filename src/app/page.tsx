import type { Metadata } from 'next'

import { LandingPage } from '@/features/landing/components/LandingPage/LandingPage'

export const metadata: Metadata = {
  description: 'Tudo o que você precisa, em um só lugar.',
}

export default function Page() {
  return <LandingPage />
}
