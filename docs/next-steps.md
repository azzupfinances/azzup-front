# Next Steps

Handoff notes to resume work. Product scope and decisions live in [`roadmap.md`](./roadmap.md);
this file tracks where the implementation stopped and what comes next.

## Current state

Done and verified with screenshots (375 / 768 / 1024 / 1280 / 1440 / 1920 px):

- **Landing page** (`/`), responsive fixes included (`xl` breakpoint at 1440px, header grid,
  reduced mid-desktop gutters).
- **Auth** (`src/features/auth`):
  - `/login`: CPF + password. Google sign-in is commented out in `LoginForm`.
  - `/register`: name, CPF, e-mail, password + confirmation, terms checkbox.
  - Animated product showcase (personal finance for CLT workers) beside the forms.
  - Submissions are **not wired**: each form has a `Pending backend integration` comment.
- **Design tokens and shared components** (`src/shared/components`): Money, CurrencyField,
  Select, SegmentedControl, Modal (bottom sheet on phones), ToastProvider + `useToast`,
  List/ListItem, EmptyState, ErrorState, Skeleton, IconButton, FormField, plus the
  pre-existing primitives. Money is always integer cents (`src/shared/utils/format-currency.ts`).
- **Dark theme**, scoped to the system: `src/lib/theme/theme.ts`, `SystemThemeScope`
  (mounted by `src/app/azzup/layout.tsx`) and `ThemeToggle`.
- **Design system catalog** at `/azzup/admin/design-system` (dev only for now).

## Next steps (in order)

### 1. Technical base

- [ ] `src/lib/config/`: read `NEXT_PUBLIC_API_URL` (defaults to the mock API).
- [ ] `src/lib/api/`: `api-client.ts` (native fetch, JSON, auth header) and `api-error.ts`.
- [ ] React Query: install `@tanstack/react-query`, add `src/lib/react-query/`
      (`query-client.ts`, `QueryProvider.tsx`) and mount it in the system layout.
- [ ] Mock API with route handlers in `src/app/api/` (in-memory data) until the backend exists.
- [ ] Mock session:
  - `POST /api/auth/login` accepts any valid CPF and stores an httpOnly session cookie
    (`{ userId, name, role }`); `POST /api/auth/register`; `POST /api/auth/logout`.
  - `src/proxy.ts` (Next 16 name for middleware): `/azzup/*` requires a session,
    `/azzup/admin/*` requires `role === 'admin'` (then drop the dev-only guard in the
    design-system page), and logged-in users hitting `/login` go to the system.
  - Wire `LoginForm` / `RegisterForm` through `features/auth/services/auth.service.ts`
    and mutation hooks; show errors with `useToast`.

### 2. App shell

- [ ] Phones: bottom navigation — Início · Extrato · **+** (new transaction) · Contas · Perfil.
- [ ] Desktop: sidebar in the style of the login showcase frame.
- [ ] Set `--toast-offset-bottom` so toasts sit above the bottom navigation.
- [ ] `ThemeToggle` inside Perfil/configurações.

### 3. Screens (Portuguese URLs, English code)

| URL | Feature | Notes |
| --- | --- | --- |
| `/azzup/inicio` | `dashboard` | Month balance, income vs. expenses, left until payday, upcoming bills |
| `/azzup/extrato` | `transactions` | List + filters (month, category, type), manual create/edit in a Modal |
| `/azzup/extrato/importar` | `statement-import` | Upload OFX/CSV → preview → categorize → confirm |
| `/azzup/contas` | `bills` | Fixed/recurring bills, due dates, paid/pending/overdue |
| `/azzup/contas/nova`, `/azzup/contas/[id]/editar` | `bills` | Bill form |
| `/azzup/perfil` | `settings` | Profile, payday, theme |

`/azzup/inicio` is a proposal (the user also mentioned `/azzup/dashboard`); confirm before building.

### Draft data contract

```ts
type Transaction = {
  id: string
  description: string
  amountInCents: number // negative = expense, positive = income
  date: string // ISO date
  categoryId: CategoryId
  source: 'manual' | 'import'
}

type Bill = {
  id: string
  name: string
  amountInCents: number
  dueDate: string // ISO date of the next due date
  recurrence: 'monthly' | 'once'
  status: 'pending' | 'paid' | 'overdue'
}

// Fixed list for the MVP; custom categories later.
type CategoryId =
  | 'housing' | 'food' | 'transport' | 'health'
  | 'leisure' | 'education' | 'subscriptions' | 'other'
```

## Open questions

- Which banks' CSV formats to support first? Suggestion: OFX (works with most banks) + Nubank CSV.
- Confirm the fixed category list above.
- Extra sign-up data (phone/WhatsApp, payday, salary range) now or in a post-sign-up onboarding?
- Forgot-password flow (`/forgot-password` is linked from login but does not exist yet).

## Known issues

- `/forgot-password` and the terms page do not exist (links lead to 404 / plain text).
- The design-system admin restriction is dev-only until the session with roles exists.
- After large refactors the dev server may serve stale server-rendered components
  (hydration mismatch warning). Restart `npm run dev` to fix it.
- Visual checks used headless Chromium; on this machine it needs system libraries
  (`sudo npx playwright install-deps chromium`).
