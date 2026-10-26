import { useEffect, useState } from 'react'
import { getHealth } from '../api/health'
import { cn } from '../lib/cn'

type Status = 'checking' | 'online' | 'offline'

const labels: Record<Status, string> = {
  checking: 'Checking API…',
  online: 'API online',
  offline: 'API offline',
}

const dotColors: Record<Status, string> = {
  checking: 'bg-muted-foreground',
  online: 'bg-success',
  offline: 'bg-destructive',
}

export function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    const controller = new AbortController()

    getHealth(controller.signal)
      .then(() => setStatus('online'))
      .catch(() => {
        if (!controller.signal.aborted) setStatus('offline')
      })

    return () => controller.abort()
  }, [])

  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground" role="status">
      <span className={cn('size-2 rounded-full', dotColors[status])} aria-hidden="true" />
      {labels[status]}
    </span>
  )
}
