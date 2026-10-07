'use client'

import { useState } from 'react'

import { Button } from '@/shared/components/Button/Button'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { Modal } from '@/shared/components/Modal/Modal'
import { TextField } from '@/shared/components/TextField/TextField'
import { useToast } from '@/shared/hooks/useToast'

import styles from './OverlaysDemo.module.scss'

export function OverlaysDemo() {
  const { showToast } = useToast()
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [amountInCents, setAmountInCents] = useState(0)

  function handleSave() {
    setIsFormModalOpen(false)
    showToast({ tone: 'success', title: 'Lançamento salvo', description: 'Mercado · R$ 320,00' })
  }

  function handleDelete() {
    setIsConfirmModalOpen(false)
    showToast({ tone: 'error', title: 'Conta excluída' })
  }

  return (
    <div className={styles.demo}>
      <div className={styles.row}>
        <Button onClick={() => setIsFormModalOpen(true)}>Novo lançamento</Button>
        <Button variant="outline" onClick={() => setIsConfirmModalOpen(true)}>
          Confirmar exclusão
        </Button>
      </div>

      <div className={styles.row}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => showToast({ tone: 'success', title: 'Conta marcada como paga' })}
        >
          Toast de sucesso
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            showToast({
              tone: 'error',
              title: 'Não foi possível salvar',
              description: 'Tente novamente em instantes.',
            })
          }
        >
          Toast de erro
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => showToast({ title: 'Seu salário cai em 3 dias' })}
        >
          Toast informativo
        </Button>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Novo lançamento"
        description="No celular abre como painel de baixo; no desktop, centralizado."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </>
        }
      >
        <div className={styles.form}>
          <TextField label="Descrição" placeholder="Ex.: Mercado do mês" />
          <CurrencyField label="Valor" valueInCents={amountInCents} onValueChange={setAmountInCents} />
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Excluir conta?"
        description="A conta de luz e os próximos vencimentos serão removidos. Essa ação não pode ser desfeita."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          </>
        }
      />
    </div>
  )
}
