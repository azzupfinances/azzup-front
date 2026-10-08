'use client'

import { Upload } from 'lucide-react'

import { IconButton } from '@/shared/components/IconButton/IconButton'
import { useToast } from '@/shared/hooks/useToast'

// Secondary action, so it stays icon-only. Placeholder until the statement import flow
// (/azzup/extrato/importar) exists.
export function ImportStatementButton() {
  const { showToast } = useToast()

  return (
    <IconButton
      icon={Upload}
      label="Importar extrato do banco"
      variant="outline"
      onClick={() =>
        showToast({
          title: 'Importação em breve',
          description: 'Você vai poder enviar o extrato do banco em OFX ou CSV.',
        })
      }
    />
  )
}
