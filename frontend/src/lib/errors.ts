import axios from 'axios'

const GENERIC_MESSAGE = 'Something went wrong. Please try again.'

export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return GENERIC_MESSAGE

  if (!error.response) return "Can't reach the server. Please try again."

  const detail = error.response.data?.detail

  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) return detail[0]?.msg ?? GENERIC_MESSAGE

  return GENERIC_MESSAGE
}
