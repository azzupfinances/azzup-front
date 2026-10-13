'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  creditCardFormSchema,
  type CreditCardFormValues,
} from '@/features/credit-cards/schemas/credit-card-form.schema'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'

import styles from './CreditCardForm.module.scss'

const DUE_DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => ({
  value: String(index + 1),
  label: `Dia ${index + 1}`,
}))

type CreditCardFormProps = {
  // Lets a submit button outside the form (e.g. a modal footer) submit it.
  formId: string
  defaultValues: CreditCardFormValues
  onSubmit: (values: CreditCardFormValues) => void
}

export function CreditCardForm({ formId, defaultValues, onSubmit }: CreditCardFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardFormSchema),
    mode: 'onTouched',
    defaultValues,
  })

  return (
    <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome do cartão"
        placeholder="Ex.: Nubank, Inter, Itaú"
        error={errors.name?.message}
        {...register('name')}
      />

      <div className={styles.row}>
        <Controller
          name="limitInCents"
          control={control}
          render={({ field, fieldState }) => (
            <CurrencyField
              label="Limite"
              valueInCents={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <Select
          label="Vencimento da fatura"
          options={DUE_DAY_OPTIONS}
          error={errors.dueDay?.message}
          {...register('dueDay', { valueAsNumber: true })}
        />
      </div>
    </form>
  )
}
