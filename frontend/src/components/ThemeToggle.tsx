import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '../hooks/useTheme'
import { cn } from '../lib/cn'

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  function switchTheme(value: Theme) {
    setTheme(value)
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex gap-1 rounded-lg border border-border bg-muted p-1"
    >
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          onClick={() => switchTheme(value)}
          aria-pressed={value === theme}
          className={cn(
            'rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground',
            value === theme && 'bg-surface text-foreground shadow-sm',
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}
