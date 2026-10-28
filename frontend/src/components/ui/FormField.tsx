import { useId, type ComponentProps } from 'react'
import { Input } from './Input'

type FormFieldProps = ComponentProps<typeof Input> & {
  label: string
  error?: string
}

export function FormField({ label, error, id, ...props }: FormFieldProps) {
  const uniqueId = useId()
  const formId = id ?? uniqueId
  const errorId = `${formId}-error`
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor={formId}>
        {label}
      </label>
      <Input
        {...props}
        id={formId}
        invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
