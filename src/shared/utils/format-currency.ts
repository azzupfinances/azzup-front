// Money is always handled as integer cents to avoid floating point rounding errors.

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const amountFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(amountInCents: number) {
  return currencyFormatter.format(amountInCents / 100)
}

// Splits an amount into integer and cents so they can be styled separately (e.g. "1.250" and "49").
export function splitCurrency(amountInCents: number) {
  const [integer, cents] = amountFormatter.format(Math.abs(amountInCents) / 100).split(',')

  return { integer, cents }
}
