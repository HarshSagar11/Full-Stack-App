import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function SignupPage() {
  return (
    <Card className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
      <p className="text-sm text-muted-foreground">Create an account</p>
      <form className="my-2 flex w-full flex-col gap-2">
        <label htmlFor="email">Email*</label>
        <Input type="email" id="email" required autoComplete="email" name="email" />
        <label htmlFor="password">Password*</label>
        <Input type="password" id="password" required autoComplete="new-password" name="password" />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Log In
        </Link>
      </p>
    </Card>
  )
}
