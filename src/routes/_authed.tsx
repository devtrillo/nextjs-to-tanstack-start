import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getUser } from '~/server/auth'

// A pathless layout: every route under _authed/ needs a session.
// This gates navigation; authMiddleware still guards the data.
export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) throw redirect({ to: '/login' })
    return { user }
  },
  component: Outlet,
})
