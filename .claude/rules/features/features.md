# Features

A feature owns one area of functionality: its screens, components, hooks, services, schemas, types.

## Structure

```text
src/features/users/
├── components/
│   ├── UsersListPage/
│   │   ├── UsersListPage.tsx
│   │   └── UsersListPage.module.scss
│   └── UserForm/
│       ├── UserForm.tsx
│       └── UserForm.module.scss
├── hooks/        # useUsers.ts, useCreateUser.ts
├── services/     # users.service.ts
├── types/        # user.types.ts
├── schemas/      # user-form.schema.ts
├── utils/
└── constants/
```

Create only the folders the feature needs. No empty boilerplate directories.

## Rules

- Name features in English, plural for resources: `users`, `orders`, `reports`, `settings`.
- Route-level screens live in `components/<Name>Page/` and are imported by `src/app`.
- Keep feature code inside the feature. Move to `shared` only when a second feature needs it.
- Do not import another feature's internals. Shared needs go to `src/shared`.
- Types derived from API responses live in `types/`; form input types may be inferred from `schemas/`.

## Related Rules (read only if applicable)

- Creates routes → `app/app-router.md`
- Builds UI components → `features/components.md`
- Custom hooks → `features/hooks.md`
- Forms → `features/forms.md`
- Backend communication → `features/services.md` and `data/api.md`
- Queries / mutations → `data/react-query.md`
- Introduces shared abstractions → `architecture.md`
