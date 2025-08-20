// If your repo name is different, change "/Portpolio/" accordingly.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Portpolio/",
  plugins: [react()],
})
