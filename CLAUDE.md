# CLAUDE.md — Context Router

This file is the entry point for every task. It holds only the rules that always apply
and routes to focused rule files in `.claude/rules/`.

**Do not read every rule file by default.** Load only what the current task needs.

## Workflow

1. Understand the task.
2. Identify the affected areas (routing, feature, data, styling, ...).
3. Load only the matching rule files from the router below.
4. Inspect the existing code for similar functionality and follow its pattern.
5. Implement consistently.
6. Review the result against the same rule files.

If unsure which rule applies, read `.claude/rules/index.md`.

## Stack

Next.js (App Router) · React · TypeScript · SCSS · CSS Modules · React Query when needed.

## Architecture

```text
app routes.
features implement.
shared reuses.
lib integrates.
styles defines global styling.
```

## Always-On Rules

- Everything technical is written in English (files, code, CSS classes, comments, docs).
- Everything user-facing follows the application's language.
- No Tailwind unless explicitly requested.
- Icons always come from `lucide-react`.
- Keep route files in `src/app` thin — they compose feature components.
- Prefer Server Components; add `'use client'` only when necessary, as low in the tree as possible.
- Do not duplicate logic.
- Respect the existing architecture; do not invent new patterns unnecessarily.
- Do not create empty boilerplate folders or unrelated refactors.

## Rule Router

| Area | Rule file |
| --- | --- |
| Architecture | `.claude/rules/architecture.md` |
| Language | `.claude/rules/language.md` |
| Naming | `.claude/rules/naming.md` |
| Routing / App Router | `.claude/rules/app/app-router.md` |
| Metadata | `.claude/rules/app/metadata.md` |
| Feature architecture | `.claude/rules/features/features.md` |
| Components | `.claude/rules/features/components.md` |
| Hooks | `.claude/rules/features/hooks.md` |
| Forms | `.claude/rules/features/forms.md` |
| Services | `.claude/rules/features/services.md` |
| API | `.claude/rules/data/api.md` |
| React Query | `.claude/rules/data/react-query.md` |
| SCSS | `.claude/rules/styling/scss.md` |
| Design Tokens | `.claude/rules/styling/design-tokens.md` |
| Code Quality | `.claude/rules/quality/code-quality.md` |
| Review | `.claude/rules/quality/review.md` |

## Routing Examples

- "Create a users page with filters and a table" → architecture, features/features, features/components, data/react-query, styling/scss.
- "Create a new authenticated route" → architecture, app/app-router, language, naming.
- "Refactor duplicated buttons into a shared component" → architecture, features/components, quality/code-quality, quality/review.

## Agents

`.claude/agents/` contains `architect` (planning), `builder` (implementation) and `reviewer` (review).
They use this file and `.claude/rules/` as the source of truth.
