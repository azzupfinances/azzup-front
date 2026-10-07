# Design Tokens

Design tokens are CSS custom properties defined in `src/styles/themes.scss`.

## Base Tokens

```scss
:root {
  --color-primary: #000000;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #222222;
  --color-muted: #666666;
  --color-border: #dddddd;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

## Rules

- Use existing tokens before writing a raw value.
- Name tokens by role, not appearance: `--color-danger`, not `--color-red`.
- Naming pattern: `--<category>-<role>[-<variant>]` (`--color-primary-hover`, `--font-size-sm`).
- Add a new token only when a value is reused or represents a design decision; keep one-off layout values local.
- Themes (e.g. dark mode) redefine the same tokens under a selector such as `[data-theme='dark']`; components never branch on theme.
- Breakpoints are SCSS variables in `variables.scss` (custom properties cannot be used in media queries).
- Do not duplicate tokens as SCSS variables.
