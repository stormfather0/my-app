import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-app/', // Must match your GitHub repo name with trailing slash
  plugins: [react()],
})