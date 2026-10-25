import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>404 "Page not found"</h1>
      <Link to="/" className="mt-4 inline-block text-primary hover:underline">
        Return to Home
      </Link>
    </div>
  )
}
