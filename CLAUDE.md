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

This is a multi-page static site (SparkHealth brand) built with Vite + SCSS. Each page has its own HTML file. There are no JS entry points — all styles are loaded via `<link rel="stylesheet">` tags in `<head>` (render-blocking, prevents flash of unstyled content).

### Routing

| URL                       | HTML file                          |
| ------------------------- | ---------------------------------- |
| `/`                       | `index.html`                       |
| `/pages/why-sparkhealth/` | `pages/why-sparkhealth/index.html` |
| `/pages/platform/`        | `pages/platform/index.html`        |
| `/pages/about/`           | `pages/about/index.html`           |

All pages are registered in `vite.config.js` under `build.rollupOptions.input`. Adding a new page requires an entry there.

### SCSS folder structure

```
src/style/
  main.scss              # Shared entry point — imports utils + shared components + .container
  utils/
    default.scss         # Browser CSS reset
    colors.scss          # All color variables
    font.scss            # Typography mixin + utility classes
    func.scss            # Flexbox mixin
    vars.scss            # Reusable design tokens ($rounded, $spacing-*)
  components/            # Styles used on 2+ pages
    button.scss
    excellence.scss
    header.scss
    hero.scss
    intro.scss
    logo.scss
    cta.scss
    footer.scss
  pages/                 # Styles used on exactly 1 page
    why-sparkhealth/
      different.scss
    platform/
      excellence.scss
    about/
      about.scss
```

**Rule: `components/` = styles used on 2 or more pages. `pages/<page>/` = styles used on exactly 1 page.**

When adding a new shared component, create `src/style/components/<name>.scss` and `@use` it in `main.scss`.

When adding page-specific styles, create `src/style/pages/<page-name>/<name>.scss` and import it in that page's JS entry only.

`main.scss` should only contain:

- `@use` imports for utils and shared components
- Global layout helpers like `.container` that don't belong to a single component

### Stylesheet loading

Each page loads its styles via `<link rel="stylesheet">` tags in `<head>`. Always include `main.scss` plus the page-specific SCSS:

```html
<link rel="stylesheet" href="/src/style/main.scss" />
<link rel="stylesheet" href="/src/style/pages/why-sparkhealth/different.scss" />
```

Using `<link>` tags (not JS imports) ensures styles are render-blocking and eliminates flash of unstyled content.

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

- Files in `components/` use `../utils/` paths.
- Files in `pages/<page>/` use `../../utils/` paths (two levels up).

### Nav links

All nav and footer links must use absolute paths. Never use `href="#"` or relative paths:

```html
<a href="/">Home</a>
<a href="/pages/why-sparkhealth/">Why SparkHealth</a>
<a href="/pages/platform/">Platform</a>
<a href="/pages/about/">About Us</a>
```

The active page link gets `aria-current="page"`.

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

All necessary images saved in @public folder

### HTML — Semantics & Accessibility

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` instead of generic `<div>` where meaningful.
- Every `<img>` must have an `alt` attribute. Decorative images use `alt=""`.
- Interactive elements use native tags: `<button>` for actions, `<a href>` for navigation. Never put click handlers on `<div>` or `<span>`.
- Navigation lists use `<nav><ul><li><a>` structure.
- Form inputs are always paired with a `<label>`.
- Use one `<h1>` per page; heading levels must not skip (`h1 → h2 → h3`).
- Landmark regions (header, main, footer, nav) must be present so screen readers can navigate.

### Liquid Glass Effect

- Use from @src/utils/liquid-glass.scss glass effect during the creating design from figma where its needed
- Copy the `<svg style="display:none">` filter block into each page's HTML (the SVG filter is resolved per-document)

### Formatting

After adding or editing any code, run Prettier to format all changed files:

```bash
npx prettier --write .
```

### Scroll Animation

`src/js/scroll-animation.js` provides opacity-based card highlighting as the user scrolls. Desktop-only — on mobile (`≤1000px`) cards remain a normal vertical list with no animation.

**Behavior:** Left text block (`.excellence-text`) stays sticky at vertical center (`top: 50vh; transform: translateY(-50%)`). Right cards column scrolls naturally. The card whose center is closest to the viewport center gets `data-card-state="focus"` (full opacity); all others get `data-card-state="dim"` (30% opacity).

**Required data attributes:**

| Attribute                   | Element                      | Role                                |
| --------------------------- | ---------------------------- | ----------------------------------- |
| `data-scroll-cards-section` | `<div>` wrapping the section | marks as scroll animation container |
| `data-scroll-card`          | each card element            | JS sets `data-card-state`           |

**To apply to a new section:**

1. Wrap the `<section>` in `<div data-scroll-cards-section>`
2. Add `data-scroll-card` to each card
3. Add `<script type="module" src="/src/js/scroll-animation.js"></script>` to the page
4. Add corresponding CSS using `[data-scroll-cards-section] &` selector pattern (see `excellence.scss`)
5. Make the left text block sticky with `position: sticky; top: 50vh; transform: translateY(-50%)`

### Additional

Dont add comments
