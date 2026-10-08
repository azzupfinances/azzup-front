import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import { SAMPLE_UPCOMING_BILLS } from '@/features/dashboard/constants/dashboard-sample'
import { Badge } from '@/shared/components/Badge/Badge'
import { List } from '@/shared/components/List/List'
import { ListItem } from '@/shared/components/ListItem/ListItem'
import { Money } from '@/shared/components/Money/Money'
import { BILLS_HREF } from '@/shared/constants/routes'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'

export function UpcomingBills() {
  return (
    <DashboardPanel title="Próximas contas" action={{ label: 'Ver todas', href: BILLS_HREF }}>
      <List label="Próximas contas">
        {SAMPLE_UPCOMING_BILLS.map((bill) => {
          const isOverdue = bill.status === 'overdue'

          return (
            <ListItem
              key={bill.id}
              icon={TRANSACTION_CATEGORIES[bill.categoryId].icon}
              iconTone={isOverdue ? 'danger' : 'default'}
              title={bill.name}
              description={bill.dueDateLabel}
              trailing={<Money amountInCents={bill.amountInCents} size="sm" />}
              trailingDetail={
                <Badge tone={isOverdue ? 'danger' : 'warning'}>
                  {isOverdue ? 'Atrasada' : 'Pendente'}
                </Badge>
              }
            />
          )
        })}
      </List>
    </DashboardPanel>
  )
}
