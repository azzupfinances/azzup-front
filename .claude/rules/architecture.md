# Architecture

```text
src/
├── app/       # routing, layouts, metadata, route groups, route handlers
├── features/  # feature screens, hooks, services, schemas, types, components
├── shared/    # code reused by multiple features
├── lib/       # technical infrastructure and integrations
└── styles/    # global styles, resets, themes, tokens
```

## Layer Responsibilities

- `src/app` answers "which component renders for this URL?". See `app/app-router.md`.
- `src/features/<feature>` owns all behavior of one feature. See `features/features.md`.
- `src/shared` holds only code genuinely used by two or more features.
- `src/lib` holds technical infrastructure: `api/`, `auth/`, `config/`, `storage/`, `integrations/`, `sdk/`, `react-query/`.
- `src/styles` holds global concerns only. See `styling/scss.md`.

## Dependency Direction

```text
app → features → shared → lib
```

- `app` may import from any layer.
- `features` may import from `shared` and `lib`, never from `app`.
- A feature should not import another feature's internals. If two features need it, move it to `shared`.
- `shared` must not import from `features`.
- `lib` must not import from `features` or contain business logic.

## Shared Code

- Do not extract to `shared` prematurely. Keep single-feature code inside the feature.
- Move to `shared` when a second feature actually needs it.
- Possible structure: `components/`, `hooks/`, `types/`, `utils/`, `constants/`.

## Imports

- Use the `@/` alias for `src/` (configure `paths` in `tsconfig.json`).
- Avoid deep relative imports (`../../../`). Relative imports are fine within the same component folder.

## Existing Code

Before adding a pattern, find similar functionality and follow it if it fits these standards.
If existing code violates the standards, improve it only when the change is safe and relevant.
