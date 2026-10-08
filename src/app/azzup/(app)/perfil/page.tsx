import { Construction } from 'lucide-react'
import type { Metadata } from 'next'

import { EmptyState } from '@/shared/components/EmptyState/EmptyState'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default function Page() {
  return <EmptyState icon={Construction} title="Perfil em construção" description="Em breve por aqui." />
}
