# Components

## Structure

One folder per component, styles colocated:

```text
UserCard/
├── UserCard.tsx
└── UserCard.module.scss
```

- Named exports only: `export function UserCard() {}`. No `export default` outside Next.js special files.
- Type props with a `<Component>Props` type declared in the same file.
- No barrel `index.ts` files unless the project already uses them.

## Size and Responsibility

- One responsibility per component. Split when a component mixes data fetching, layout and complex UI.
- Page components (`*Page`) compose: they fetch via hooks and render smaller components.
- Extract repeated JSX blocks into components inside the same feature first.

## Server vs. Client

- Default to Server Components.
- Add `'use client'` only for state, effects, event handlers, browser APIs, client contexts, React Query, interactive UI.
- Push the boundary down: make the interactive leaf a Client Component, keep the parent on the server.
- Never mark a layout or page as client just for convenience.

```tsx
// Server component renders static structure; only the filter is interactive.
export function UsersListPage() {
  return (
    <section className={styles.container}>
      <h1>Usuários</h1>
      <UsersFilters />
      <UsersTableContainer />
    </section>
  )
}
```

## Placement

- Used by one feature → `src/features/<feature>/components/`.
- Used by two or more features → `src/shared/components/`.
- Generic UI primitives (`Button`, `Modal`, `Input`) → `src/shared/components/`.

## States

Handle loading, empty and error states explicitly. Reuse shared state components when they exist.

## Icons

- Always use `lucide-react` (https://lucide.dev/icons/). Do not hand-write SVG icons or add other icon libraries.
- Import icons individually: `import { ArrowRight } from 'lucide-react'`.
- Decorative icons get `aria-hidden="true"`; icon-only buttons need an `aria-label`.
- When data carries an icon, type it as `LucideIcon`.

Styling: `styling/scss.md`.
