import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
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
  // Renders a link with the same look when the action navigates.
  href?: string
}

export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className,
  type = 'button',
  href,
  ...buttonProps
}: IconButtonProps) {
  const iconButtonClassName = classNames(styles.iconButton, styles[variant], styles[size], className)
  const icon = <Icon size={size === 'sm' ? 16 : 20} aria-hidden="true" />

  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={iconButtonClassName}>
        {icon}
      </Link>
    )
  }

  return (
    <button type={type} aria-label={label} title={label} className={iconButtonClassName} {...buttonProps}>
      {icon}
    </button>
  )
}
