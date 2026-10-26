# Next.js to TanStack Start

The code for the devtrillo.com post on porting a Next.js App Router page to [TanStack Start](https://tanstack.com/start) 1.0 ([blog issue](https://github.com/devtrillo/blog/issues/454)).

A small issue tracker: a list filtered and sorted by search params, a form that creates an issue, a stats header, and a fake cookie session that gates all of it.

- `nextjs` tag: the Next.js 16 App Router version, where the post starts.
- `tanstack-start` tag: the same page on TanStack Start 1.0, running on Cloudflare Workers.

## What changed

Every change is in one PR: [#1 Port the issue tracker to TanStack Start](https://github.com/devtrillo/nextjs-to-tanstack-start/pull/1). Or diff the tags:

```sh
git diff nextjs tanstack-start
```

| Next.js 16                                     | TanStack Start 1.0                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| `app/issues/page.tsx`, an async server component | `src/routes/_authed/issues.tsx`, a route with a `loader`                 |
| `searchParams` Promise, parsed by hand         | `validateSearch` + `loaderDeps`, typed in `useSearch` and `navigate`      |
| `'use server'` action + `revalidatePath`       | `createServerFn({ method: 'POST' })` + `router.invalidate()`              |
| `cookies()` + `redirect()` in every page/action | `authMiddleware` puts `user` in typed `context`; `_authed` layout gates routes |
| Server components by default                   | One opt-in server component (`renderServerComponent`, experimental)      |
| `next build`                                   | `vite build`, then `wrangler deploy` via `@cloudflare/vite-plugin`         |

## Run it

```sh
bun install
bun run dev       # Vite dev server on :3000
bun run preview   # the production build inside workerd, Cloudflare's runtime
bun run deploy    # needs a Cloudflare account
```

`git checkout nextjs` for the Next.js version (`bun install && bun run dev`).

Sign in with any username. Data lives in memory: it resets on restart, and on Workers each isolate has its own copy. Pinned to `@tanstack/react-start` 1.169.4, which is the 1.0 release.
