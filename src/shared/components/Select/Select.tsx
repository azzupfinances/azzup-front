import { ChevronDown } from 'lucide-react'
import { useId, type ComponentProps } from 'react'

import { FormField } from '@/shared/components/FormField/FormField'
import { classNames } from '@/shared/utils/class-names'

import styles from './Select.module.scss'

export type SelectOption = {
  value: string
  label: string
}

type SelectProps = Omit<ComponentProps<'select'>, 'className' | 'id' | 'children'> & {
  label: string
  options: SelectOption[]
  placeholder?: string
  hint?: string
  error?: string
  className?: string
}

// Native select styled like TextField: on phones it opens the system picker, which is
// the most usable option for touch.
export function Select({
  label,
  options,
  placeholder,
  hint,
  error,
  className,
  ...selectProps
}: SelectProps) {
  const selectId = useId()
  const descriptionId = `${selectId}-description`
  const hasDescription = Boolean(error ?? hint)

  return (
    <FormField
      label={label}
      controlId={selectId}
      descriptionId={descriptionId}
      hint={hint}
      error={error}
      className={className}
    >
      <div className={classNames(styles.control, error && styles.hasError)}>
        <select
          id={selectId}
          className={styles.select}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
      </div>
    </FormField>
  )
}
