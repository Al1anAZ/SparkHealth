# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview the production build locally
```

No test runner or linter is configured.

## Architecture

This is a static landing page (SparkHealth brand) built with Vite + SCSS. There is no JavaScript logic beyond importing styles — `src/main.js` only imports `./style/main.scss`.

### SCSS folder structure

```
src/style/
  main.scss              # Entry point — imports only, plus .container layout
  utils/
    default.scss         # Browser CSS reset
    colors.scss          # All color variables
    font.scss            # Typography mixin + utility classes
    func.scss            # Flexbox mixin
    vars.scss            # Reusable design tokens ($rounded, $spacing-*)
  components/
    button.scss          # .button component
    header.scss          # .header component
    logo.scss            # .logo component
    footer.scss          # .footer component
```

**Rule: every reusable UI component gets its own file in `components/`.** When adding a new component, create `src/style/components/<name>.scss` and `@use` it in `main.scss`. Never put component styles directly in `main.scss`.

`main.scss` should only contain:

- `@use` imports for utils and components
- Global layout helpers like `.container` that don't belong to a single component

### Container

Use the `.container` class on any element that needs horizontal page padding (60px left/right). Apply it directly in HTML alongside the component class:

```html
<header class="header container">...</header>
<footer class="footer container">...</footer>
```

Do not add horizontal padding inside a component's own SCSS if `.container` covers it.

### Import pattern

Each file declares its own dependencies with `@use` and a namespace alias:

```scss
@use "../utils/colors.scss" as color;
@use "../utils/func.scss" as func;
// then use as: color.$purple, func.flex(...)
```

Utils are in `utils/`, so component files use `../utils/` paths.

### Typography

Typography classes are applied as HTML class attributes (not on semantic elements). Default text color in the `font-size` mixin is white, matching the navy (`#000035`) background.

### Variables

Use tokens from `vars.scss` instead of hardcoded values:

| Variable      | Value   | Usage                            |
| ------------- | ------- | -------------------------------- |
| `$rounded`    | `999px` | Pill/fully-rounded border-radius |
| `$spacing-sm` | `8px`   | Small gaps and padding           |
| `$spacing-md` | `16px`  | Medium gaps and padding          |
| `$spacing-lg` | `24px`  | Large gaps and padding           |

Import with `@use "../utils/vars.scss" as vars;` and use as `vars.$rounded`, `vars.$spacing-md`, etc. Never hardcode these values directly.

### Flexbox

Use the `func.flex()` mixin instead of raw flexbox. Defaults: `row, center, center, 0, wrap`. Named parameters available:

```scss
@include func.flex(row, $align: center, $gap: vars.$spacing-sm, $wrap: nowrap);
```

### Colors

| Variable        | Hex       | Usage                      |
| --------------- | --------- | -------------------------- |
| `$navy`         | `#000035` | Primary background         |
| `$purple`       | `#7A5CFA` | Interactive/hover          |
| `$purple-light` | `#DFDAFA` | Hover text states          |
| `$orange`       | `#E58F28` | CTA buttons, active states |
| `$error`        | `#FF3D47` | Error states               |

### Images

All necessary i
mages saved in @public folder

### HTML — Semantics & Accessibility

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` instead of generic `<div>` where meaningful.
- Every `<img>` must have an `alt` attribute. Decorative images use `alt=""`.
- Interactive elements use native tags: `<button>` for actions, `<a href>` for navigation. Never put click handlers on `<div>` or `<span>`.
- Navigation lists use `<nav><ul><li><a>` structure.
- Form inputs are always paired with a `<label>`.
- Use one `<h1>` per page; heading levels must not skip (`h1 → h2 → h3`).
- Landmark regions (header, main, footer, nav) must be present so screen readers can navigate.

### Liquid Glass Effect

- Use from @src/utils/liquid-glass.sccs glass effect during the creating design from figma where its needed

### Formatting

After adding or editing any code, run Prettier to format all changed files:

```bash
npx prettier --write .
```

### Additional

Dont add comments
