import { useContext } from 'react'

import { CreditCardsContext } from '@/shared/components/CreditCardsProvider/CreditCardsProvider'

export function useCreditCards() {
  const context = useContext(CreditCardsContext)

  if (!context) {
    throw new Error('useCreditCards must be used inside <CreditCardsProvider>.')
  }

  return context
}
