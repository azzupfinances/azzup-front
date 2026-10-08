import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './FormField.module.scss'

type FormFieldProps = {
  label: string
  controlId: string
  descriptionId: string
  hint?: string
  error?: string
  // Keeps the label for screen readers when the placeholder already explains the field.
  isLabelHidden?: boolean
  className?: string
  children: ReactNode
}

// Label + control + hint/error layout shared by every form control.
// The control must point `aria-describedby` at `descriptionId` when a hint or error exists.
export function FormField({
  label,
  controlId,
  descriptionId,
  hint,
  error,
  isLabelHidden = false,
  className,
  children,
}: FormFieldProps) {
  const description = error ?? hint

  return (
    <div className={classNames(styles.field, className)}>
      <label htmlFor={controlId} className={isLabelHidden ? 'sr-only' : styles.label}>
        {label}
      </label>

      {children}

      {description && (
        <span
          id={descriptionId}
          className={classNames(styles.description, error && styles.error)}
          role={error ? 'alert' : undefined}
        >
          {description}
        </span>
      )}
    </div>
  )
}
