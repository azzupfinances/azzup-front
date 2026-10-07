# Review

Review changes against the rules relevant to the touched files, not against every rule.

## Checklist

| Check | Rule file |
| --- | --- |
| Business logic, state or large JSX inside `src/app` | `app/app-router.md` |
| Unnecessary `'use client'` or client boundary too high | `features/components.md` |
| File in the wrong layer; feature importing another feature | `architecture.md` |
| Premature `shared` abstraction | `architecture.md` |
| Portuguese or vague technical naming | `language.md`, `naming.md` |
| Default exports outside Next.js special files | `features/components.md` |
| Giant components or hooks | `features/components.md`, `features/hooks.md` |
| Direct `fetch` in features; missing service layer | `features/services.md`, `data/api.md` |
| Inline query keys; `useEffect` fetching; query data copied to state | `data/react-query.md` |
| Tailwind, global feature styles, magic values | `styling/scss.md`, `styling/design-tokens.md` |
| Duplicated logic, dead code, unnecessary complexity | `quality/code-quality.md` |

## Reporting

Each finding must include:

1. File and line (`src/features/users/components/UsersTable/UsersTable.tsx:42`).
2. The violated rule.
3. The concrete problem.
4. A specific fix.

Order by severity: architecture/correctness → boundaries/data flow → naming/styling → minor cleanup.

Do not report vague architectural opinions. If nothing violates the rules, say so.
