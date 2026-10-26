import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error('VITE_API_URL is not set. Copy frontend/.env.example to frontend/.env.')
}

// Shared HTTP client for the FastAPI backend. Every API call goes through this
// instance, so base URL, credentials, and (later) auth headers and token
// refresh are configured in one place.
export const api = axios.create({
  baseURL,
  // Send and receive cookies (the httpOnly refresh token) on cross-origin requests.
  withCredentials: true,
  timeout: 10_000,
})
