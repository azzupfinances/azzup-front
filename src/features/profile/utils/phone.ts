// DDD (2 digits) + 8 digits for landlines or 9 for mobiles.
const PHONE_MAX_LENGTH = 11
const PHONE_MIN_LENGTH = 10

export function getPhoneDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH)
}

// Progressive mask: (11) 98765-4321 or (11) 3456-7890
export function formatPhone(value: string) {
  const digits = getPhoneDigits(value)

  if (digits.length <= 2) {
    return digits.replace(/(\d{1,2})/, '($1')
  }

  const areaCode = digits.slice(0, 2)
  const number = digits.slice(2)
  const prefixLength = number.length > 8 ? 5 : 4
  const prefix = number.slice(0, prefixLength)
  const suffix = number.slice(prefixLength)

  return suffix ? `(${areaCode}) ${prefix}-${suffix}` : `(${areaCode}) ${prefix}`
}

export function isValidPhone(value: string) {
  const digits = getPhoneDigits(value)

  return digits.length >= PHONE_MIN_LENGTH && !digits.startsWith('0')
}
