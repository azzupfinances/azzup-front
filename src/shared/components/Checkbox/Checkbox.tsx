import { Check } from 'lucide-react'
import { useId, type ComponentProps, type ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Checkbox.module.scss'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'className' | 'id' | 'children'> & {
  error?: string
  className?: string
  children: ReactNode
}

export function Checkbox({ error, className, children, ...inputProps }: CheckboxProps) {
  const inputId = useId()
  const errorId = `${inputId}-error`

  return (
    <div className={classNames(styles.field, className)}>
      <div className={styles.row}>
        <span className={styles.control}>
          <input
            id={inputId}
            type="checkbox"
            className={classNames(styles.input, error && styles.hasError)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...inputProps}
          />
          <Check size={14} strokeWidth={3} className={styles.checkIcon} aria-hidden="true" />
        </span>
        <label htmlFor={inputId} className={styles.label}>
          {children}
        </label>
      </div>

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
