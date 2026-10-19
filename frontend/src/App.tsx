// TEMPORARY style guide to preview the design tokens in light and dark mode.
// Replaced by real pages and routing in step 4b.

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
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Toggle theme
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map(([name, className]) => (
          <div key={name} className="space-y-1">
            <div className={`h-14 rounded-lg border border-border ${className}`} />
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-surface p-6 text-surface-foreground shadow-sm">
        <h2 className="text-lg font-semibold">Sign in</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          A card built only from token classes.
        </p>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
          />
          <p className="text-sm text-destructive">Please enter a valid email address.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Primary
          </button>
          <button
            type="button"
            className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            Secondary
          </button>
          <button
            type="button"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Outline
          </button>
          <button
            type="button"
            className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Ghost
          </button>
          <button
            type="button"
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            Destructive
          </button>
          <button
            type="button"
            disabled
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Disabled
          </button>
        </div>

        <p className="mt-6 text-sm text-success">Account created successfully.</p>
        <p className="mt-2 text-sm">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign up
          </a>
        </p>
      </section>
    </main>
  )
}

export default App
