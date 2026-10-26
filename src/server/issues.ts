import { createServerFn } from '@tanstack/react-start'
import { issueSearch, newIssue } from '~/issues'
import { authMiddleware } from './auth'
import { createIssue as insertIssue, listIssues } from './db'

export const getIssues = createServerFn()
  .middleware([authMiddleware])
  .validator(issueSearch)
  .handler(({ data }) => listIssues(data))

export const createIssue = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(newIssue)
  .handler(({ data, context }) => {
    insertIssue(data.title, context.user)
  })
