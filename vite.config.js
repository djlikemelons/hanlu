import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → die gebaute Seite funktioniert auf Netlify, GitHub Pages
// und sogar direkt vom Dateisystem (alle Pfade relativ).
export default defineConfig({
  base: './',
  plugins: [react()],
})
