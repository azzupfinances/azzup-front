import { Banknote, Barcode, CreditCard, Landmark, QrCode, type LucideIcon } from 'lucide-react'

export type PaymentMethodId = 'pix' | 'creditCard' | 'debit' | 'cash' | 'boleto'

export type PaymentMethod = {
  id: PaymentMethodId
  label: string
  icon: LucideIcon
}

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethod> = {
  pix: { id: 'pix', label: 'Pix', icon: QrCode },
  creditCard: { id: 'creditCard', label: 'Cartão de crédito', icon: CreditCard },
  debit: { id: 'debit', label: 'Débito', icon: Landmark },
  cash: { id: 'cash', label: 'Dinheiro', icon: Banknote },
  boleto: { id: 'boleto', label: 'Boleto', icon: Barcode },
}
