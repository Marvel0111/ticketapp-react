// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👈 Explicitly set the base path to your repository name
  base: '/ticketapp-react/', 
})