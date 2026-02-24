# SparkHealth Landing Page

Static marketing landing page for SparkHealth — an AI ambient documentation platform built for behavioral health enterprises.

## Tech Stack

- **Vite** — build tool and dev server
- **SCSS** — styling with modular component architecture
- No JavaScript logic (style imports only)

## Getting Started

```bash
npm install
npm run dev      # Start dev server with HMR at http://localhost:5173
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview the production build locally
```

## Project Structure

```
SparkHealth/
├── index.html               # Single-page HTML
├── public/                  # Static assets (SVGs, images)
└── src/
    ├── main.js              # Entry point — imports styles only
    └── style/
        ├── main.scss        # Root — imports all utils and components
        ├── utils/
        │   ├── colors.scss  # Color variables
        │   ├── default.scss # CSS reset
        │   ├── font.scss    # Typography mixin and utility classes
        │   ├── func.scss    # Flexbox mixin
        │   ├── liquid-glass.scss  # Liquid glass effect filter
        │   └── vars.scss    # Design tokens (spacing, border-radius)
        └── components/
            ├── button.scss
            ├── cta.scss
            ├── footer.scss
            ├── header.scss
            ├── hero.scss
            └── logo.scss
```

## Design Tokens

| Variable      | Value     | Usage               |
| ------------- | --------- | ------------------- |
| `$navy`       | `#000035` | Primary background  |
| `$purple`     | `#7A5CFA` | Interactive / hover |
| `$orange`     | `#E58F28` | CTA buttons         |
| `$rounded`    | `999px`   | Pill border-radius  |
| `$spacing-sm` | `8px`     | Small gaps          |
| `$spacing-md` | `16px`    | Medium gaps         |
| `$spacing-lg` | `24px`    | Large gaps          |

## SCSS Conventions

- Every reusable UI component has its own file in `src/style/components/`
- Each file declares its own `@use` dependencies with a namespace alias
- Use `func.flex()` mixin instead of raw flexbox
- Use `.container` class in HTML for horizontal page padding (60px)
- Typography classes are applied as HTML class attributes (e.g. `p2-medium`, `h1`)
