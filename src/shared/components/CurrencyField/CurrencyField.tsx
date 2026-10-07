import type { ComponentProps } from 'react'

import { TextField } from '@/shared/components/TextField/TextField'
import { splitCurrency } from '@/shared/utils/format-currency'

// Upper bound keeps typed amounts inside safe integer range (R$ 99.999.999,99).
const MAX_AMOUNT_IN_CENTS = 9_999_999_999

type CurrencyFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'value' | 'onChange' | 'type' | 'inputMode' | 'startAdornment'
> & {
  valueInCents: number
  onValueChange: (valueInCents: number) => void
}

// Bank-style amount input: digits fill from the right, so typing "1250" shows "12,50".
export function CurrencyField({ valueInCents, onValueChange, ...textFieldProps }: CurrencyFieldProps) {
  const { integer, cents } = splitCurrency(valueInCents)

  return (
    <TextField
      inputMode="numeric"
      autoComplete="off"
      startAdornment="R$"
      value={`${integer},${cents}`}
      onChange={(event) => {
        const digits = event.target.value.replace(/\D/g, '')
        onValueChange(Math.min(Number(digits || 0), MAX_AMOUNT_IN_CENTS))
      }}
      {...textFieldProps}
    />
  )
}
