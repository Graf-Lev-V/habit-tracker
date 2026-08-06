# Habit Tracker

**🔗 Live Demo:** https://habit-tracker-six-taupe.vercel.app/

A full-stack habit tracking application built with Next.js, Auth.js and Supabase. It helps users build consistency through daily check-ins, streak tracking and a GitHub-style yearly heatmap.

---

## Overview

A **habit** is any recurring activity you want to stay consistent with — reading, exercising, meditating, learning, and more.

Unlike a traditional to-do list, Habit Tracker focuses on **long-term consistency**. Every completion contributes to your current streak and is visualized in a GitHub-style contribution calendar, making progress easy to track throughout the year.

---

## Screenshots

<p align="center">
  <img src="./screenshots/dashboard.png" alt="Dashboard" width="900" />
</p>

<p align="center">
  <img src="./screenshots/mobile.png" alt="Mobile view" width="240" />
  <img src="./screenshots/add-habit.png" alt="Add habit form" width="500" />
</p>

---

## Features

- **GitHub OAuth authentication** with Auth.js v5 and Supabase-backed user accounts
- **Create, edit, complete, toggle and delete habits** using Server Actions
- **Inline habit editing** with optimistic UI updates and automatic rollback on failure
- **Current streak** and **best streak** calculated from raw completion history
- **GitHub-style yearly heatmap** with responsive layout and month labels
- **Dashboard statistics** (total habits, completed today, best streak)
- **Animated UI transitions** using Framer Motion
- **Toast notifications** and dedicated error boundaries
- **Responsive layout** tested on real mobile Safari devices
- **Custom loading skeletons** matching the final layout to eliminate layout shifts

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend:** Server Actions, Server Components, Middleware
- **Authentication:** Auth.js v5 (GitHub OAuth)
- **Database:** Supabase (PostgreSQL)
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **Deployment:** Vercel

---

## Architecture Notes

- User identity is decoupled from the OAuth provider. A stable internal UUID is stored in the `users` table and referenced throughout the database instead of relying on GitHub IDs.
- Server Actions use a `success` / `attempt` counter pattern instead of boolean flags, allowing `useActionState` to detect consecutive identical results reliably.
- Authentication is enforced at two layers: middleware for normal navigation and a server-side redirect as defense in depth.
- Errors from mutations are surfaced through typed Server Action responses, while data-fetching errors are handled by a dedicated `error.tsx` boundary.

---

## Challenges & What I Learned

- Implemented reliable streak calculations with a same-day grace period after redesigning the original date comparison logic.
- Built a fully responsive GitHub-style calendar without hydration mismatches by detecting device type server-side instead of relying on `window.innerWidth`.
- Eliminated layout shifts between loading and loaded states by using `scrollbar-gutter: stable` only where necessary.
- Fixed a Safari-only overflow issue caused by a missing `min-w-0`, highlighting the importance of testing on real devices.

---

## Roadmap

- Rate limiting for Server Actions (Upstash / Vercel)
- `useOptimistic` for instant UI updates
- Habit categories and filtering
