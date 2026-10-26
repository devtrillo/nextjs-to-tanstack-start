import { getCookie, setCookie } from '@tanstack/react-start/server'

// A fake session: the cookie holds the username. Swap in a real auth library.
export const readUser = () => getCookie('session') ?? null

export const writeUser = (user: string) =>
  setCookie('session', user, { httpOnly: true, sameSite: 'lax', path: '/' })
