import type { CSSProperties } from 'react'

import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import type { SampleCategorySpending } from '@/features/dashboard/constants/dashboard-sample'
import { Money } from '@/shared/components/Money/Money'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'

import styles from './CategorySpending.module.scss'

type CategorySpendingProps = {
  title: string
  items: SampleCategorySpending[]
  action?: { label: string; href: string }
}

export function CategorySpending({ title, items, action }: CategorySpendingProps) {
  const totalInCents = items.reduce((sum, item) => sum + item.amountInCents, 0)

  return (
    <DashboardPanel title={title} action={action}>
      <ul className={styles.list}>
        {items.map(({ categoryId, amountInCents }, index) => {
          const category = TRANSACTION_CATEGORIES[categoryId]
          const Icon = category.icon
          const sharePercentage = Math.round((amountInCents / totalInCents) * 100)

          return (
            <li key={categoryId} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                <Icon size={16} />
              </span>
              <div className={styles.details}>
                <div className={styles.row}>
                  <span className={styles.label}>{category.label}</span>
                  <Money amountInCents={amountInCents} size="sm" />
                </div>
                <div className={styles.row}>
                  <span
                    className={styles.bar}
                    style={{ '--share': `${sharePercentage}%`, '--index': index } as CSSProperties}
                    aria-hidden="true"
                  />
                  <span className={styles.share}>{sharePercentage}%</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </DashboardPanel>
  )
}
