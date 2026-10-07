import { classNames } from '@/shared/utils/class-names'

import styles from './Switch.module.scss'

type SwitchProps = {
  isChecked: boolean
  label: string
  onCheckedChange: (isChecked: boolean) => void
  className?: string
}

export function Switch({ isChecked, label, onCheckedChange, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      className={classNames(styles.switch, isChecked && styles.checked, className)}
      onClick={() => onCheckedChange(!isChecked)}
    >
      <span className={styles.knob} />
    </button>
  )
}
