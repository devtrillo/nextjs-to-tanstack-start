import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { issueSearch, newIssue } from '~/issues'
import { createIssue as insertIssue, issueStats, listIssues } from './db'
import { readUser } from './session'

function requireUser() {
  const user = readUser()
  if (!user) throw redirect({ to: '/login' })
  return user
}

export const getIssues = createServerFn()
  .validator(issueSearch)
  .handler(({ data }) => {
    const user = requireUser()
    return { user, issues: listIssues(data), stats: issueStats() }
  })

export const createIssue = createServerFn({ method: 'POST' })
  .validator(newIssue)
  .handler(({ data }) => {
    insertIssue(data.title, requireUser())
  })
