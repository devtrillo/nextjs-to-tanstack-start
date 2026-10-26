'use server'

import { revalidatePath } from 'next/cache'
import { createIssue, newIssue } from '@/lib/issues'
import { requireUser } from '@/lib/session'

export async function createIssueAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const user = await requireUser()
  const parsed = newIssue.safeParse({ title: formData.get('title') })
  if (!parsed.success) return 'Titles need 3 to 120 characters.'
  createIssue(parsed.data.title, user)
  revalidatePath('/issues')
  return null
}
