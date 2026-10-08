'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'
import {
  transactionFormSchema,
  type TransactionFormValues,
} from '@/shared/schemas/transaction-form.schema'

import styles from './TransactionForm.module.scss'

const TYPE_OPTIONS = [
  { value: 'expense' as const, label: 'Despesa' },
  { value: 'income' as const, label: 'Receita' },
]

const CATEGORY_OPTIONS = Object.values(TRANSACTION_CATEGORIES).map((category) => ({
  value: category.id,
  label: category.label,
}))

type TransactionFormProps = {
  // Lets a submit button outside the form (e.g. a modal footer) submit it.
  formId: string
  defaultValues: TransactionFormValues
  onSubmit: (values: TransactionFormValues) => void
}

export function TransactionForm({ formId, defaultValues, onSubmit }: TransactionFormProps) {
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
    </form>
  )
}
