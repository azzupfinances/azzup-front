import type { Metadata } from 'next'

import { YearDashboardPage } from '@/features/dashboard/components/YearDashboardPage/YearDashboardPage'

export const metadata: Metadata = {
  title: 'Seu ano',
}

export default function Page() {
  return <YearDashboardPage />
}
