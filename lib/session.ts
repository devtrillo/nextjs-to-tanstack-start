import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// A fake session: the cookie holds the username. Swap in a real auth library.
export async function requireUser(): Promise<string> {
  const user = (await cookies()).get('session')?.value
  if (!user) redirect('/login')
  return user
}
