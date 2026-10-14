// "Marina Costa Silva" → "MS": first and last names, like most avatars do.
export function getInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/).filter(Boolean)

  if (names.length === 0) {
    return ''
  }

  const first = names[0][0]
  const last = names.length > 1 ? names[names.length - 1][0] : ''

  return `${first}${last}`.toUpperCase()
}
