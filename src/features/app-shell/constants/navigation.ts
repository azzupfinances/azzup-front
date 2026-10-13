import { ArrowLeftRight, CalendarClock, CreditCard, House, UserRound, type LucideIcon } from 'lucide-react'

import {
  BILLS_HREF,
  CREDIT_CARDS_HREF,
  PROFILE_HREF,
  SYSTEM_HOME_HREF,
  TRANSACTIONS_HREF,
} from '@/shared/constants/routes'

export type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  // The bottom navigation fits four tabs around the new transaction button; other screens
  // are reached from the sidebar on desktop and from links inside the screens on phones.
  isInBottomNav: boolean
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Início', href: SYSTEM_HOME_HREF, icon: House, isInBottomNav: true },
  { label: 'Extrato', href: TRANSACTIONS_HREF, icon: ArrowLeftRight, isInBottomNav: true },
  { label: 'Contas', href: BILLS_HREF, icon: CalendarClock, isInBottomNav: true },
  { label: 'Cartões', href: CREDIT_CARDS_HREF, icon: CreditCard, isInBottomNav: false },
  { label: 'Perfil', href: PROFILE_HREF, icon: UserRound, isInBottomNav: true },
]

// Placeholder until the session exists.
export const CURRENT_USER = {
  name: 'Marina Costa',
  email: 'marina@email.com',
  initials: 'MC',
}
