import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

//Creating an instance for aaxios todo!
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
