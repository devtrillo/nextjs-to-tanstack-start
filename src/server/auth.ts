import { redirect } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { readUser } from './session'

// Runs on the server before every server function that lists it.
// Whatever goes into `context` arrives typed in the handler.
export const authMiddleware = createMiddleware({ type: 'function' }).server(({ next }) => {
  const user = readUser()
  if (!user) throw redirect({ to: '/login' })
  return next({ context: { user } })
})

export const getUser = createServerFn().handler(() => readUser())
