/// <reference types="vite/client" />

// Types for the variables in frontend/.env (only VITE_-prefixed ones reach the browser).
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
