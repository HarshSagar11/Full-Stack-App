import { Link, NavLink, Outlet } from 'react-router'
import { ThemeToggle } from '../components/ThemeToggle'
import { cn } from '../lib/cn'

export function AppLayout() {
  return (
    <div className="min-h-svh">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-semibold">
            Full Stack App
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4 text-sm">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  cn(
                    'hover:text-foreground',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )
                }
              >
                Home
              </NavLink>
              <Link to="/login" className="text-muted-foreground hover:text-foreground">
                Log in
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
