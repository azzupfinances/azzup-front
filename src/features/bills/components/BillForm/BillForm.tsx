'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { billFormSchema, type BillFormValues } from '@/features/bills/schemas/bill-form.schema'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'

import styles from './BillForm.module.scss'

const CATEGORY_OPTIONS = Object.values(TRANSACTION_CATEGORIES).map((category) => ({
  value: category.id,
  label: category.label,
}))

const DUE_DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => ({
  value: String(index + 1),
  label: `Dia ${index + 1}`,
}))

type BillFormProps = {
  // Lets a submit button outside the form (e.g. a modal footer) submit it.
  formId: string
  defaultValues: BillFormValues
  onSubmit: (values: BillFormValues) => void
}

export function BillForm({ formId, defaultValues, onSubmit }: BillFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    mode: 'onTouched',
    defaultValues,
  })

  return (
    <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome da conta"
        placeholder="Ex.: Aluguel, Internet, Academia"
        error={errors.name?.message}
        {...register('name')}
      />

      <div className={styles.row}>
        <Controller
          name="amountInCents"
          control={control}
          render={({ field, fieldState }) => (
            <CurrencyField
              label="Valor mensal"
              valueInCents={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <Select
          label="Vencimento"
          options={DUE_DAY_OPTIONS}
          error={errors.dueDay?.message}
          {...register('dueDay', { valueAsNumber: true })}
        />
      </div>

      <Select
        label="Categoria"
        options={CATEGORY_OPTIONS}
        error={errors.categoryId?.message}
        {...register('categoryId')}
      />
    </form>
  )
}
