import { classNames } from '@/shared/utils/class-names'
import { splitCurrency } from '@/shared/utils/format-currency'

import styles from './Money.module.scss'

type MoneyProps = {
  amountInCents: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  // `signed` colors income green and expenses red and prefixes +/-; `neutral` never does.
  tone?: 'neutral' | 'signed'
  className?: string
}

export function Money({ amountInCents, size = 'md', tone = 'neutral', className }: MoneyProps) {
  const { integer, cents } = splitCurrency(amountInCents)
  const isNegative = amountInCents < 0
  const isSigned = tone === 'signed' && amountInCents !== 0
  const sign = isNegative ? '-' : isSigned ? '+' : ''

  return (
    <span
      className={classNames(
        styles.money,
        styles[size],
        isSigned && (isNegative ? styles.negative : styles.positive),
        className,
      )}
    >
      {sign}R$ {integer}
      <span className={styles.cents}>,{cents}</span>
    </span>
  )
}
