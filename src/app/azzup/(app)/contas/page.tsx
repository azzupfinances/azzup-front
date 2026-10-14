import type { Metadata } from 'next'

import { BillsPage } from '@/features/bills/components/BillsPage/BillsPage'

export const metadata: Metadata = {
  title: 'Contas fixas',
}

export default function Page() {
  return <BillsPage />
}
