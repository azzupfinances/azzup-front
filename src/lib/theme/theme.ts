export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'azzup-theme'

// Runs inline in <head> before first paint, so a saved dark theme never flashes light.
// Only paths under `scopePath` (the logged-in system) may turn dark.
export function getThemeInitScript(scopePath: string) {
  return `try{if(location.pathname.startsWith('${scopePath}')&&localStorage.getItem('${THEME_STORAGE_KEY}')==='dark'){document.documentElement.dataset.theme='dark'}}catch(e){}`
}

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark'
  } else {
    delete document.documentElement.dataset.theme
  }
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

// Light is the default, so it is stored as the absence of the key.
export function setTheme(theme: Theme) {
  applyTheme(theme)

  try {
    if (theme === 'dark') {
      localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY)
    }
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

// Used when entering the system through client-side navigation (e.g. right after login).
export function applyStoredTheme() {
  applyTheme(readStoredTheme())
}

// Used when leaving the system: public pages are always light, but the preference is kept.
export function clearAppliedTheme() {
  applyTheme('light')
}
