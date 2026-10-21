import { defineConfig } from 'vite'
import { tanstackStartVite } from '@tanstack/start'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStartVite()
  ],
  // تم ضبط هذا السطر الإضافي لضمان توافق محرك البناء مع سيرفر Vercel السحابي
  server: {
    preset: 'vercel'
  }
})
