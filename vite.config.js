import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repoBase = '/wedding-invite/'

// https://vite.dev/config/
export default defineConfig({
  base: isGithubActions ? repoBase : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})
