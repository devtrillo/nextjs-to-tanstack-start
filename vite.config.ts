import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  // React's plugin has to come after Start's.
  plugins: [tanstackStart(), viteReact()],
})
