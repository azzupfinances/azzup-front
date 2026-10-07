# Language

> Everything technical is written in English.
> Everything user-facing follows the application's language.

## Always English

Directories, filenames, components, hooks, functions, variables, constants, types, interfaces,
enums, schemas, services, API clients, routes, query keys, mutations, event handlers,
CSS classes, SCSS variables, comments, commit-level technical docs.

```text
features/users/      not features/usuarios/
features/orders/     not features/pedidos/
useCreateUser        not useCriarUsuario
selectedUser         not usuarioSelecionado
isLoading            not carregando
```

## Application Language

Only content rendered to the end user: labels, headings, button text, placeholders,
empty states, validation messages, toasts, page titles in metadata.

```tsx
export function UsersListPage() {
  const { data: users, isLoading } = useUsers()

  if (isLoading) {
    return <LoadingState message="Carregando usuários..." />
  }

  return <UsersTable users={users ?? []} />
}
```

## Routes

URL segments are technical and stay in English (`/users/create`, not `/usuarios/novo`)
unless localized URLs are explicitly required.

**Project decision:** routes inside the logged-in system (`/azzup/...`) use Portuguese
segments, because users see them (`/azzup/inicio`, `/azzup/extrato`, `/azzup/contas`).
Only the URL is localized: folders under `src/app/azzup/` follow the URL, while features,
components and everything else stay in English (`/azzup/extrato` renders
`features/transactions`). Public routes keep their current names (`/login`, `/register`).

## Backend Field Names

If an external API returns non-English fields, map them to English types at the service boundary.
See `features/services.md`.
