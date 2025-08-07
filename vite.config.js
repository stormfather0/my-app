import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/my-app/', // Your GitHub repo name with trailing slash
  plugins: [react(), tailwindcss()],
})