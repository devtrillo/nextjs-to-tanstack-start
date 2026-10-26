import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { writeUser } from './session'

export const login = createServerFn({ method: 'POST' })
  .validator(z.object({ user: z.string().trim().min(1) }))
  .handler(({ data }) => {
    writeUser(data.user)
    throw redirect({ to: '/issues' })
  })
