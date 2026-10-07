import { AuthSwitchLink } from '@/features/auth/components/AuthSwitchLink/AuthSwitchLink'
import { RegisterForm } from '@/features/auth/components/RegisterForm/RegisterForm'
import { SIGN_IN_HREF } from '@/shared/constants/routes'

export function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <AuthSwitchLink prompt="Já tem uma conta?" linkLabel="Entrar" href={SIGN_IN_HREF} />
    </>
  )
}
