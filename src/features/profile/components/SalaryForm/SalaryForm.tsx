'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { ProfileSection } from '@/features/profile/components/ProfileSection/ProfileSection'
import { salaryFormSchema, type SalaryFormValues } from '@/features/profile/schemas/salary-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { useToast } from '@/shared/hooks/useToast'
import { useUserProfile } from '@/shared/hooks/useUserProfile'

import styles from './SalaryForm.module.scss'

export function SalaryForm() {
  const formId = useId()
  const { profile, updateProfile } = useUserProfile()
  const { showToast } = useToast()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<SalaryFormValues>({
    resolver: zodResolver(salaryFormSchema),
    mode: 'onTouched',
    defaultValues: { grossSalaryInCents: profile.grossSalaryInCents },
  })

  // Pending backend integration: update through the profile service.
  function handleSave(values: SalaryFormValues) {
    updateProfile(values)
    reset(values)
    showToast({ tone: 'success', title: 'Salário atualizado' })
  }

  return (
    <ProfileSection
      title="Salário"
      description="O valor registrado na sua carteira de trabalho."
      footer={
        <Button type="submit" form={formId} disabled={!isDirty || isSubmitting}>
          Salvar salário
        </Button>
      }
    >
      <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(handleSave)}>
        <Controller
          name="grossSalaryInCents"
          control={control}
          render={({ field, fieldState }) => (
            <CurrencyField
              label="Salário bruto"
              hint="Antes dos descontos de INSS, imposto de renda e benefícios."
              valueInCents={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </form>
    </ProfileSection>
  )
}
