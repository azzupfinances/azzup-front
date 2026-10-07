# Forms

## Libraries

Use the form and validation libraries already installed. If none exist, default to
`react-hook-form` + `zod` (`@hookform/resolvers/zod`). Do not mix form libraries.

## Placement

```text
src/features/users/
├── components/UserForm/
│   ├── UserForm.tsx
│   └── UserForm.module.scss
└── schemas/user-form.schema.ts
```

- Schema and inferred input type live in `schemas/`:

```ts
export const userFormSchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  email: z.string().email('E-mail inválido'),
})

export type UserFormValues = z.infer<typeof userFormSchema>
```

- Field names and schema keys are English; validation messages follow the application's language.

## Component Rules

- Form components are Client Components.
- The form receives `defaultValues` and `onSubmit` via props so it serves both create and edit.
- Submission side effects (mutation, redirect, toast) live in the page component or a mutation hook, not inside field logic.
- Disable the submit button while submitting (`isSubmitting` / `isPending`).
- Show field errors next to their fields.
- Reuse shared input components from `src/shared/components/` when available.

```tsx
<UserForm defaultValues={user} onSubmit={handleSubmit} isSubmitting={isPending} />
```

Mutations: `data/react-query.md`.
