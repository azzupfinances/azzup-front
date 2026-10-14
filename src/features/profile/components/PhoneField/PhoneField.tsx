import type { ComponentProps } from 'react'

import { formatPhone } from '@/features/profile/utils/phone'
import { TextField } from '@/shared/components/TextField/TextField'

type PhoneFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'label' | 'value' | 'onChange' | 'type' | 'inputMode' | 'maxLength'
> & {
  value: string
  onChange: (value: string) => void
}

// Controlled phone input that applies the (00) 00000-0000 mask while typing.
export function PhoneField({ value, onChange, ...textFieldProps }: PhoneFieldProps) {
  return (
    <TextField
      label="Celular"
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      placeholder="(00) 00000-0000"
      maxLength={15}
      value={value}
      onChange={(event) => onChange(formatPhone(event.target.value))}
      {...textFieldProps}
    />
  )
}
