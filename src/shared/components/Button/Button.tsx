import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonStyleProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  isFullWidth?: boolean
  className?: string
}

type ButtonContentProps = {
  hasArrow?: boolean
  children: ReactNode
}

type ButtonAsButtonProps = ButtonStyleProps &
  ButtonContentProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLinkProps = ButtonStyleProps &
  ButtonContentProps & {
    href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

// Renders a Next.js Link when `href` is provided, so links and buttons share one visual API.
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, hasArrow, children, ...styleProps } = props

    return (
      <Link href={href} className={getButtonClassName(styleProps)}>
        <ButtonContent hasArrow={hasArrow}>{children}</ButtonContent>
      </Link>
    )
  }

  const {
    variant,
    size,
    isFullWidth,
    className,
    hasArrow,
    children,
    type = 'button',
    ...buttonProps
  } = props

  return (
    <button
      type={type}
      className={getButtonClassName({ variant, size, isFullWidth, className })}
      {...buttonProps}
    >
      <ButtonContent hasArrow={hasArrow}>{children}</ButtonContent>
    </button>
  )
}

function ButtonContent({ hasArrow = false, children }: ButtonContentProps) {
  return (
    <>
      {children}
      {hasArrow && <ArrowRight size={16} className={styles.arrow} aria-hidden="true" />}
    </>
  )
}

function getButtonClassName({
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  className,
}: ButtonStyleProps) {
  return classNames(
    styles.button,
    styles[variant],
    styles[size],
    isFullWidth && styles.fullWidth,
    className,
  )
}
