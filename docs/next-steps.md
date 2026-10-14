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
- **App shell** (`src/features/app-shell`): sidebar on desktop, top bar + bottom navigation
  on phones, new transaction modal (simulated save).
- **Início** (`/azzup/inicio`, `src/features/dashboard`): balance, payday, recent transactions,
  upcoming bills, spending by category, with landing-style entrance animations.
- **Extrato** (`/azzup/extrato`, `src/features/transactions`): month summary, search and
  filters (type, category), list grouped by day (no per-day totals; only income amounts are
  colored, expenses stay neutral with a minus sign — `Money tone="income"`), edit/delete in a modal (local only).
  Statement import is not built yet; its button shows a "coming soon" toast.

- **Cartões** (`/azzup/cartoes`, `src/features/credit-cards`): create/edit/remove cards (name,
  limit, due day). Each card shows only its summary; the eye button opens a modal with every
  purchase still being paid (`CreditCardPurchasesModal`). Each card has a bank
  (`src/shared/constants/banks.ts`) that paints its header with the brand color and logo. The 16
  logos in `public/bank-logos/` were copied from the `logos-bancos-br` package (official Open
  Finance artwork; bank trademarks, used only to identify the bank). Card purchases are entered
  in the new transaction modal (payment method Pix / Cartão de crédito / Débito / Dinheiro /
  Boleto, then card and installments).
  - Calculations live in `src/shared/utils/installments.ts` and `credit-card-summary.ts`
    (integer cents; installments always add up to the total; dates keep the purchase day,
    clamped to the month's last day). Totals are never stored, always calculated.
  - Paid rule for now (no bill cycles): an installment is paid once its month is over.
  - Cards and purchases live in memory in `CreditCardsProvider` (mounted by the `(app)` layout)
    and reset on reload. `CreditCardsOverview` shows one summary card per card on Início only.
  - Extrato lists each card installment falling in the month (derived, not stored) as
    "Categoria · Nubank · 5/10"; those rows open Cartões instead of the edit modal. Every
    expense shows its payment method, and the list filters by method or by card.
  - Cartões is in the sidebar only; on phones it is reached from the overview link.

- **Contas fixas** (`/azzup/contas`, `src/features/bills`): monthly fixed bills (name, amount,
  category, due day) grouped as Atrasadas / A vencer / Pagas (each group has its own color, icon,
  count and a colored stripe on the list), with a month summary and a
  "Pagar" button per row. Create/edit/remove happen in a modal, not separate routes.
  - A bill stores the months it was paid (`paidMonths`); status is derived from today's date.
    Due day 31 falls on the month's last day.
  - Each card's current-month invoice (sum of its installments due this month) joins the list
    as "Fatura <cartão>" and can be marked paid; cards with nothing due this month are skipped.
    Paid invoices are stored per card (`paidInvoiceMonths` in `CreditCardsProvider`), but the
    Cartões screen does not use them yet (limit/committed still follow the month-over rule).
  - "Valores a receber" (`ReceivablesSection`): money someone pays back in installments (loan,
    sale). Shows only this month's installment of each one, with a "Recebi" button; an installment
    missed in a previous month is not carried over yet. Local state, resets on reload.
  - Bills live in local state in `BillsManager` and reset on reload. Início's "Próximas contas"
    panel still uses its own sample data.

- **Perfil** (`/azzup/perfil`, `src/features/profile`): photo (JPG/PNG/WebP up to 5 MB, read as a
  data URL), personal data (full name, e-mail, phone with mask), gross salary and password change.
  Each block saves on its own and its button stays disabled until something changes.
  - The profile lives in memory in `UserProfileProvider` (mounted by the `(app)` layout, resets on
    reload). `UserAvatar` (now in `shared`, sizes `md` / `xl`) and the sidebar name/e-mail read from
    it, so a new photo or name shows up in the shell right away.
  - The password change is simulated (no current-password check yet). The gross salary is stored
    but not used by Início yet.

- **Motion and color** (all CSS, no animation library; everything stops under `prefers-reduced-motion`):
  - Each spending category has a color (`--color-category-*` tokens, `color`/`softColor` on
    `TRANSACTION_CATEGORIES`), used by list icons and Início's category bars.
  - Entrance: list rows slide in one after another (`List`), summary amounts count up
    (`AnimatedMoney` on `useCountUp`, which now rolls from the shown value when the amount
    changes), progress bars fill from zero.
  - Continuous: shine and floating light on bank headers, sliding stripes on the Contas paid bar,
    light sweep on the Extrato spending bar, pulsing ring on the Atrasadas icon, swinging clock on A vencer,
    drifting arrows in the Extrato summary, ripple on the phone "+" button.
  - Feedback: a row marked paid/received glows green and its icon pops (`useRowHighlight`).
  - Navigation: each card header has a view transition name, so it morphs into the banner of
    `/azzup/cartoes/[id]` (React `<ViewTransition>`, no Next config needed).

- **Phones (below `md`)**: Início lists show only their first 3 items (`isCompactOnPhone` on
  `DashboardPanel`) and the card summaries drop the limit bar and "Última parcela"
  (`isCompactOnPhone` on `CreditCardSummaryCard`). Desktop is unchanged.

## Current phase: visual only

Backend work is on hold. Build screens and components visually first:

- No mock API, route handlers, React Query or session. Section 3 below is postponed.
- Screens show static example content written directly in the UI; no data layer.
- When a button has a behavior (open a modal, toggle, toast, switch tabs), implement it
  and simulate the outcome locally instead of calling a service.

## Next steps (in order)

### 1. App shell

- [x] Phones: bottom navigation — Início · Extrato · **+** (new transaction) · Contas · Perfil.
- [x] Desktop: sidebar in the style of the login showcase frame.
- [x] Set `--toast-offset-bottom` so toasts sit above the bottom navigation.
- [ ] `ThemeToggle` inside Perfil/configurações.

### 2. Screens (Portuguese URLs, English code)

| URL | Feature | Notes |
| --- | --- | --- |
| `/azzup/inicio` | `dashboard` | Month balance, income vs. expenses, left until payday, upcoming bills |
| `/azzup/extrato` | `transactions` | List + filters (month, category, type), manual create/edit in a Modal |
| `/azzup/extrato/importar` | `statement-import` | Upload OFX/CSV → preview → categorize → confirm |
| `/azzup/contas` | `bills` | Fixed/recurring bills, due dates, paid/pending/overdue |
| `/azzup/contas/nova`, `/azzup/contas/[id]/editar` | `bills` | Bill form |
| `/azzup/perfil` | `settings` | Profile, payday, theme |

### 3. Technical base (postponed)

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
