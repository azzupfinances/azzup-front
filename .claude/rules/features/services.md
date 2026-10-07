# Feature Services

Feature services hold feature-specific backend communication.

```text
Feature component / hook
  ↓
Feature service      src/features/<feature>/services/<feature>.service.ts
  ↓
lib API client       src/lib/api/
  ↓
Backend / external service
```

## Rules

- One service file per feature resource: `users.service.ts`.
- Export plain async functions, named by action: `getUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`.
- Always use the `lib` API client. Never call `fetch` / axios with base URLs or auth headers directly in a feature.
- Type inputs and outputs with types from the feature's `types/` folder.
- Map raw API shapes to frontend types here when they differ (renamed or non-English fields, dates).
- No React code in services: no hooks, no JSX, no UI state.
- Services are callable from Server Components, route handlers and React Query hooks alike.

```ts
import { apiClient } from '@/lib/api/api-client'

import type { CreateUserInput, User } from '../types/user.types'

export function getUsers(): Promise<User[]> {
  return apiClient.get<User[]>('/users')
}

export function createUser(input: CreateUserInput): Promise<User> {
  return apiClient.post<User>('/users', input)
}
```

HTTP client conventions: `data/api.md`.
