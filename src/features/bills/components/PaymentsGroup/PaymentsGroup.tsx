import { CircleAlert, CircleCheck, Clock, type LucideIcon } from 'lucide-react'

import { PaymentListItem } from '@/features/bills/components/PaymentListItem/PaymentListItem'
import type { BillStatus, PaymentOfMonth } from '@/features/bills/types/bill.types'
import { List } from '@/shared/components/List/List'
import { classNames } from '@/shared/utils/class-names'
import { formatCurrency } from '@/shared/utils/format-currency'

import styles from './PaymentsGroup.module.scss'

type GroupAppearance = {
  title: string
  description: string
  icon: LucideIcon
}

const GROUP_APPEARANCES: Record<BillStatus, GroupAppearance> = {
  overdue: { title: 'Atrasadas', description: 'Venceram e não foram pagas', icon: CircleAlert },
  pending: { title: 'A vencer', description: 'Vencem até o fim do mês', icon: Clock },
  paid: { title: 'Pagas', description: 'Já resolvidas este mês', icon: CircleCheck },
}

type PaymentsGroupProps = {
  status: BillStatus
  payments: PaymentOfMonth[]
  onOpenBill: (payment: PaymentOfMonth) => void
  onTogglePaid: (payment: PaymentOfMonth) => void
  highlightedPaymentId: string | null
}

// Each status gets its own color, icon and accent stripe so the groups read apart at a glance.
export function PaymentsGroup({
  status,
  payments,
  onOpenBill,
  onTogglePaid,
  highlightedPaymentId,
}: PaymentsGroupProps) {
  const { title, description, icon: Icon } = GROUP_APPEARANCES[status]
  const totalInCents = payments.reduce((total, payment) => total + payment.amountInCents, 0)

  return (
    <section className={classNames(styles.group, styles[status])}>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={18} />
        </span>
        <div className={styles.headerText}>
          <h2 className={styles.title}>
            {title} <span className={styles.count}>{payments.length}</span>
          </h2>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.total}>{formatCurrency(totalInCents)}</span>
      </header>

      <List label={title} className={styles.list}>
        {payments.map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            onOpenBill={onOpenBill}
            onTogglePaid={onTogglePaid}
            isHighlighted={payment.id === highlightedPaymentId}
          />
        ))}
      </List>
    </section>
  )
}
