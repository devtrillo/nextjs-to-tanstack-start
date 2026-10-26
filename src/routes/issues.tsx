import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { issueSearch } from '~/issues'
import { createIssue, getIssues } from '~/server/issues'

export const Route = createFileRoute('/issues')({
  validateSearch: issueSearch,
  loaderDeps: ({ search: { status, sort } }) => ({ status, sort }),
  loader: ({ deps }) => getIssues({ data: deps }),
  component: IssuesPage,
})

function IssuesPage() {
  const { user, issues, stats } = Route.useLoaderData()
  return (
    <main>
      <h1>Issues</h1>
      <p>Signed in as {user}</p>
      <p className="stats">
        <span>{stats.open} open</span>
        <span>{stats['in-progress']} in progress</span>
        <span>{stats.closed} closed</span>
      </p>
      <Filters />
      <NewIssueForm />
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            #{issue.id} {issue.title} <small>({issue.status}, by {issue.author})</small>
          </li>
        ))}
      </ul>
    </main>
  )
}

function Filters() {
  const { status, sort } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <div>
      {/* Typed both ways: a value outside the enum is a compile error. */}
      <select
        value={status}
        onChange={(e) => navigate({ search: (prev) => ({ ...prev, status: issueSearch.shape.status.parse(e.target.value) }) })}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="in-progress">In progress</option>
        <option value="closed">Closed</option>
      </select>
      <select
        value={sort}
        onChange={(e) => navigate({ search: (prev) => ({ ...prev, sort: issueSearch.shape.sort.parse(e.target.value) }) })}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}

function NewIssueForm() {
  const router = useRouter()
  const create = useServerFn(createIssue)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setPending(true)
        try {
          await create({ data: { title: String(new FormData(form).get('title') ?? '') } })
          form.reset()
          setError(null)
          await router.invalidate()
        } catch {
          setError('Titles need 3 to 120 characters.')
        } finally {
          setPending(false)
        }
      }}
    >
      <input name="title" placeholder="What's broken?" required />
      <button disabled={pending}>{pending ? 'Adding…' : 'Add issue'}</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
