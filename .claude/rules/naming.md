# Naming

Use descriptive English names. Avoid vague names (`temp`, `data2`, `thing`, `handleThing`, `doStuff`).

## Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Component | PascalCase | `UserForm`, `UsersListPage` |
| Component folder/file | PascalCase, same name | `UserForm/UserForm.tsx` |
| Style module | `<Component>.module.scss` | `UserForm.module.scss` |
| Hook | `use` + PascalCase | `useUsers`, `useCreateUser` |
| Function / variable | camelCase | `createUser`, `selectedUser` |
| Constant | UPPER_SNAKE_CASE for true constants | `DEFAULT_PAGE_SIZE` |
| Type / interface | PascalCase, no `I` prefix | `User`, `CreateUserInput` |
| Service file | kebab-case `.service.ts` | `users.service.ts` |
| Schema file | kebab-case `.schema.ts` | `user-form.schema.ts` |
| Non-component files | kebab-case | `format-date.ts`, `query-keys.ts` |
| CSS class | camelCase (CSS Modules) | `.container`, `.headerActions` |
| Route segment | lowercase kebab-case | `/forgot-password` |

## Booleans

Prefix with `is`, `has`, `can`, `should`, `was`: `isLoading`, `hasPermission`, `canEdit`, `shouldRedirect`.

## Event Handlers

- Internal handlers: `handle` + action → `handleSubmit`, `handleDeleteUser`, `handleOpenModal`.
- Props that receive handlers: `on` + action → `onSubmit`, `onDelete`.

## Page Components

Feature screens rendered by routes end with `Page`: `UsersListPage`, `UserDetailsPage`, `UserEditPage`.
