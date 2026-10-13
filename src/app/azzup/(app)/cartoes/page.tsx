import type { Metadata } from 'next'

import { CreditCardsPage } from '@/features/credit-cards/components/CreditCardsPage/CreditCardsPage'

export const metadata: Metadata = {
  title: 'Cartões',
}

export default function Page() {
  return <CreditCardsPage />
}
