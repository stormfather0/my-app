import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Update the base option to '/'
  plugins: [react(),
    // tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    entry: '/src/main.jsx',
  },
})