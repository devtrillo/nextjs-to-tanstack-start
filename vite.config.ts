import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rsc from '@vitejs/plugin-rsc'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  // React's plugin has to come after Start's.
  plugins: [tanstackStart({ rsc: { enabled: true } }), rsc(), viteReact()],
})
