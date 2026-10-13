import type { Transaction } from '@/features/transactions/types/transaction.types'
import { PAYMENT_METHODS } from '@/shared/constants/payment-methods'
import type { CardPurchase, CreditCard } from '@/shared/types/credit-card.types'
import { buildInstallments } from '@/shared/utils/installments'
import { getIsoMonth } from '@/shared/utils/iso-date'

// The statement lists what weighs on the month: for card purchases that is the installment
// falling in it, not the full purchase on the day it was made.
export function getMonthCardInstallments(purchases: CardPurchase[], monthIsoDate: string): Transaction[] {
  const month = getIsoMonth(monthIsoDate)

  return purchases.flatMap((purchase) =>
    buildInstallments(purchase)
      .filter((installment) => getIsoMonth(installment.dueDate) === month)
      .map((installment) => ({
        id: `${purchase.id}-${installment.number}`,
        description: purchase.description,
        amountInCents: -installment.amountInCents,
        date: installment.dueDate,
        categoryId: purchase.categoryId,
        source: 'manual' as const,
        paymentMethodId: 'creditCard' as const,
        cardInstallment: {
          creditCardId: purchase.creditCardId,
          number: installment.number,
          count: purchase.installmentsCount,
        },
      })),
  )
}

// "Pix", "Nubank · 5/10" or "Nubank" for a card purchase paid at once.
export function getPaymentLabel(transaction: Transaction, creditCards: CreditCard[]) {
  const { paymentMethodId, cardInstallment } = transaction

  if (cardInstallment) {
    const creditCard = creditCards.find((card) => card.id === cardInstallment.creditCardId)
    const cardName = creditCard?.name ?? PAYMENT_METHODS.creditCard.label

    return cardInstallment.count > 1 ? `${cardName} · ${cardInstallment.number}/${cardInstallment.count}` : cardName
  }

  return paymentMethodId ? PAYMENT_METHODS[paymentMethodId].label : undefined
}
