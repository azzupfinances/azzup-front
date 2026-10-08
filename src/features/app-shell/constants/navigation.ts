import { ArrowLeftRight, CalendarClock, House, UserRound, type LucideIcon } from 'lucide-react'

import { BILLS_HREF, PROFILE_HREF, SYSTEM_HOME_HREF, TRANSACTIONS_HREF } from '@/shared/constants/routes'

export type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Início', href: SYSTEM_HOME_HREF, icon: House },
  { label: 'Extrato', href: TRANSACTIONS_HREF, icon: ArrowLeftRight },
  { label: 'Contas', href: BILLS_HREF, icon: CalendarClock },
  { label: 'Perfil', href: PROFILE_HREF, icon: UserRound },
]

// Placeholder until the session exists.
export const CURRENT_USER = {
  name: 'Marina Costa',
  email: 'marina@email.com',
  initials: 'MC',
}
