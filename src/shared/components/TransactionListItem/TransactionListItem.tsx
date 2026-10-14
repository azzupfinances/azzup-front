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
  // E.g. "Pix" or "Nubank · 5/10", shown after the category.
  paymentLabel?: string
  href?: string
  onClick?: () => void
}

// One transaction row inside a List: income shows a wallet in green, expenses their category
// icon in the category color.
export function TransactionListItem({
  description,
  categoryId,
  amountInCents,
  dateLabel,
  paymentLabel,
  href,
  onClick,
}: TransactionListItemProps) {
  const category = TRANSACTION_CATEGORIES[categoryId]
  const isIncome = amountInCents > 0
  const kindLabel = isIncome ? 'Receita' : category.label

  return (
    <ListItem
      icon={isIncome ? Wallet : category.icon}
      iconTone={isIncome ? 'success' : 'default'}
      iconColor={isIncome ? undefined : category}
      title={description}
      description={paymentLabel ? `${kindLabel} · ${paymentLabel}` : kindLabel}
      trailing={<Money amountInCents={amountInCents} size="sm" tone="income" />}
      trailingDetail={dateLabel}
      href={href}
      onClick={onClick}
    />
  )
}
