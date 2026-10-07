import { useContext } from 'react'

import { ToastContext } from '@/shared/components/ToastProvider/ToastProvider'

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside <ToastProvider>.')
  }

  return context
}
