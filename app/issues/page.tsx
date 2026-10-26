import { issueSearch, listIssues } from '@/lib/issues'
import { requireUser } from '@/lib/session'
import { Filters } from './filters'
import { NewIssueForm } from './new-issue-form'
import { Stats } from './stats'

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await requireUser()
  const search = issueSearch.parse(await searchParams)
  const issues = listIssues(search)

  return (
    <main>
      <h1>Issues</h1>
      <p>Signed in as {user}</p>
      <Stats />
      <Filters {...search} />
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
