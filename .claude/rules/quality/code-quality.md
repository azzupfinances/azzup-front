# Code Quality

## Prefer

- Simple, explicit code with predictable naming.
- Local feature ownership; low coupling between features.
- Small focused components and hooks.
- Shared primitives only when reuse is real.
- TypeScript strict mode; no `any` (use `unknown` and narrow).
- Early returns over nested conditionals.

## Avoid

- Overengineering and premature generalization.
- Abstractions created only to reduce line count.
- Giant components, giant hooks, global dumping-ground folders.
- `utils.ts` / `helpers.ts` files with unrelated functions — name files by purpose (`format-currency.ts`).
- Duplicated business logic across features.
- Dead code, commented-out code, unused exports.
- Parallel patterns for something the codebase already solves.

## Refactoring

- Keep refactors scoped to the task. No unrelated mass changes.
- Extract a duplicate only when it is the same concept, not just similar-looking code.
- When extracting to `shared`, update all call sites in the same change.
- Preserve behavior; verify with type-check and lint after changes.

## Comments

- English only.
- Explain why, not what.
- No comments that restate the code.

```tsx
// Redirect unauthenticated users before rendering the private shell.
```

## Verification

Run the available checks (`tsc --noEmit`, lint, tests) before reporting work as done.
