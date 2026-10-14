export type UserProfile = {
  fullName: string
  email: string
  // Digits only (DDD + number).
  phone: string
  // Data URL of the chosen photo; null shows the initials.
  photoUrl: string | null
  grossSalaryInCents: number
}
