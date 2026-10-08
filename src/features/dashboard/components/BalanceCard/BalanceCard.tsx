'use client'

import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { SAMPLE_MONTH_SUMMARY } from '@/features/dashboard/constants/dashboard-sample'
import { Money } from '@/shared/components/Money/Money'
import { useCountUp } from '@/shared/hooks/useCountUp'
import { classNames } from '@/shared/utils/class-names'

import styles from './BalanceCard.module.scss'

const HIDDEN_AMOUNT = 'R$ ••••'

export function BalanceCard() {
  const [isHidden, setIsHidden] = useState(false)
  const { incomeInCents, expensesInCents, balanceTrendPercentage } = SAMPLE_MONTH_SUMMARY
  const balanceInCents = useCountUp(incomeInCents - expensesInCents, true)
  const animatedIncomeInCents = useCountUp(incomeInCents, true)
  const animatedExpensesInCents = useCountUp(expensesInCents, true)

  return (
    <section className={styles.card} aria-label="Resumo do mês">
      <div className={styles.header}>
        <span className={styles.label}>Saldo do mês</span>
        <button
          type="button"
          className={styles.visibilityToggle}
          aria-label={isHidden ? 'Mostrar valores' : 'Ocultar valores'}
          aria-pressed={isHidden}
          onClick={() => setIsHidden((current) => !current)}
        >
          {isHidden ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>

      <div className={styles.balance}>
        {/* Each branch mounts fresh on toggle, which replays the `.swap` blur-in. */}
        {isHidden ? (
          <span className={classNames(styles.hiddenBalance, styles.swap)}>{HIDDEN_AMOUNT}</span>
        ) : (
          <Money
            amountInCents={balanceInCents}
            size="xl"
            className={classNames(styles.balanceValue, styles.swap)}
          />
        )}
        <span className={styles.trend}>
          <TrendingUp size={14} aria-hidden="true" />+{balanceTrendPercentage}% em relação ao mês passado
        </span>
      </div>

      <dl className={styles.flows}>
        <div className={styles.flow}>
          <dt className={styles.flowLabel}>
            <span className={styles.flowIcon}>
              <ArrowDownLeft size={16} aria-hidden="true" />
            </span>
            Entradas
          </dt>
          <dd className={styles.flowValue}>
            <FlowAmount amountInCents={animatedIncomeInCents} isHidden={isHidden} />
          </dd>
        </div>

        <div className={styles.flow}>
          <dt className={styles.flowLabel}>
            <span className={styles.flowIcon}>
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
            Saídas
          </dt>
          <dd className={styles.flowValue}>
            <FlowAmount amountInCents={animatedExpensesInCents} isHidden={isHidden} />
          </dd>
        </div>
      </dl>
    </section>
  )
}

type FlowAmountProps = {
  amountInCents: number
  isHidden: boolean
}

function FlowAmount({ amountInCents, isHidden }: FlowAmountProps) {
  if (isHidden) {
    return <span className={styles.swap}>{HIDDEN_AMOUNT}</span>
  }

  return <Money amountInCents={amountInCents} className={classNames(styles.flowMoney, styles.swap)} />
}
