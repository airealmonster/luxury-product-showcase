import { defineConfig } from 'vite'
import { tanstackStartVite } from '@tanstack/start-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStartVite()
  ],
  nitro: {
    preset: 'vercel'
  }
})
