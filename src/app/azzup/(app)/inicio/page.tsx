import type { Metadata } from 'next'

import { DashboardPage } from '@/features/dashboard/components/DashboardPage/DashboardPage'

export const metadata: Metadata = {
  title: 'Início',
}

export default function Page() {
  return <DashboardPage />
}
