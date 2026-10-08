import { useId, type ComponentProps, type ReactNode } from 'react'

import { FormField } from '@/shared/components/FormField/FormField'
import { classNames } from '@/shared/utils/class-names'

import styles from './TextField.module.scss'

type TextFieldProps = Omit<ComponentProps<'input'>, 'className' | 'id'> & {
  label: string
  hint?: string
  error?: string
  isLabelHidden?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  className?: string
}

export function TextField({
  label,
  hint,
  error,
  isLabelHidden,
  startAdornment,
  endAdornment,
  className,
  ...inputProps
}: TextFieldProps) {
  const inputId = useId()
  const descriptionId = `${inputId}-description`
  const hasDescription = Boolean(error ?? hint)

  return (
    <FormField
      label={label}
      controlId={inputId}
      descriptionId={descriptionId}
      hint={hint}
      error={error}
      isLabelHidden={isLabelHidden}
      className={className}
    >
      <div className={classNames(styles.control, error && styles.hasError)}>
        {startAdornment && <div className={styles.startAdornment}>{startAdornment}</div>}
        <input
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          {...inputProps}
        />
        {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
      </div>
    </FormField>
  )
}
