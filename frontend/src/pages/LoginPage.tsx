import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useForm } from 'react-hook-form'
import { type LoginFormValues, loginSchema } from '../schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../api/auth'
import { getErrorMessage } from '../lib/errors'
import { FormField } from '../components/ui/FormField'
import { useEffect } from 'react'

function getEmailFromState(state: unknown): string | undefined {
  if (
    typeof state === 'object' &&
    state !== null &&
    'email' in state &&
    typeof state.email === 'string'
  ) {
    return state.email
  }
  return undefined
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const emailFromSignup = getEmailFromState(location.state)

  const { register, handleSubmit, formState, setError, setFocus } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: emailFromSignup ?? '', password: '' },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (emailFromSignup) setFocus('password')
  }, [emailFromSignup, setFocus])

  const { errors, isSubmitting } = formState

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values)
      navigate('/', { replace: true })
    } catch (e) {
      const errorMessage = getErrorMessage(e)
      setError('root', { message: errorMessage })
    }
  }

  return (
    <Card className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <p className="text-sm text-muted-foreground">Welcome back</p>
      {emailFromSignup && (
        <p
          role="status"
          className="rounded-md border border-success/50 bg-success/10 px-3 py-2 text-sm text-success"
        >
          Account created. Please log in.
        </p>
      )}
      <form
        className="my-2 flex w-full flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />
        {errors.root && (
          <p
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {errors.root.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  )
}
