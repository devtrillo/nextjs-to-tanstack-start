'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { IssueSearch } from '@/lib/issues'

export function Filters({ status, sort }: IssueSearch) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  // Strings in, strings out: nothing stops a typo in the key or the value.
  function set(key: string, value: string) {
    const next = new URLSearchParams(params)
    next.set(key, value)
    router.push(`${pathname}?${next}`)
  }

  return (
    <div>
      <select value={status} onChange={(e) => set('status', e.target.value)}>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="in-progress">In progress</option>
        <option value="closed">Closed</option>
      </select>
      <select value={sort} onChange={(e) => set('sort', e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}
