// TEMPORARY style guide to preview the design tokens in light and dark mode.
// Replaced by real pages and routing in step 4b.
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Input } from './components/ui/Input'

const swatches = [
  ['background', 'bg-background'],
  ['surface', 'bg-surface'],
  ['muted', 'bg-muted'],
  ['primary', 'bg-primary'],
  ['secondary', 'bg-secondary'],
  ['destructive', 'bg-destructive'],
  ['success', 'bg-success'],
  ['border', 'bg-border'],
] as const

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

function App() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Design tokens</h1>
          <p className="text-sm text-muted-foreground">
            Temporary preview of the light and dark themes.
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={toggleTheme}
        >
          Toggle theme
        </Button>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map(([name, className]) => (
          <div key={name} className="space-y-1">
            <div className={`h-14 rounded-lg border border-border ${className}`} />
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        ))}
      </section>

      <Card>
        <h2 className="text-lg font-semibold">Sign in</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          A card built only from token classes.
        </p>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            invalid
          />
          <p className="text-sm text-destructive">Please enter a valid email address.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button>
            Primary
          </Button>
          <Button variant='secondary'>
            Secondary
          </Button>
          <Button variant='outline'>
            Outline
          </Button>
          <Button variant='ghost'>
            Ghost
          </Button>
          <Button variant='destructive'>
            Destructive
          </Button>
          <Button disabled>
            Disabled
          </Button>
        </div>

        <p className="mt-6 text-sm text-success">Account created successfully.</p>
        <p className="mt-2 text-sm">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign up
          </a>
        </p>
      </Card>
    </main>
  )
}

export default App
