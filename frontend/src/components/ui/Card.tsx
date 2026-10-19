import { type ComponentProps } from 'react'
import { cn } from '../../lib/cn'

type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface p-6 text-surface-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}
