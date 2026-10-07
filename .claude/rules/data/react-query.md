# React Query

Use React Query for client-side server state. Do not add it when a Server Component fetch is enough.

## Global Configuration

Centralized in `src/lib/react-query/`:

```text
src/lib/react-query/
├── query-client.ts     # makeQueryClient() with default options
└── QueryProvider.tsx   # 'use client' provider, mounted in the root or private layout
```

Do not create a global queries folder. Feature queries stay in the feature.

## Query Keys

One key factory per feature, in `src/features/<feature>/constants/query-keys.ts`:

```ts
export const usersQueryKeys = {
  all: ['users'] as const,
  list: (filters: UsersFilters) => [...usersQueryKeys.all, 'list', filters] as const,
  detail: (id: string) => [...usersQueryKeys.all, 'detail', id] as const,
}
```

Never write inline string keys in components.

## Queries and Mutations

- One hook per file in the feature's `hooks/`: `useUsers.ts`, `useUser.ts`, `useCreateUser.ts`.
- `queryFn` / `mutationFn` call feature services, never the API client directly.
- Mutations invalidate the narrowest affected keys in `onSuccess`.
- UI side effects (toast, redirect) belong to the caller via `mutate(input, { onSuccess })` or hook options.

```ts
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersQueryKeys.all }),
  })
}
```

## Avoid

- Copying query data into `useState`.
- `useEffect` + `fetch` for data React Query should own.
- Wrapping a whole page in `'use client'` to use a query; isolate the consuming component.
