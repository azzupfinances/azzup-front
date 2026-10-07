# Roadmap

Azzup is a personal finance app for CLT (salaried) workers in Brazil.

## Product decisions

- **Platform:** mobile first. Bottom navigation on phones, sidebar on desktop.
- **Backend:** does not exist yet. The front end is built first against mocked data and an
  API contract we define; swapping to the real API must only change the `lib/api` layer.
- **Authentication:** CPF + password. Google sign-in is implemented but commented out in
  `LoginForm` until it is enabled.
- **Data entry:** bank statement import (OFX/CSV) plus manual entries. Open Finance is out of scope.
- **System URLs:** everything after login lives under `/azzup/...`, with Portuguese segments
  (`/azzup/inicio`, `/azzup/extrato`, `/azzup/contas`). Code stays in English.
- **Theme:** light by default; dark theme is available **only inside the system** (`/azzup`).
  Landing, login and sign-up are always light.
- **Design system:** internal catalog at `/azzup/admin/design-system`, restricted to admins.
  Until sessions with roles exist it is only reachable in development.

## v1 — MVP

- [ ] Private app shell (bottom navigation / sidebar) and route protection, including the
      admin role check for `/azzup/admin/*`
- [ ] Theme toggle inside the system (e.g. profile/settings)
- [ ] Dashboard: month balance, income vs. expenses, what is left until the next payday
- [ ] Transactions: list, filters, manual create/edit, categories
- [ ] Statement import: upload OFX/CSV, preview, categorize, confirm
- [ ] Bills: fixed and recurring bills, due dates, paid/unpaid status

## Future versions

Postponed from the MVP on purpose; revisit after v1 ships.

- [ ] **Budgets and goals:** monthly limit per category, emergency fund and savings goals
  (the bills scene in the login showcase already previews this).
- [ ] **CLT salary:** payslip (gross/net, INSS, IRRF, VT, VR), 13th salary, vacation pay, FGTS.
- [ ] Google sign-in (uncomment in `LoginForm` and wire the OAuth flow).
- [ ] Open Finance automatic bank sync.
