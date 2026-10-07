import { BellRing, PiggyBank } from 'lucide-react'
import type { CSSProperties } from 'react'

import { ShowcaseFrame } from '@/features/auth/components/ShowcaseFrame/ShowcaseFrame'
import {
  BUDGET_CATEGORIES,
  EMERGENCY_FUND_PERCENTAGE,
  TRANSACTION_ITEMS,
} from '@/features/auth/constants/auth-showcase'
import { useCountUp } from '@/features/auth/hooks/useCountUp'
import { classNames } from '@/shared/utils/class-names'

import styles from './BillsScene.module.scss'

type BillsSceneProps = {
  isActive: boolean
}

export function BillsScene({ isActive }: BillsSceneProps) {
  const emergencyFundPercentage = useCountUp(EMERGENCY_FUND_PERCENTAGE, isActive)

  return (
    <ShowcaseFrame
      activeNavIndex={2}
      isActive={isActive}
      className={classNames(styles.scene, isActive && styles.isActive)}
    >
      <div className={styles.header}>
        <span className={styles.title}>Contas e movimentações</span>
        <span className={styles.chip}>Junho</span>
      </div>

      <div className={styles.columns}>
        <ul className={styles.transactionList}>
          {TRANSACTION_ITEMS.map((transaction, index) => (
            <li
              key={transaction.title}
              className={styles.transaction}
              style={{ '--index': index } as CSSProperties}
            >
              <span className={styles.transactionIcon}>
                <transaction.icon size={18} />
              </span>
              <span className={styles.transactionText}>
                <span className={styles.transactionTitle}>{transaction.title}</span>
                <span className={styles.transactionDescription}>{transaction.description}</span>
              </span>
              <span className={styles.transactionStatus}>{transaction.status}</span>
            </li>
          ))}
        </ul>

        <div className={styles.savingsCard}>
          <span className={styles.cardTitle}>
            <PiggyBank size={16} />
            Reserva de emergência
          </span>

          <div
            className={styles.fundRing}
            style={{ '--fund-percentage': EMERGENCY_FUND_PERCENTAGE } as CSSProperties}
          >
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" className={styles.fundRingTrack} />
              <circle cx="60" cy="60" r="50" pathLength={100} className={styles.fundRingValue} />
            </svg>
            <span className={styles.fundPercentage}>
              {emergencyFundPercentage}%<small>da meta</small>
            </span>
          </div>

          <span className={styles.cardTitle}>Orçamento do mês</span>

          <ul className={styles.budgetList}>
            {BUDGET_CATEGORIES.map((category, index) => (
              <li
                key={category.label}
                className={styles.budget}
                style={{ '--progress': `${category.percentage}%`, '--index': index } as CSSProperties}
              >
                <span className={styles.budgetLabel}>
                  {category.label}
                  <strong>{category.percentage}%</strong>
                </span>
                <span className={styles.budgetTrack}>
                  <span className={styles.budgetFill} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.toast}>
        <span className={styles.toastIcon}>
          <BellRing size={18} />
        </span>
        <span className={styles.toastText}>
          <span className={styles.toastTitle}>Conta de luz vence amanhã</span>
          <span className={styles.toastDescription}>R$ 182,40 · lembrete</span>
        </span>
      </div>
    </ShowcaseFrame>
  )
}
