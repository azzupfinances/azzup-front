'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { PhoneField } from '@/features/profile/components/PhoneField/PhoneField'
import { ProfileSection } from '@/features/profile/components/ProfileSection/ProfileSection'
import {
  personalInfoFormSchema,
  type PersonalInfoFormValues,
} from '@/features/profile/schemas/personal-info-form.schema'
import { formatPhone, getPhoneDigits } from '@/features/profile/utils/phone'
import { Button } from '@/shared/components/Button/Button'
import { TextField } from '@/shared/components/TextField/TextField'
import { useToast } from '@/shared/hooks/useToast'
import { useUserProfile } from '@/shared/hooks/useUserProfile'

import styles from './PersonalInfoForm.module.scss'

export function PersonalInfoForm() {
  const formId = useId()
  const { profile, updateProfile } = useUserProfile()
  const { showToast } = useToast()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: formatPhone(profile.phone),
    },
  })

  // Pending backend integration: update through the profile service (a new e-mail may need confirmation).
  function handleSave(values: PersonalInfoFormValues) {
    updateProfile({ fullName: values.fullName, email: values.email, phone: getPhoneDigits(values.phone) })
    reset(values)
    showToast({ tone: 'success', title: 'Dados atualizados' })
  }

  return (
    <ProfileSection
      title="Dados pessoais"
      description="Como você aparece no Azzup e como falamos com você."
      footer={
        <Button type="submit" form={formId} disabled={!isDirty || isSubmitting}>
          Salvar dados
        </Button>
      }
    >
      <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(handleSave)}>
        <TextField
          label="Nome completo"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <div className={styles.row}>
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            hint="Usado para recuperar sua senha."
            error={errors.email?.message}
            {...register('email')}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => <PhoneField error={fieldState.error?.message} {...field} />}
          />
        </div>
      </form>
    </ProfileSection>
  )
}
