import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function login(formData: FormData) {
  'use server'
  const user = String(formData.get('user') ?? '').trim()
  if (!user) return
  ;(await cookies()).set('session', user, { httpOnly: true, sameSite: 'lax', path: '/' })
  redirect('/issues')
}

export default function LoginPage() {
  return (
    <main>
      <h1>Sign in</h1>
      <form action={login}>
        <input name="user" placeholder="Username" required />
        <button>Sign in</button>
      </form>
    </main>
  )
}
