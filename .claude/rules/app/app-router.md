# App Router

`src/app` answers one question: which component renders for this URL?

## Thin Routes

```tsx
import type { Metadata } from 'next'

import { UsersListPage } from '@/features/users/components/UsersListPage/UsersListPage'

export const metadata: Metadata = {
  title: 'Users',
}

export default function Page() {
  return <UsersListPage />
}
```

Do not place in `page.tsx` / `layout.tsx` without a strong reason:
`useState`, `useEffect`, `useQuery`, `useMutation`, forms, tables, modals, business logic,
feature-specific styles, large JSX. Move them into the feature.

Route files may: read `params` / `searchParams`, call `notFound()` / `redirect()`, and pass values as props.

## Route Groups

Use groups to share layouts without affecting URLs:

```text
src/app/
├── (public)/        # /login, /register, /forgot-password
│   └── layout.tsx
├── (private)/       # authenticated area with app shell (Sidebar, Header, Main)
│   ├── layout.tsx
│   └── users/page.tsx   → /users
└── layout.tsx       # root layout: html, body, global styles, providers
```

The app shell components live in `src/shared/components/` (or a `layout` feature), not in `layout.tsx`.

## CRUD URLs

```text
/users             list
/users/create      create
/users/[id]        details
/users/[id]/edit   edit
```

## Special Files

`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` use `export default`.
`error.tsx` must be a Client Component. Keep them thin; delegate UI to shared/feature components.

## Route Handlers

`route.ts` handlers stay thin: validate input, call a feature service or `lib` module, return the response.

Metadata details: `app/metadata.md`.
