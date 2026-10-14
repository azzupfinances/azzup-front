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
import { BANKS, type BankId } from '@/shared/constants/banks'

import styles from './CreditCardForm.module.scss'

const BANK_OPTIONS = Object.values(BANKS).map((bank) => ({ value: bank.id, label: bank.name }))

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
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardFormSchema),
    mode: 'onTouched',
    defaultValues,
  })

  // Saves typing: the bank name becomes the card name until the user writes one.
  function handleBankChange(bankId: BankId) {
    if (bankId !== 'other' && getValues('name').trim() === '') {
      setValue('name', BANKS[bankId].name, { shouldValidate: true })
    }
  }

  return (
    <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Banco"
        options={BANK_OPTIONS}
        hint="Dá a cor e o logo do cartão."
        error={errors.bankId?.message}
        {...register('bankId', { onChange: (event) => handleBankChange(event.target.value as BankId) })}
      />

      <TextField
        label="Nome do cartão"
        placeholder="Ex.: Nubank Ultravioleta"
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
