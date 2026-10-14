// Banks offered when creating a credit card. Logos come from the `logos-bancos-br` package
// (official Open Finance artwork, files named by ISPB there) and were copied to
// `public/bank-logos/`. They are the banks' trademarks, used only to identify the card's bank.
// Brand colors are approximations picked for the card visual.
export type BankId =
  | 'nubank'
  | 'inter'
  | 'itau'
  | 'bradesco'
  | 'santander'
  | 'banco-do-brasil'
  | 'caixa'
  | 'c6-bank'
  | 'btg-pactual'
  | 'xp'
  | 'mercado-pago'
  | 'picpay'
  | 'pagbank'
  | 'neon'
  | 'sicoob'
  | 'sicredi'
  | 'other'

export type Bank = {
  id: BankId
  name: string
  // `null` for "Outro banco", shown with a generic card icon.
  logoSrc: string | null
  brandColor: string
}

function createBank(id: Exclude<BankId, 'other'>, name: string, brandColor: string): Bank {
  return { id, name, logoSrc: `/bank-logos/${id}.svg`, brandColor }
}

export const BANKS: Record<BankId, Bank> = {
  nubank: createBank('nubank', 'Nubank', '#820ad1'),
  inter: createBank('inter', 'Inter', '#ff7a00'),
  itau: createBank('itau', 'Itaú', '#ec7000'),
  bradesco: createBank('bradesco', 'Bradesco', '#cc092f'),
  santander: createBank('santander', 'Santander', '#ec0000'),
  'banco-do-brasil': createBank('banco-do-brasil', 'Banco do Brasil', '#0038a8'),
  caixa: createBank('caixa', 'Caixa', '#005ca9'),
  'c6-bank': createBank('c6-bank', 'C6 Bank', '#242424'),
  'btg-pactual': createBank('btg-pactual', 'BTG Pactual', '#0b2a5b'),
  xp: createBank('xp', 'XP', '#1b1b1b'),
  'mercado-pago': createBank('mercado-pago', 'Mercado Pago', '#009ee3'),
  picpay: createBank('picpay', 'PicPay', '#11a75c'),
  pagbank: createBank('pagbank', 'PagBank', '#0a8a6b'),
  neon: createBank('neon', 'Neon', '#0090d4'),
  sicoob: createBank('sicoob', 'Sicoob', '#003641'),
  sicredi: createBank('sicredi', 'Sicredi', '#3c8f1c'),
  other: { id: 'other', name: 'Outro banco', logoSrc: null, brandColor: '#1d6fe8' },
}

export const BANK_IDS = Object.keys(BANKS) as [BankId, ...BankId[]]
