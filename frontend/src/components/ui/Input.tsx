import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

type InputProps = ComponentProps<'input'> & {
  invalid?: boolean
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid}
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
        invalid && 'border-destructive',
      )}
      {...props}
    />
  )
}
