'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import {
  MAX_RECEIVABLE_INSTALLMENTS_COUNT,
  receivableFormSchema,
  type ReceivableFormValues,
} from '@/features/bills/schemas/receivable-form.schema'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { Select } from '@/shared/components/Select/Select'
import { TextField } from '@/shared/components/TextField/TextField'
import { formatCurrency } from '@/shared/utils/format-currency'
import { splitIntoInstallments } from '@/shared/utils/installments'

import styles from './ReceivableForm.module.scss'

const INSTALLMENT_OPTIONS = Array.from({ length: MAX_RECEIVABLE_INSTALLMENTS_COUNT }, (_, index) => ({
  value: String(index + 1),
  label: index === 0 ? 'Parcela única' : `${index + 1}x`,
}))

type ReceivableFormProps = {
  // Lets a submit button outside the form (e.g. a modal footer) submit it.
  formId: string
  defaultValues: ReceivableFormValues
  onSubmit: (values: ReceivableFormValues) => void
}

export function ReceivableForm({ formId, defaultValues, onSubmit }: ReceivableFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceivableFormValues>({
    resolver: zodResolver(receivableFormSchema),
    mode: 'onTouched',
    defaultValues,
  })
  const [totalInCents, installmentsCount] = useWatch({ control, name: ['totalInCents', 'installmentsCount'] })
  const installmentHint =
    totalInCents > 0 && installmentsCount > 1
      ? `${installmentsCount}x de ${formatCurrency(splitIntoInstallments(totalInCents, installmentsCount)[0])}`
      : undefined

  return (
    <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <TextField
          label="Descrição"
          placeholder="Ex.: Empréstimo, venda"
          error={errors.description?.message}
          {...register('description')}
        />
        <TextField
          label="Quem vai pagar"
          placeholder="Ex.: Pedro"
          error={errors.payerName?.message}
          {...register('payerName')}
        />
      </div>

      <div className={styles.row}>
        <Controller
          name="totalInCents"
          control={control}
          render={({ field, fieldState }) => (
            <CurrencyField
              label="Valor total"
              valueInCents={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <Select
          label="Parcelas"
          options={INSTALLMENT_OPTIONS}
          hint={installmentHint}
          error={errors.installmentsCount?.message}
          {...register('installmentsCount', { valueAsNumber: true })}
        />
      </div>

      <TextField
        label="Primeira parcela"
        type="date"
        hint="As próximas caem no mesmo dia dos meses seguintes."
        error={errors.firstDueDate?.message}
        {...register('firstDueDate')}
      />
    </form>
  )
}
