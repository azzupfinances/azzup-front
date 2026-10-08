import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import { SAMPLE_RECENT_TRANSACTIONS } from '@/features/dashboard/constants/dashboard-sample'
import { List } from '@/shared/components/List/List'
import { TransactionListItem } from '@/shared/components/TransactionListItem/TransactionListItem'
import { TRANSACTIONS_HREF } from '@/shared/constants/routes'

export function RecentTransactions() {
  return (
    <DashboardPanel title="Últimas transações" action={{ label: 'Ver extrato', href: TRANSACTIONS_HREF }}>
      <List label="Últimas transações">
        {SAMPLE_RECENT_TRANSACTIONS.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            description={transaction.description}
            categoryId={transaction.categoryId}
            amountInCents={transaction.amountInCents}
            dateLabel={transaction.dateLabel}
          />
        ))}
      </List>
    </DashboardPanel>
  )
}
