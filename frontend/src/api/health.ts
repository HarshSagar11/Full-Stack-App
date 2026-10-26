import { api } from '../lib/api'

// Mirrors the backend response of GET /health: {"status": "ok"}
export type HealthResponse = {
  status: string
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>('/health', { signal })
  return response.data
}
