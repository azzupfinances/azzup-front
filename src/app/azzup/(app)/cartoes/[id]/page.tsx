import type { Metadata } from 'next'

import { CreditCardDetailsPage } from '@/features/credit-cards/components/CreditCardDetailsPage/CreditCardDetailsPage'

export const metadata: Metadata = {
  title: 'Cartão',
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <CreditCardDetailsPage creditCardId={id} />
}
