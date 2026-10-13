'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'
import {
  MAX_INSTALLMENTS_COUNT,
  transactionFormSchema,
  type TransactionFormValues,
} from '@/shared/schemas/transaction-form.schema'
import type { CreditCard } from '@/shared/types/credit-card.types'
import { formatCurrency } from '@/shared/utils/format-currency'
import { splitIntoInstallments } from '@/shared/utils/installments'

import styles from './TransactionForm.module.scss'

const TYPE_OPTIONS = [
  { value: 'expense' as const, label: 'Despesa' },
  { value: 'income' as const, label: 'Receita' },
]

const PAYMENT_METHOD_OPTIONS = [
  { value: 'card' as const, label: 'Cartão' },
  { value: 'other' as const, label: 'Outro' },
]

const CATEGORY_OPTIONS = Object.values(TRANSACTION_CATEGORIES).map((category) => ({
  value: category.id,
  label: category.label,
}))

const INSTALLMENT_OPTIONS = Array.from({ length: MAX_INSTALLMENTS_COUNT }, (_, index) => ({
  value: String(index + 1),
  label: index === 0 ? 'À vista' : `${index + 1}x`,
}))

// "3x de R$ 33,34" or, when the cents do not divide evenly, "1x de R$ 33,34 + 2x de R$ 33,33".
function describeInstallments(totalInCents: number, count: number) {
  const installments = splitIntoInstallments(totalInCents, count)
  const first = installments[0]
  const last = installments[installments.length - 1]

  if (first === last) {
    return `${count}x de ${formatCurrency(first)}`
  }

  const largerCount = installments.filter((amount) => amount === first).length

  return `${largerCount}x de ${formatCurrency(first)} + ${count - largerCount}x de ${formatCurrency(last)}`
}

type TransactionFormProps = {
  // Lets a submit button outside the form (e.g. a modal footer) submit it.
  formId: string
  defaultValues: TransactionFormValues
  onSubmit: (values: TransactionFormValues) => void
  // Payment fields (card + installments) are shown only when cards are passed, i.e. for
  // new entries. Statement entries being edited keep them hidden.
  creditCards?: CreditCard[]
}

export function TransactionForm({ formId, defaultValues, onSubmit, creditCards }: TransactionFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    mode: 'onTouched',
    defaultValues,
  })
  const [type, paymentMethod, amountInCents, installmentsCount] = useWatch({
    control,
    name: ['type', 'paymentMethod', 'amountInCents', 'installmentsCount'],
  })
  const hasPaymentFields = creditCards !== undefined && type === 'expense'
  const hasCreditCards = creditCards !== undefined && creditCards.length > 0

  return (
    <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <SegmentedControl
            label="Tipo de transação"
            options={TYPE_OPTIONS}
            value={field.value}
            onValueChange={field.onChange}
            isFullWidth
          />
        )}
      />

      <Controller
        name="amountInCents"
        control={control}
        render={({ field, fieldState }) => (
          <CurrencyField
            label="Valor"
            valueInCents={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <TextField
        label="Descrição"
        placeholder="Ex.: Mercado, Uber, Salário"
        error={errors.description?.message}
        {...register('description')}
      />

      <div className={styles.row}>
        <Select
          label="Categoria"
          options={CATEGORY_OPTIONS}
          error={errors.categoryId?.message}
          {...register('categoryId')}
        />
        <TextField label="Data" type="date" error={errors.date?.message} {...register('date')} />
      </div>

      {hasPaymentFields && !hasCreditCards && (
        <p className={styles.note}>Para lançar no cartão de crédito, cadastre um cartão na tela Cartões.</p>
      )}

      {hasPaymentFields && hasCreditCards && (
        <div className={styles.payment}>
          {/* Visual label only: the segmented control already names itself for screen readers. */}
          <p className={styles.paymentLabel} aria-hidden="true">
            Forma de pagamento
          </p>

          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                label="Forma de pagamento"
                options={PAYMENT_METHOD_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                isFullWidth
              />
            )}
          />

          {paymentMethod === 'card' && (
            <div className={styles.row}>
              <Select
                label="Qual cartão"
                placeholder="Escolha o cartão"
                options={creditCards.map((creditCard) => ({ value: creditCard.id, label: creditCard.name }))}
                error={errors.creditCardId?.message}
                {...register('creditCardId')}
              />
              <Select
                label="Parcelas"
                options={INSTALLMENT_OPTIONS}
                hint={
                  installmentsCount > 1 && amountInCents > 0
                    ? describeInstallments(amountInCents, installmentsCount)
                    : undefined
                }
                error={errors.installmentsCount?.message}
                {...register('installmentsCount', { valueAsNumber: true })}
              />
            </div>
          )}
        </div>
      )}
    </form>
  )
}
