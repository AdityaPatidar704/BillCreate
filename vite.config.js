import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['qrcode.react'], // Exclude qrcode.react from being optimized
  },
  base: '/BillCreate/',
  plugins: [react(), tailwindcss(),],
  
})
