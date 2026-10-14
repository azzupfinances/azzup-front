import type { CSSProperties, ReactNode } from 'react'

import { AnimatedMoney } from '@/shared/components/AnimatedMoney/AnimatedMoney'
import { CreditCardBankHeader } from '@/shared/components/CreditCardBankHeader/CreditCardBankHeader'
import { Money } from '@/shared/components/Money/Money'
import type { CreditCard, CreditCardSummary } from '@/shared/types/credit-card.types'
import { classNames } from '@/shared/utils/class-names'
import { formatCurrency } from '@/shared/utils/format-currency'
import { formatMonthYear } from '@/shared/utils/format-month-year'

import styles from './CreditCardSummaryCard.module.scss'

// Share of the limit from which the usage bar warns the user.
const WARNING_USAGE_PERCENTAGE = 70
const DANGER_USAGE_PERCENTAGE = 90

type CreditCardSummaryCardProps = {
  creditCard: CreditCard
  summary: CreditCardSummary
  actions?: ReactNode
  // On phones, keeps only the header, what is available and this month's amount.
  isCompactOnPhone?: boolean
  className?: string
}

// One card broken down: committed vs. limit, what is left, what weighs on this month and
// when the last installment falls. The header carries the bank's logo and brand color.
export function CreditCardSummaryCard({
  creditCard,
  summary,
  actions,
  isCompactOnPhone = false,
  className,
}: CreditCardSummaryCardProps) {
  const { limitInCents, committedInCents, availableInCents, currentMonthInCents, lastInstallmentDate } = summary
  const usagePercentage =
    limitInCents > 0 ? Math.min(100, Math.round((committedInCents / limitInCents) * 100)) : 100
  const usageTone =
    usagePercentage >= DANGER_USAGE_PERCENTAGE
      ? styles.danger
      : usagePercentage >= WARNING_USAGE_PERCENTAGE
        ? styles.warning
        : undefined

  return (
    <article
      className={classNames(styles.card, isCompactOnPhone && styles.isCompactOnPhone, className)}
      aria-label={`Cartão ${creditCard.name}`}
    >
      <CreditCardBankHeader creditCard={creditCard} actions={actions} className={styles.header} />

      <div className={styles.body}>
        <div className={styles.usage}>
          <p className={styles.committed}>
            <span className={styles.committedLabel}>Comprometido</span>
            <span>
              <AnimatedMoney amountInCents={committedInCents} size="lg" />
              <span className={styles.limit}> de {formatCurrency(limitInCents)}</span>
            </span>
          </p>
          <div
            className={classNames(styles.progress, usageTone)}
            role="progressbar"
            aria-label="Limite comprometido"
            aria-valuenow={usagePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ '--progress': `${usagePercentage}%` } as CSSProperties}
          />
        </div>

        <dl className={styles.figures}>
          <div className={styles.figure}>
            <dt>Disponível</dt>
            <dd>
              <Money
                amountInCents={availableInCents}
                size="sm"
                className={classNames(availableInCents < 0 && styles.negative)}
              />
            </dd>
          </div>
          <div className={styles.figure}>
            <dt>Neste mês</dt>
            <dd>
              <Money amountInCents={currentMonthInCents} size="sm" />
            </dd>
          </div>
          <div className={styles.figure}>
            <dt>Última parcela</dt>
            <dd>{lastInstallmentDate ? formatMonthYear(lastInstallmentDate) : 'Nenhuma'}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
