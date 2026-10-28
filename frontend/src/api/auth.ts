import { api } from '../lib/api'
import type { LoginFormValues, SignupFormValues } from '../schemas/auth'

export type User = {
  id: number
  email: string
  is_active: boolean
  created_at: string
}

export type TokenResponse = {
  access_token: string
  token_type: string
}

export type SignupRequest = Omit<SignupFormValues, 'confirmPassword'>

export async function signup(data: SignupRequest): Promise<User> {
  const response = await api.post<User>('/auth/signup', data)
  return response.data
}

export async function login(data: LoginFormValues): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>('/auth/login', data)
  return response.data
}
