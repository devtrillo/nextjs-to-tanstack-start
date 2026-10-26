import { createServerFn } from '@tanstack/react-start'
import { renderServerComponent } from '@tanstack/react-start/rsc'
import { authMiddleware } from './auth'
import { issueStats } from './db'

// Rendered on the server; the browser gets the output, never this code.
function Stats() {
  const stats = issueStats()
  return (
    <p className="stats">
      <span>{stats.open} open</span>
      <span>{stats['in-progress']} in progress</span>
      <span>{stats.closed} closed</span>
    </p>
  )
}

export const getStats = createServerFn()
  .middleware([authMiddleware])
  .handler(async () => ({ Stats: await renderServerComponent(<Stats />) }))
