import type { ComponentProps } from 'react'

import { formatCpf } from '@/features/auth/utils/cpf'
import { TextField } from '@/shared/components/TextField/TextField'

type CpfFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'label' | 'value' | 'onChange' | 'inputMode' | 'maxLength'
> & {
  value: string
  onChange: (value: string) => void
}

// Controlled CPF input that applies the 000.000.000-00 mask while typing.
export function CpfField({ value, onChange, ...textFieldProps }: CpfFieldProps) {
  return (
    <TextField
      label="CPF"
      inputMode="numeric"
      placeholder="000.000.000-00"
      maxLength={14}
      value={value}
      onChange={(event) => onChange(formatCpf(event.target.value))}
      {...textFieldProps}
    />
  )
}
