import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'theme'

function getStoredTheme(): Theme {
  try {
    const theme = localStorage.getItem(STORAGE_KEY)
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      return theme
    }
  } catch (e) {
    console.error(e)
  }
  return 'system'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function applyTheme() {
      const dark = theme === 'dark' || (theme === 'system' && media.matches)
      document.documentElement.classList.toggle('dark', dark)
    }

    applyTheme()
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage unavailable: the theme still applies for this session.
    }

    if (theme !== 'system') return

    media.addEventListener('change', applyTheme)

    return () => media.removeEventListener('change', applyTheme)
  }, [theme])
  return { theme, setTheme }
}
