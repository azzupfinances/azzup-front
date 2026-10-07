import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './IconButton.module.scss'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
  icon: LucideIcon
  // Required: icon-only buttons have no visible text for screen readers.
  label: string
  variant?: 'ghost' | 'outline' | 'soft'
  size?: 'sm' | 'md'
  className?: string
}

export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className,
  type = 'button',
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={classNames(styles.iconButton, styles[variant], styles[size], className)}
      {...buttonProps}
    >
      <Icon size={size === 'sm' ? 16 : 20} aria-hidden="true" />
    </button>
  )
}
