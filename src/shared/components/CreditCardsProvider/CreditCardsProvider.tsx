'use client'

import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'

import { SAMPLE_CARD_PURCHASES, SAMPLE_CREDIT_CARDS } from '@/shared/constants/credit-cards-sample'
import type { CardPurchase, CreditCard } from '@/shared/types/credit-card.types'

type CreditCardInput = Omit<CreditCard, 'id'>
type CardPurchaseInput = Omit<CardPurchase, 'id'>

type CreditCardsContextValue = {
  creditCards: CreditCard[]
  purchases: CardPurchase[]
  createCreditCard: (input: CreditCardInput) => void
  updateCreditCard: (creditCard: CreditCard) => void
  deleteCreditCard: (creditCardId: string) => void
  createPurchase: (input: CardPurchaseInput) => void
}

export const CreditCardsContext = createContext<CreditCardsContextValue | null>(null)

type CreditCardsProviderProps = {
  children: ReactNode
}

// Visual phase: cards and card purchases live in memory, shared by every system screen
// (new transaction modal, dashboard, statement, cards screen) and reset on reload.
// Pending backend integration: replace with the credit cards service and React Query.
export function CreditCardsProvider({ children }: CreditCardsProviderProps) {
  const [creditCards, setCreditCards] = useState(SAMPLE_CREDIT_CARDS)
  const [purchases, setPurchases] = useState(SAMPLE_CARD_PURCHASES)

  const createCreditCard = useCallback((input: CreditCardInput) => {
    setCreditCards((current) => [...current, { ...input, id: crypto.randomUUID() }])
  }, [])

  const updateCreditCard = useCallback((updatedCreditCard: CreditCard) => {
    setCreditCards((current) =>
      current.map((creditCard) => (creditCard.id === updatedCreditCard.id ? updatedCreditCard : creditCard)),
    )
  }, [])

  // A removed card takes its purchases along, otherwise they would point to nothing.
  const deleteCreditCard = useCallback((creditCardId: string) => {
    setCreditCards((current) => current.filter((creditCard) => creditCard.id !== creditCardId))
    setPurchases((current) => current.filter((purchase) => purchase.creditCardId !== creditCardId))
  }, [])

  const createPurchase = useCallback((input: CardPurchaseInput) => {
    setPurchases((current) => [...current, { ...input, id: crypto.randomUUID() }])
  }, [])

  const contextValue = useMemo(
    () => ({ creditCards, purchases, createCreditCard, updateCreditCard, deleteCreditCard, createPurchase }),
    [creditCards, purchases, createCreditCard, updateCreditCard, deleteCreditCard, createPurchase],
  )

  return <CreditCardsContext.Provider value={contextValue}>{children}</CreditCardsContext.Provider>
}
