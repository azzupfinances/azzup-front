import { AuthSwitchLink } from '@/features/auth/components/AuthSwitchLink/AuthSwitchLink'
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm'
import { SIGN_UP_HREF } from '@/shared/constants/routes'

export function LoginPage() {
  return (
    <>
      <LoginForm />
      <AuthSwitchLink prompt="Ainda não tem uma conta?" linkLabel="Criar conta" href={SIGN_UP_HREF} />
    </>
  )
}
