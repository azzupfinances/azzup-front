import type { Metadata } from 'next'

import { TransactionsPage } from '@/features/transactions/components/TransactionsPage/TransactionsPage'

export const metadata: Metadata = {
  title: 'Extrato',
}

export default function Page() {
  return <TransactionsPage />
}
