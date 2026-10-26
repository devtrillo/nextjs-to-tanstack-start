import { issueStats } from '@/lib/issues'

// A server component: it runs on the server and ships no JavaScript.
export function Stats() {
  const stats = issueStats()
  return (
    <p className="stats">
      <span>{stats.open} open</span>
      <span>{stats['in-progress']} in progress</span>
      <span>{stats.closed} closed</span>
    </p>
  )
}
