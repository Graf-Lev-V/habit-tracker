# Habit Tracker

**[Live demo →](https://habit-tracker-six-taupe.vercel.app/)**

A full-stack habit tracking app that helps you build consistency through daily check-ins, streaks, and a GitHub-style contribution calendar.

## What is this?

"Habit" here means any recurring action you want to stay disciplined about — reading, exercising, meditating, and so on. The app isn't just a to-do list: it's built around **streaks** (how many days in a row you've kept a habit) and a **visual history** (a full-year heatmap calendar), so you can actually see your consistency over time instead of just checking boxes.

## Screenshots

![Dashboard](./screenshots/dashboard.png)
![Mobile view](./screenshots/mobile.png)
![Add habit form](./screenshots/add-habit.png)

## Features

- **GitHub OAuth authentication** via Auth.js v5, with sessions synced to a Supabase `users` table (stable UUIDs independent of the OAuth provider's own ID)
- **Create, complete, toggle, and delete habits** via Server Actions, with `isPending` loading states on every button and a confirm-before-delete interaction (first click arms the button, second click confirms — no modal)
- **Inline habit name editing** — click the name, edit in place, save on Enter/blur, with optimistic UI update and automatic rollback if the server request fails
- **Streak tracking** — current streak (with a same-day grace period, so it doesn't reset until a full day is missed) and an all-time best streak, both computed from raw completion logs
- **GitHub-style yearly heatmap** per habit, with month labels, fully fluid and responsive (grid columns sized with `minmax(0, 1fr)` and `aspect-square` cells, not fixed pixels)
- **Dashboard stats** — total habits, completed today, and best streak across all habits
- **Toast notifications** for Supabase errors on every mutation, plus a dedicated `error.tsx` boundary with retry/sign-out options
- **Animated list transitions** (Framer Motion) when adding/removing habits, including a smooth empty-state transition — with no animation flash on the very first page load
- **Fully responsive**, tested on real mobile Safari (not just DevTools) — dashboard, forms, calendar, and auth pages all adapt from mobile to desktop
- **Custom loading skeletons** matching the final layout precisely, including scrollbar-width compensation to avoid a visible content shift between the loading and loaded states

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions, Server Components, Middleware)
- **Auth:** Auth.js v5 (GitHub OAuth)
- **Database:** Supabase (PostgreSQL)
- **UI:** React 19, Tailwind CSS v4, Framer Motion
- **Notifications:** Sonner
- **Language:** TypeScript
- **Deployment:** Vercel

## Architecture Notes

- User identity is decoupled from the OAuth provider: on sign-in, a `users` row is upserted by `github_id`, and the resulting stable UUID is used everywhere else (habits, logs) — so provider ID changes never break data ownership.
- Server Actions use a counter pattern (`success: number` / `attempt: number`) instead of a boolean flag in their return state, so `useActionState` consumers can reliably detect a *new* result even when two consecutive calls return the same error message.
- Unauthenticated access is blocked at two layers: `proxy.ts` middleware for the common case, plus a `redirect('/login')` check in `page.tsx` as defense-in-depth.
- Error handling covers both mutations (Server Actions return typed errors, surfaced as toasts) and reads (`page.tsx` throws on Supabase errors, caught by `error.tsx`).

## Challenges & What I Learned

- **Streak logic** took a few iterations to get right — an earlier version never reset the streak if the last completion was more than a day old, which required rethinking the date comparison from scratch (with a same-day grace period, not just "yesterday or today").
- **Responsive calendar without a layout flash**: an initial client-side `window.innerWidth` approach caused hydration mismatches and React 19's stricter `setState`-in-effect warnings. Settled on resolving device type server-side via User-Agent before the first render — no flash, no client-only state.
- **A visual shift between `loading.tsx` and the loaded page** turned out to be caused by the desktop scrollbar appearing/disappearing depending on habit count, shifting the centered content by the scrollbar's width. Fixed with a scoped `scrollbar-gutter: stable` on `<main>` rather than globally on `<html>`, to avoid an unstyled gutter artifact next to the header.
- **A mobile Safari-only overflow bug** (habit cards overflowing the viewport, invisible in Chrome DevTools' responsive mode) traced back to a missing `min-w-0` on a flex child — a reminder that responsive testing on a real device catches things emulators don't.

## Roadmap

- Rate limiting on Server Actions (Upstash/Vercel)
- `useOptimistic` for instant UI updates on habit creation/deletion without waiting on full server re-renders
