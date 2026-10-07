# SCSS

SCSS + CSS Modules. No Tailwind, no CSS-in-JS, no inline styles for static values unless explicitly requested.

## Component Styles

Colocate a module with its component:

```tsx
import styles from './UserCard.module.scss'

<article className={styles.card}>
```

- Class names: English, camelCase (`.card`, `.headerActions`, `.isActive`).
- Keep selectors shallow (max ~3 levels of nesting).
- No element-wide selectors (`div`, `p`) at module root; scope with a class.
- Combine conditional classes with a small helper or template string; do not add a dependency for it unless already present.
- Use design tokens (`var(--...)`) instead of magic values. See `styling/design-tokens.md`.

## Global Styles

```text
src/styles/
├── globals.scss    # imports reset, themes; base body/typography
├── variables.scss  # SCSS-only values (breakpoints)
├── mixins.scss     # reusable mixins (media queries, focus ring, truncate)
├── reset.scss
└── themes.scss     # CSS custom properties per theme
```

- `globals.scss` is imported once, in the root `layout.tsx`.
- Only global concerns go here: reset, fonts, tokens, themes, normalization.
- Never put feature-specific styles in global files.

## Using Mixins and Variables in Modules

```scss
@use '@/styles/mixins' as *;

.container {
  padding: var(--spacing-md);

  @include breakpoint-up(md) {
    padding: var(--spacing-lg);
  }
}
```

Use `@use`, not `@import`.
