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
  status: z.enum(['all', ...statuses]).default('all').catch('all'),
  sort: z.enum(['newest', 'oldest']).default('newest').catch('newest'),
})
export type IssueSearch = z.infer<typeof issueSearch>

export const newIssue = z.object({ title: z.string().trim().min(3).max(120) })
