import { Outlet } from 'react-router'
import { ThemeToggle } from '../components/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-svh items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}
