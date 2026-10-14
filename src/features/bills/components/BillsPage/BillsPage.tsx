import { BillsManager } from '@/features/bills/components/BillsManager/BillsManager'

// The whole screen reacts to the same in-memory bills (header button, summary, lists and
// modals), so its content lives in one client component.
export function BillsPage() {
  return <BillsManager />
}
