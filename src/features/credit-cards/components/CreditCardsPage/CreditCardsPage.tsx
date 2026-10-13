import { CreditCardsManager } from '@/features/credit-cards/components/CreditCardsManager/CreditCardsManager'

// The whole screen reacts to the same in-memory cards (header button, list and modals),
// so its content lives in one client component.
export function CreditCardsPage() {
  return <CreditCardsManager />
}
