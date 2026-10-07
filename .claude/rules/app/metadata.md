# Metadata

- Define metadata in `page.tsx` / `layout.tsx` only (Server Components). Never in Client Components.
- Use the `Metadata` type from `next`.
- Title and description are user-facing: they follow the application's language.

## Static

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuários',
}
```

## Title Template

Set the template once in the root layout:

```tsx
export const metadata: Metadata = {
  title: {
    template: '%s | App Name',
    default: 'App Name',
  },
  description: '...',
}
```

## Dynamic

Use `generateMetadata` when the title depends on route data. Reuse the feature service
instead of duplicating fetch logic:

```tsx
import type { Metadata } from 'next'

import { getUserById } from '@/features/users/services/users.service'

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserById(id)

  return { title: user.name }
}
```

Private pages generally do not need SEO fields beyond `title`; add `robots: { index: false }` in the private layout when required.
