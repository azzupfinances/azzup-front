import type {
  CardPurchase,
  CreditCard,
  CreditCardSummary,
  Installment,
} from '@/shared/types/credit-card.types'
import { buildInstallments } from '@/shared/utils/installments'
import { getIsoMonth } from '@/shared/utils/iso-date'

// No bill cycles yet: an installment counts as paid once its month is over. The current
// month's installments are still pending, so they are part of the committed amount.
export function isInstallmentPending(installment: Installment, todayIsoDate: string) {
  return getIsoMonth(installment.dueDate) >= getIsoMonth(todayIsoDate)
}

function sumInstallments(installments: Installment[]) {
  return installments.reduce((total, installment) => total + installment.amountInCents, 0)
}

export function summarizeCreditCard(
  card: CreditCard,
  purchases: CardPurchase[],
  todayIsoDate: string,
): CreditCardSummary {
  const currentMonth = getIsoMonth(todayIsoDate)
  const installments = purchases
    .filter((purchase) => purchase.creditCardId === card.id)
    .flatMap(buildInstallments)
  const pendingInstallments = installments.filter((installment) =>
    isInstallmentPending(installment, todayIsoDate),
  )
  const committedInCents = sumInstallments(pendingInstallments)
  const lastInstallmentDate = pendingInstallments.reduce<string | null>(
    (latest, installment) => (latest === null || installment.dueDate > latest ? installment.dueDate : latest),
    null,
  )

  return {
    limitInCents: card.limitInCents,
    committedInCents,
    availableInCents: card.limitInCents - committedInCents,
    currentMonthInCents: sumInstallments(
      installments.filter((installment) => getIsoMonth(installment.dueDate) === currentMonth),
    ),
    lastInstallmentDate,
  }
}
