import { Wallet } from 'lucide-react'
import type { ReactNode } from 'react'

import { ListItem } from '@/shared/components/ListItem/ListItem'
import { Money } from '@/shared/components/Money/Money'
import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

type TransactionListItemProps = {
  description: string
  categoryId: CategoryId
  // Negative = expense, positive = income.
  amountInCents: number
  dateLabel?: ReactNode
  onClick?: () => void
}

// One transaction row inside a List: income shows a wallet in green, expenses their category.
export function TransactionListItem({
  description,
  categoryId,
  amountInCents,
  dateLabel,
  onClick,
}: TransactionListItemProps) {
  const category = TRANSACTION_CATEGORIES[categoryId]
  const isIncome = amountInCents > 0

  return (
    <ListItem
      icon={isIncome ? Wallet : category.icon}
      iconTone={isIncome ? 'success' : 'default'}
      title={description}
      description={isIncome ? 'Receita' : category.label}
      trailing={<Money amountInCents={amountInCents} size="sm" tone="signed" />}
      trailingDetail={dateLabel}
      onClick={onClick}
    />
  )
}
