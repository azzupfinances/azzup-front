import type { Transaction, TransactionDayGroup as DayGroup } from '@/features/transactions/types/transaction.types'
import { List } from '@/shared/components/List/List'
import { getPaymentLabel } from '@/features/transactions/utils/card-installments'
import { TransactionListItem } from '@/shared/components/TransactionListItem/TransactionListItem'
import { getCreditCardHref } from '@/shared/constants/routes'
import type { CreditCard } from '@/shared/types/credit-card.types'
import { addDaysToIsoDate, parseIsoDate } from '@/shared/utils/iso-date'

import styles from './TransactionDayGroup.module.scss'

const dayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

function getDayLabel(isoDate: string, todayIsoDate: string | null) {
  if (isoDate === todayIsoDate) {
    return 'Hoje'
  }

  if (todayIsoDate && isoDate === addDaysToIsoDate(todayIsoDate, -1)) {
    return 'Ontem'
  }

  return dayFormatter.format(parseIsoDate(isoDate))
}

type TransactionDayGroupProps = {
  group: DayGroup
  // `null` before hydration: days show their full date until "today" is known.
  todayIsoDate: string | null
  creditCards: CreditCard[]
  onTransactionClick: (transaction: Transaction) => void
}

export function TransactionDayGroup({
  group,
  todayIsoDate,
  creditCards,
  onTransactionClick,
}: TransactionDayGroupProps) {
  const dayLabel = getDayLabel(group.date, todayIsoDate)

  return (
    <section className={styles.group} aria-label={dayLabel}>
      <h2 className={styles.day}>{dayLabel}</h2>

      <List label={`Transações de ${dayLabel}`}>
        {group.transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            description={transaction.description}
            categoryId={transaction.categoryId}
            amountInCents={transaction.amountInCents}
            paymentLabel={getPaymentLabel(transaction, creditCards)}
            // Installments belong to a card purchase, so they open that card's invoice instead.
            href={transaction.cardInstallment ? getCreditCardHref(transaction.cardInstallment.creditCardId) : undefined}
            onClick={transaction.cardInstallment ? undefined : () => onTransactionClick(transaction)}
          />
        ))}
      </List>
    </section>
  )
}
