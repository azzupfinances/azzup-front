'use client'

import type { ComponentProps } from 'react'

import { Money } from '@/shared/components/Money/Money'
import { useCountUp } from '@/shared/hooks/useCountUp'
import { formatCurrency } from '@/shared/utils/format-currency'

// Shorter than the hero count-up: these are secondary figures.
const COUNT_UP_DURATION_MS = 900

type AnimatedMoneyProps = ComponentProps<typeof Money>

// Money that counts up when it appears and rolls to the new amount whenever it changes.
// Screen readers get only the final amount, not every intermediate frame.
export function AnimatedMoney({ amountInCents, ...moneyProps }: AnimatedMoneyProps) {
  const animatedAmountInCents = useCountUp(amountInCents, true, COUNT_UP_DURATION_MS)

  return (
    <>
      <span aria-hidden="true">
        <Money amountInCents={animatedAmountInCents} {...moneyProps} />
      </span>
      <span className="sr-only">{formatCurrency(amountInCents)}</span>
    </>
  )
}
