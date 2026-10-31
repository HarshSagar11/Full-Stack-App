import { Link, useNavigate } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useForm } from 'react-hook-form'
import { signupSchema, type SignupFormValues } from '../schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '../components/ui/FormField'
import { signup } from '../api/auth'
import { getErrorMessage } from '../lib/errors'

export function SignupPage() {
  const { register, handleSubmit, formState, setError } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  })
  const navigate = useNavigate()

  const { errors, isSubmitting } = formState

  async function onSubmit(values: SignupFormValues) {
    const payload = {
      email: values.email,
      password: values.password,
    }
    try {
      await signup(payload)
      navigate('/login', { replace: true, state: { email: values.email } })
    } catch (e) {
      const errorMessage = getErrorMessage(e)
      setError('root', { message: errorMessage })
    }
  }

  return (
    <Card className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
      <p className="text-sm text-muted-foreground">Create an account</p>
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
          autoComplete="new-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <FormField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          required
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
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
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  )
}
