import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  return (
    <Card className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
      <p className="text-sm text-muted-foreground">Welcome back</p>
      <form className="my-2 flex w-full flex-col gap-2">
        <label htmlFor="email">Email*</label>
        <Input type="email" id="email" required autoComplete="email" name="email" />
        <label htmlFor="password">Password*</label>
        <Input
          type="password"
          id="password"
          required
          autoComplete="current-password"
          name="password"
        />
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign Up
        </Link>
      </p>
    </Card>
  )
}
