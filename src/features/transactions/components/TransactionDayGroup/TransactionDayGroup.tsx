import type { Transaction, TransactionDayGroup as DayGroup } from '@/features/transactions/types/transaction.types'
import { List } from '@/shared/components/List/List'
import { Money } from '@/shared/components/Money/Money'
import { TransactionListItem } from '@/shared/components/TransactionListItem/TransactionListItem'
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
  onTransactionClick: (transaction: Transaction) => void
}

export function TransactionDayGroup({ group, todayIsoDate, onTransactionClick }: TransactionDayGroupProps) {
  const dayLabel = getDayLabel(group.date, todayIsoDate)

  return (
    <section className={styles.group} aria-label={dayLabel}>
      <header className={styles.header}>
        <h2 className={styles.day}>{dayLabel}</h2>
        <Money amountInCents={group.totalInCents} size="sm" tone="signed" />
      </header>

      <List label={`Transações de ${dayLabel}`}>
        {group.transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            description={transaction.description}
            categoryId={transaction.categoryId}
            amountInCents={transaction.amountInCents}
            onClick={() => onTransactionClick(transaction)}
          />
        ))}
      </List>
    </section>
  )
}
