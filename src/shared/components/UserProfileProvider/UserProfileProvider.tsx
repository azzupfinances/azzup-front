'use client'

import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'

import { SAMPLE_USER_PROFILE } from '@/shared/constants/user-profile-sample'
import type { UserProfile } from '@/shared/types/user-profile.types'

type UserProfileContextValue = {
  profile: UserProfile
  updateProfile: (changes: Partial<UserProfile>) => void
}

export const UserProfileContext = createContext<UserProfileContextValue | null>(null)

type UserProfileProviderProps = {
  children: ReactNode
}

// Visual phase: the profile lives in memory, shared by the app shell (avatar, name) and the
// profile screen, and resets on reload.
// Pending backend integration: replace with the profile service and React Query.
export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [profile, setProfile] = useState(SAMPLE_USER_PROFILE)

  const updateProfile = useCallback((changes: Partial<UserProfile>) => {
    setProfile((current) => ({ ...current, ...changes }))
  }, [])

  const contextValue = useMemo(() => ({ profile, updateProfile }), [profile, updateProfile])

  return <UserProfileContext.Provider value={contextValue}>{children}</UserProfileContext.Provider>
}
