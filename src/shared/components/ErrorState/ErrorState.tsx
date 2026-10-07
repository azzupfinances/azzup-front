import { RotateCw, TriangleAlert } from 'lucide-react'

import { Button } from '@/shared/components/Button/Button'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'

type ErrorStateProps = {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Não foi possível carregar',
  description = 'Verifique sua conexão e tente novamente.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={TriangleAlert}
      tone="danger"
      title={title}
      description={description}
      className={className}
      action={
        onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCw size={16} aria-hidden="true" />
            Tentar novamente
          </Button>
        )
      }
    />
  )
}
