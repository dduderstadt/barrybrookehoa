# Barry Brooke HOA — Project Standards

## Project Overview

Barry Brooke HOA is a community homeowners association website. Its purpose is to give residents a single place to access HOA documents, read announcements, and contact the board. It is a small public-facing site with no backend or authentication today, but authentication and payments are planned.

The site is hosted as a statically-exported or server-rendered Next.js application. Non-technical board members must be able to hand this project off, so clarity and convention matter more than cleverness.

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.1.7 |
| UI library | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3.4.1 |
| Fonts | next/font/google (Geist) | bundled |
| PDF viewer | @react-pdf-viewer | 3.12 |
| Icons | @fortawesome/react-fontawesome | (migrate to this from CDN) |
| Linting | ESLint (next/core-web-vitals + next/typescript) | 9 |

### Key Decisions

- **App Router only.** Do not add a `pages/` directory. All routes live under `src/app/`.
- **Server Components by default.** Only add `"use client"` to components that genuinely need browser APIs or React hooks. The Documents page is a justified exception because @react-pdf-viewer requires a browser environment.
- **No state management library.** The site is small and mostly static. Use React `useState`/`useContext` only if clearly needed.
- **No ORM or database today.** When persistence is needed (payments, auth), evaluate Next.js API routes plus a hosted Postgres (e.g. Neon or Supabase).
- **Tailwind for all styling.** Do not write new plain CSS. The only allowed exceptions are third-party library overrides in `globals.css` (e.g. hiding PDF viewer UI elements).

---

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Serve production build locally
npm run start
# or the convenience alias:
npm run build-and-start
```

---

## File and Folder Structure

```
src/
  app/                        # Next.js App Router routes
    layout.tsx                # Root layout (fonts, global CSS, metadata)
    page.tsx                  # Home route  /
    globals.css               # Global styles (Tailwind layers + third-party overrides only)
    documents/
      page.tsx                # Documents route  /documents
    # Future routes follow the same folder-per-route pattern:
    # news/page.tsx, calendar/page.tsx, contact/page.tsx, etc.

  components/                 # Shared React components
    Card.tsx                  # Generic content card
    Navbar.tsx                # Site navigation bar
    Footer.tsx                # Site footer
    # Planned additions:
    # PageLayout.tsx          # Shared page shell (Navbar + main + Footer)
    # NavLink.tsx             # Single styled navigation link

  lib/                        # Pure utility modules (no JSX)
    constants.ts              # Site-wide constants (email, site name, etc.)
    # Future: api.ts, auth.ts, etc.

public/
  assets/                     # Static assets (images, PDFs)
    grass-bg.jpg
    2025candr.pdf
  header.png
  favicon.ico
```

**Rules:**
- One component per file. File name matches the default export name (PascalCase).
- Place a component in `src/components/` only if it is used by more than one route. Route-specific sub-components stay in the route's own folder.
- All shared constants go in `src/lib/constants.ts`. Never hardcode repeated values (emails, colors, URLs) directly in components or pages.

---

## TypeScript Standards

- `strict: true` is the target; `noImplicitAny` must be `true`. Do not add `"noImplicitAny": false` to `tsconfig.json` — it silently defeats `strict`.
- Explicitly type every component prop with an `interface` or `type` alias. Do not use inline object types on function signatures for non-trivial shapes.
- Prefer `interface` for component props; `type` for unions, intersections, and primitive aliases.
- Never use `any`. If a third-party type is missing, use `unknown` and narrow it, or extend the third-party type in a `*.d.ts` file.
- Avoid `// eslint-disable` and `// @ts-ignore` suppression comments. If a suppression is unavoidable (e.g. a known third-party bug), document the reason on the same line.
- Boolean props must be typed as `boolean`, not as string class names. Example: `italic: boolean` not `italic: string`.

### Component Prop Typing Pattern

```typescript
interface CardProps {
  heading: string;
  description: string;
  className?: string;
  /** When true, renders description text in italic style. */
  italic?: boolean;
}

export default function Card({ heading, description, className, italic = false }: CardProps) {
  // ...
}
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase file + default export | `Card.tsx`, `export default function Card` |
| Non-component modules | camelCase | `constants.ts`, `useScrollPosition.ts` |
| Constants | SCREAMING_SNAKE_CASE | `HOA_EMAIL`, `HOA_NAME` |
| Route folders | lowercase-kebab | `documents/`, `news-portal/` |
| Custom hooks | `use` prefix, camelCase | `useDocumentList.ts` |

---

## Component Standards

1. **Props over configuration.** Prefer explicit, well-named boolean props to string-based CSS injection. The `italic` prop on `Card` is the canonical bad example — callers should not be responsible for knowing which CSS class to pass.
2. **No `style={{}}` for layout.** Use Tailwind utilities. The only accepted exception is viewport-relative heights like `h-[60vh]` when Tailwind config doesn't cover it.
3. **Semantic HTML.** Use `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>` correctly. Do not use `<div>` for interactive elements.
4. **Accessibility minimum bar:**
   - Every `<img>` and `<Image>` has a meaningful `alt` attribute (or `alt=""` for decorative images).
   - Every icon-only interactive element has an `aria-label`.
   - Font Awesome `<i>` tags that are decorative must have `aria-hidden="true"`.
   - Color contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
5. **Server vs. client.** Write components as Server Components unless they use `useState`, `useEffect`, `useRef`, `useContext`, event handlers, or browser-only APIs. Add `"use client"` at the top of the file — not in a parent.
6. **No prop drilling beyond two levels.** If a value needs to pass more than two levels deep, move it to a constant or a React context.

---

## CSS and Tailwind Standards

- The brand blue `#1492df` must be defined **once** in `tailwind.config.ts` under `theme.extend.colors` as `brand`, and referenced everywhere as `bg-brand`, `text-brand`, etc.
- `globals.css` contains only:
  - Tailwind `@tailwind base/components/utilities` directives
  - CSS custom properties (`--background`, `--foreground`)
  - Third-party library overrides (PDF viewer element hiding)
  - Any CSS property that Tailwind genuinely cannot express
- Do not add new plain CSS rules to `globals.css` for layout or typography that can be expressed as Tailwind classes.
- The `margin-top: 4.7rem` on `main` in `globals.css` must be replaced with `mt-[4.7rem]` on the `<main>` element inside a `PageLayout` component.
- Repeated Tailwind class strings must be extracted into a component, not copy-pasted.

---

## Testing Standards

The project currently has no tests. All new features must include tests. Existing components should be backfilled with tests incrementally.

### Recommended Stack

- **Unit / component tests:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-end tests:** [Playwright](https://playwright.dev/) (add when the contact form and payments land)

### Coverage Targets

| Type | Minimum target |
|---|---|
| Shared components (Card, Navbar, Footer) | 80% line coverage |
| Page-level rendering | One render test per page |
| New features | Tests written alongside implementation |

### What to Test

- Components render without throwing.
- Props control output correctly (e.g. `italic` prop changes rendered class).
- Links point to the correct `href`.
- Accessibility: use `@testing-library/jest-dom` matchers like `toBeVisible`, `toHaveAccessibleName`.
- Do not test Tailwind class names directly — test behaviour and output text.

### Running Tests (once configured)

```bash
npm run test          # unit tests (watch mode in dev)
npm run test:ci       # unit tests (single run, for CI)
npm run test:e2e      # Playwright end-to-end
```

---

## Git Conventions

### Branching

- `main` — production-ready code only. Direct pushes are discouraged; use pull requests.
- `feature/<short-description>` — new features (e.g. `feature/news-portal`)
- `fix/<short-description>` — bug fixes (e.g. `fix/card-italic-prop`)
- `chore/<short-description>` — non-functional changes: deps, config, docs

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`

Examples:
```
feat(card): convert italic prop from string to boolean
fix(navbar): replace hardcoded email with HOA_EMAIL constant
chore(tailwind): add brand color to theme config
test(card): add rendering tests for italic and heading props
```

- Keep the summary line under 72 characters.
- Reference issue numbers in the footer: `Closes #12`.

---

## Performance Guidelines

- **No CDN dependencies in `<head>` for production.** Font Awesome CSS loaded from a CDN is a render-blocking resource. Install the `@fortawesome/react-fontawesome` package instead.
- **No CDN worker URLs.** The PDF.js worker loaded from `unpkg.com` creates an external network dependency. Serve the worker from `/public` or reference the local `node_modules` path.
- **Images.** Always use `next/image` (`<Image />`). Provide accurate `width` and `height`. Use `priority` on the Navbar logo since it is above the fold.
- **PDF viewer.** The viewer is already on a separate `"use client"` route. If bundle size grows, add `next/dynamic` with `ssr: false` for the viewer component.
- **Fonts.** Geist is loaded via `next/font/google` which handles subsetting and self-hosting automatically. Do not add additional `<link>` font tags.

---

## Accessibility Guidelines

- Run [axe DevTools](https://www.deque.com/axe/devtools/) or the browser accessibility tree inspector before merging any UI change.
- All interactive elements (links, buttons) must have a visible focus ring. Use Tailwind's `focus-visible:ring` utilities.
- The `<nav>` landmark must have `aria-label="Main navigation"`.
- Page headings must follow a logical hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`, etc.
- Icon fonts used purely for decoration must have `aria-hidden="true"` on the `<i>` element.

---

## SEO and Metadata

Every page must export a `metadata` object. Minimum required fields:

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Barry Brooke HOA',
  description: 'Short description for search engines (150–160 chars).',
  openGraph: {
    title: 'Page Title | Barry Brooke HOA',
    description: '...',
    url: 'https://barrybrookehoa.com/page',
    siteName: 'Barry Brooke HOA',
    type: 'website',
  },
};
```

The root `layout.tsx` exports a base `metadata` object — child pages can extend or override it. Do not duplicate `<title>` in both a `metadata` export and a manual `<head><title>` tag.

---

## Common Pitfalls to Avoid

| Pitfall | What to do instead |
|---|---|
| Hardcoding `#1492df` | Use `bg-brand` / `text-brand` from Tailwind theme |
| Passing CSS class names as prop values | Use boolean props; apply classes inside the component |
| Copy-pasting the page shell (Navbar + main + Footer) | Use `PageLayout` wrapper component |
| Copy-pasting nav link class string | Use `NavLink` component |
| Adding `noImplicitAny: false` to tsconfig | Remove it; `strict: true` already covers it |
| Using `<i className="fa-solid ...">` without `aria-hidden` | Add `aria-hidden="true"` to all decorative icons |
| Loading external scripts/styles from CDN in `<head>` | Install the npm package; serve assets locally |
| Loading PDF worker from unpkg.com | Copy worker to `public/` and reference `/pdf.worker.js` |
| Template literals with no interpolation: `` src={`/header.png`} `` | Use a plain string: `src="/header.png"` |
