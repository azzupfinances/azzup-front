'use client'

import { CircleAlert, CircleCheck, Info, X, type LucideIcon } from 'lucide-react'
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { IconButton } from '@/shared/components/IconButton/IconButton'
import { classNames } from '@/shared/utils/class-names'

import styles from './ToastProvider.module.scss'

const TOAST_DURATION_MS = 4000

type ToastTone = 'success' | 'error' | 'info'

export type ToastInput = {
  title: string
  description?: string
  tone?: ToastTone
}

type Toast = ToastInput & {
  id: number
}

type ToastContextValue = {
  showToast: (toast: ToastInput) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

const TONE_ICONS: Record<ToastTone, LucideIcon> = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
}

let nextToastId = 0

type ToastProviderProps = {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: ToastInput) => {
    nextToastId += 1
    setToasts((current) => [...current, { ...toast, id: nextToastId }])
  }, [])

  const contextValue = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <section className={styles.viewport} aria-label="Notificações" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </section>
    </ToastContext.Provider>
  )
}

type ToastItemProps = {
  toast: Toast
  onDismiss: (id: number) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { id, title, description, tone = 'info' } = toast
  const Icon = TONE_ICONS[tone]

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onDismiss(id), TOAST_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [id, onDismiss])

  return (
    <div className={classNames(styles.toast, styles[tone])} role="status">
      <span className={styles.icon} aria-hidden="true">
        <Icon size={18} />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <IconButton icon={X} label="Fechar notificação" size="sm" onClick={() => onDismiss(id)} />
    </div>
  )
}
