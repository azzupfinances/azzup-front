import { useContext } from 'react'

import { UserProfileContext } from '@/shared/components/UserProfileProvider/UserProfileProvider'

export function useUserProfile() {
  const context = useContext(UserProfileContext)

  if (!context) {
    throw new Error('useUserProfile must be used inside <UserProfileProvider>.')
  }

  return context
}
