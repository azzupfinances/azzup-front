'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'
import { PAYMENT_METHODS } from '@/shared/constants/payment-methods'
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

const PAYMENT_METHOD_OPTIONS = Object.values(PAYMENT_METHODS).map((method) => ({
  value: method.id,
  label: method.label,
}))

// Editing a statement entry cannot turn it into a card purchase (that creates installments).
const NON_CARD_PAYMENT_METHOD_OPTIONS = PAYMENT_METHOD_OPTIONS.filter((option) => option.value !== 'creditCard')

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
  // Credit card is offered only when cards are passed, i.e. for new entries. Statement
  // entries being edited can switch between the other payment methods.
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
  const canUseCreditCard = creditCards !== undefined && creditCards.length > 0

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

      {type === 'expense' && (
        <Select
          label="Forma de pagamento"
          options={canUseCreditCard ? PAYMENT_METHOD_OPTIONS : NON_CARD_PAYMENT_METHOD_OPTIONS}
          hint={
            creditCards?.length === 0
              ? 'Para lançar no cartão de crédito, cadastre um cartão na tela Cartões.'
              : undefined
          }
          error={errors.paymentMethod?.message}
          {...register('paymentMethod')}
        />
      )}

      {type === 'expense' && canUseCreditCard && paymentMethod === 'creditCard' && (
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
    </form>
  )
}
