import { z } from 'zod'

export const statuses = ['open', 'in-progress', 'closed'] as const
export type Status = (typeof statuses)[number]

export type Issue = {
  id: number
  title: string
  status: Status
  author: string
  createdAt: string
}

export const issueSearch = z.object({
  status: z.enum(['all', ...statuses]).catch('all'),
  sort: z.enum(['newest', 'oldest']).catch('newest'),
})
export type IssueSearch = z.infer<typeof issueSearch>

export const newIssue = z.object({ title: z.string().trim().min(3).max(120) })

// In memory on purpose: the post is about the framework, not the database.
// It resets on restart, and on Workers each isolate has its own copy.
const issues: Issue[] = [
  { id: 1, title: 'Filters reset when you press back', status: 'open', author: 'ada', createdAt: '2026-10-01T09:00:00Z' },
  { id: 2, title: 'Dark mode flashes on first load', status: 'in-progress', author: 'grace', createdAt: '2026-10-03T14:30:00Z' },
  { id: 3, title: 'Login form forgets the email', status: 'closed', author: 'ada', createdAt: '2026-10-05T11:15:00Z' },
  { id: 4, title: 'Sort by oldest is ignored', status: 'open', author: 'linus', createdAt: '2026-10-09T16:45:00Z' },
]

export function listIssues({ status, sort }: IssueSearch): Issue[] {
  const rows = status === 'all' ? issues : issues.filter((i) => i.status === status)
  return rows.toSorted((a, b) =>
    sort === 'newest' ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt),
  )
}

export function issueStats() {
  return Object.fromEntries(statuses.map((s) => [s, issues.filter((i) => i.status === s).length])) as Record<Status, number>
}

export function createIssue(title: string, author: string): Issue {
  const issue: Issue = {
    id: issues.length + 1,
    title,
    status: 'open',
    author,
    createdAt: new Date().toISOString(),
  }
  issues.push(issue)
  return issue
}
