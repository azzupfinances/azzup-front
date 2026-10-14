'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { ProfileSection } from '@/features/profile/components/ProfileSection/ProfileSection'
import {
  changePasswordFormSchema,
  type ChangePasswordFormValues,
} from '@/features/profile/schemas/change-password-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { PasswordField } from '@/shared/components/PasswordField/PasswordField'
import { PASSWORD_MIN_LENGTH } from '@/shared/constants/password'
import { useToast } from '@/shared/hooks/useToast'

import styles from './ChangePasswordForm.module.scss'

const EMPTY_VALUES: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
}

export function ChangePasswordForm() {
  const formId = useId()
  const { showToast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: 'onTouched',
    defaultValues: EMPTY_VALUES,
  })

  // Pending backend integration: change the password through the auth service, which checks
  // the current one.
  function handleChangePassword(_values: ChangePasswordFormValues) {
    reset(EMPTY_VALUES)
    showToast({ tone: 'success', title: 'Senha alterada' })
  }

  return (
    <ProfileSection
      title="Senha"
      description="Preencha só se quiser trocar a senha de acesso."
      footer={
        <Button type="submit" form={formId} disabled={!isDirty || isSubmitting}>
          Alterar senha
        </Button>
      }
    >
      <form id={formId} className={styles.form} noValidate onSubmit={handleSubmit(handleChangePassword)}>
        <PasswordField
          label="Senha atual"
          autoComplete="current-password"
          className={styles.currentPassword}
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />

        <PasswordField
          label="Nova senha"
          autoComplete="new-password"
          hint={`Mínimo de ${PASSWORD_MIN_LENGTH} caracteres.`}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <PasswordField
          label="Confirmar nova senha"
          autoComplete="new-password"
          error={errors.newPasswordConfirmation?.message}
          {...register('newPasswordConfirmation')}
        />
      </form>
    </ProfileSection>
  )
}
