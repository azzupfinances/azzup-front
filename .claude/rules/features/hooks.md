# Hooks

## Placement

- Feature-specific → `src/features/<feature>/hooks/useSomething.ts`.
- Generic and reused by multiple features → `src/shared/hooks/`.
- One hook per file; the filename matches the hook name.

## Rules

- Name with `use` + descriptive English verb/noun: `useUsers`, `useCreateUser`, `useDebouncedValue`.
- Named exports only.
- Hooks are client-only: files that use them need a `'use client'` consumer.
- A hook has one responsibility. Split giant hooks that manage unrelated state.
- Return an object for multiple values (`{ users, isLoading }`); return a tuple only for `useState`-like APIs.
- Do not call services directly from components for client data; wrap them in a hook.
- Do not create a hook that only wraps a single `useState` with no added behavior.

## Data Hooks

Hooks that fetch or mutate server data use React Query and call the feature service.
See `data/react-query.md`.

```ts
export function useUsers(filters: UsersFilters) {
  return useQuery({
    queryKey: usersQueryKeys.list(filters),
    queryFn: () => getUsers(filters),
  })
}
```

## UI Hooks

Hooks for UI state (`useDisclosure`, `usePagination`) stay simple and free of business logic.
