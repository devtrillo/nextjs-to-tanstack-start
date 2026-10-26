import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rsc from '@vitejs/plugin-rsc'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    // Run the server build in workerd. Without childEnvironments the rsc
    // build is left out of the Worker and every request is a 500.
    cloudflare({ viteEnvironment: { name: 'ssr', childEnvironments: ['rsc'] } }),
    tanstackStart({ rsc: { enabled: true } }),
    rsc(),
    // React's plugin has to come after Start's.
    viteReact(),
  ],
})
