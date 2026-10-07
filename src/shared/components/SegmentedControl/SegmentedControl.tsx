'use client'

import { classNames } from '@/shared/utils/class-names'

import styles from './SegmentedControl.module.scss'

export type SegmentedControlOption<Value extends string> = {
  value: Value
  label: string
}

type SegmentedControlProps<Value extends string> = {
  label: string
  options: SegmentedControlOption<Value>[]
  value: Value
  onValueChange: (value: Value) => void
  isFullWidth?: boolean
  className?: string
}

// Single choice between a few options (periods, income/expense). Uses native radios,
// so arrow keys and screen readers work without extra code.
export function SegmentedControl<Value extends string>({
  label,
  options,
  value,
  onValueChange,
  isFullWidth = false,
  className,
}: SegmentedControlProps<Value>) {
  return (
    <fieldset className={classNames(styles.control, isFullWidth && styles.fullWidth, className)}>
      <legend className="sr-only">{label}</legend>

      {options.map((option) => (
        <label
          key={option.value}
          className={classNames(styles.option, option.value === value && styles.isSelected)}
        >
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={option.value === value}
            className="sr-only"
            onChange={() => onValueChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}
