'use client'

import { useActionState } from 'react'
import { createIssueAction } from './actions'

export function NewIssueForm() {
  const [error, action, pending] = useActionState(createIssueAction, null)
  return (
    <form action={action}>
      <input name="title" placeholder="What's broken?" required />
      <button disabled={pending}>{pending ? 'Adding…' : 'Add issue'}</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
