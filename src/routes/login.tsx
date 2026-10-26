import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { login } from '~/server/login'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  const signIn = useServerFn(login)
  return (
    <main>
      <h1>Sign in</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const user = String(new FormData(e.currentTarget).get('user') ?? '')
          await signIn({ data: { user } })
        }}
      >
        <input name="user" placeholder="Username" required />
        <button>Sign in</button>
      </form>
    </main>
  )
}
