const CPF_LENGTH = 11

export function getCpfDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, CPF_LENGTH)
}

// Progressive mask: 000.000.000-00
export function formatCpf(value: string) {
  return getCpfDigits(value)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function getCheckDigit(digits: number[]) {
  const weightStart = digits.length + 1
  const sum = digits.reduce((total, digit, index) => total + digit * (weightStart - index), 0)
  const remainder = (sum * 10) % 11

  return remainder === 10 ? 0 : remainder
}

export function isValidCpf(value: string) {
  const digits = getCpfDigits(value).split('').map(Number)

  // Repeated sequences (111.111.111-11) pass the checksum but are not valid CPFs.
  if (digits.length !== CPF_LENGTH || digits.every((digit) => digit === digits[0])) {
    return false
  }

  const firstCheckDigit = getCheckDigit(digits.slice(0, 9))
  const secondCheckDigit = getCheckDigit(digits.slice(0, 10))

  return firstCheckDigit === digits[9] && secondCheckDigit === digits[10]
}
