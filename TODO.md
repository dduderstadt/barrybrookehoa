# TODO — Barry Brooke HOA

Items are ordered by priority. Each item lists what to change, which file(s) are affected, and why it matters. Complete Priority 1 and 2 before starting any new feature.

---

## Priority 1 — Critical Code Quality Fixes

Small, isolated changes with high impact. Each takes less than an hour.

---

### 1.1 Fix the TypeScript configuration contradiction

**What:** Remove `"noImplicitAny": false` from `tsconfig.json`.

**File:** `tsconfig.json`

**Why:** `"strict": true` already enables `noImplicitAny: true`. The explicit `false` override silently defeats it — TypeScript will not catch missing type annotations. After removing it, run `npx tsc --noEmit` and fix any newly surfaced errors.

---

### 1.2 Fix the Card component `italic` prop type

**What:** Change the `italic` prop from `string` to `boolean`. Inside the component, derive the CSS class from the boolean.

**Files:** `src/components/Card.tsx`, `src/app/page.tsx`

**Why:** A component that accepts a CSS class string as a prop leaks styling concerns to callers. Any caller must know the internal implementation to use the prop correctly. A boolean makes intent clear and the API self-documenting.

```tsx
// Before
{ heading: string, description: string, className: string, italic: string }
// caller: italic="italic" or italic="font-normal"

// After
interface CardProps {
  heading: string;
  description: string;
  className?: string;
  italic?: boolean;
}
// caller: italic or italic={false}
```

---

### 1.3 Remove the duplicate `<title>` tag

**What:** Delete the `<head><title>Barry Brooke HOA</title></head>` tag from `layout.tsx`.

**File:** `src/app/layout.tsx`

**Why:** The `export const metadata` object is the App Router's authoritative title mechanism. The manual tag is redundant and produces duplicate titles in the rendered HTML, which confuses search crawlers and screen readers.

---

### 1.4 Remove the `nextjs` phantom dependency

**What:** Run `npm uninstall nextjs`.

**File:** `package.json`

**Why:** The `nextjs` package (version `^0.0.3`) is a stub with no code that predates the real `next` package. It pollutes `node_modules` and misleads anyone reading `package.json`.

---

### 1.5 Remove the `@types/pdfobject` orphan type package

**What:** Run `npm uninstall @types/pdfobject`.

**File:** `package.json`

**Why:** There is no `pdfobject` dependency in the project and no import of it anywhere. Dead dev dependencies inflate install time.

---

### 1.6 Add `aria-hidden="true"` to all decorative Font Awesome icons

**What:** Add `aria-hidden="true"` to every `<i className="fa-solid ...">` element on the home page.

**File:** `src/app/page.tsx`

**Why:** Screen readers attempt to read icon elements as text content (e.g. "house chimney", "people group") because they have no accessible text alternative. This interrupts the reading flow for assistive technology users.

---

### 1.7 Add `aria-label` to the `<nav>` element

**What:** Change `<nav className="...">` to `<nav aria-label="Main navigation" className="...">`.

**File:** `src/components/Navbar.tsx`

**Why:** When a page has more than one `<nav>` landmark, screen reader users need labels to distinguish between them. Establishing the pattern now prevents the oversight as the site grows.

---

### 1.8 Fix the favicon `href` path

**What:** Change `href="../public/favicon.ico"` to `href="/favicon.ico"`.

**File:** `src/app/layout.tsx`

**Why:** Next.js serves files from `public/` at the root path `/`. The relative path `../public/favicon.ico` is semantically wrong and will break if the build output changes.

---

### 1.9 Replace template literal on Image `src` with a plain string

**What:** Change `` src={`/header.png`} `` to `src="/header.png"`.

**File:** `src/components/Navbar.tsx`

**Why:** A template literal with no interpolation is unnecessary syntax noise.

---

### 1.10 Add `priority` prop to the Navbar logo `<Image>`

**What:** Add the `priority` prop to the `<Image>` in Navbar.

**File:** `src/components/Navbar.tsx`

**Why:** The logo is the largest above-the-fold image. Without `priority`, Next.js lazy-loads it, causing a layout shift (LCP degradation). Next.js also logs a warning about this in development.

---

## Priority 2 — Architecture Improvements

Reduces duplication and establishes patterns that all future features depend on. Do these before adding new pages.

---

### 2.1 Add brand color to Tailwind theme; remove all hardcoded `#1492df`

**What:**
1. In `tailwind.config.ts`, add `brand: '#1492df'` under `theme.extend.colors`.
2. Replace every `bg-[#1492df]` and `text-[#1492df]` occurrence with `bg-brand` and `text-brand`.

**Files:** `tailwind.config.ts`, `src/components/Navbar.tsx`, `src/app/page.tsx`

**Why:** The color is currently defined in 5 places. Changing the brand color requires touching every file. With a named token, one edit propagates everywhere.

---

### 2.2 Create `src/lib/constants.ts` and centralize all repeated values

**What:** Create the file with at minimum:

```typescript
export const HOA_EMAIL = 'barrybrookehoa@gmail.com';
export const HOA_NAME = 'Barry Brooke HOA';
export const HOA_SITE_URL = 'https://barrybrookehoa.com';
export const PDF_WORKER_VERSION = '3.4.120';
```

Replace every hardcoded occurrence in components and pages.

**Files to update:** `src/lib/constants.ts` (new), `src/components/Footer.tsx`, `src/components/Navbar.tsx`, `src/app/documents/page.tsx`, `src/app/layout.tsx`

**Why:** The email appears in 2 files today. When it changes, it must be updated in multiple places, which is error-prone.

---

### 2.3 Create a `PageLayout` component to eliminate the duplicated page shell

**What:** Create `src/components/PageLayout.tsx` that wraps `Navbar`, the `<main>` element, and `Footer`. Both pages have an identical outer structure.

**Files:** Create `src/components/PageLayout.tsx`; update `src/app/page.tsx` and `src/app/documents/page.tsx`.

**Also:** Move the `margin-top: 4.7rem` from `globals.css` into a Tailwind class (`mt-[4.7rem]`) on the `<main>` inside `PageLayout`, eliminating a global CSS rule.

**Why:** Every new route must currently copy-paste the same shell. A `PageLayout` component makes the site structure DRY — a single layout change propagates everywhere.

---

### 2.4 Create a `NavLink` component to eliminate repeated nav link class strings

**What:** Create `src/components/NavLink.tsx` wrapping `next/link` with the shared class `"text-sm px-4 py-2 leading-none rounded-full hover:bg-black"`. Replace the three `<Link className="...">` usages in Navbar.

**Files:** Create `src/components/NavLink.tsx`; update `src/components/Navbar.tsx`.

**Why:** The class string is repeated verbatim three times. Adding a new nav link or restyling them requires touching every instance.

---

### 2.5 Migrate Font Awesome from CDN to npm package

**What:**
1. `npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`
2. Remove the CDN `<link>` tag from `layout.tsx`.
3. Replace each `<i className="fa-solid fa-X">` with `<FontAwesomeIcon icon={faX} />`.

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`

**Why:** The CDN stylesheet is a render-blocking resource in the critical rendering path. The npm package tree-shakes to only the icons used, bundles them at build time, and eliminates the external dependency.

---

### 2.6 Serve the PDF.js worker locally instead of from `unpkg.com`

**What:** Copy the worker file from `node_modules/pdfjs-dist/legacy/build/pdf.worker.js` into `public/pdf.worker.js`, then change the `workerUrl` in `documents/page.tsx` to `"/pdf.worker.js"`.

**File:** `src/app/documents/page.tsx`

**Why:** Loading the worker from `unpkg.com` adds an external network dependency. If unpkg is down or slow, the PDF viewer fails entirely.

---

### 2.7 Move `canvas` from production to dev dependencies

**What:** Run `npm install -D canvas` (move from `dependencies` to `devDependencies`), or `npm uninstall canvas` if it is not used in any production code path.

**File:** `package.json`

**Why:** `canvas` is a native Node.js addon requiring build tools at install time. If it is only needed in test environments, it should not be a production dependency.

---

### 2.8 Remove redundant responsive grid column classes

**What:** Replace `grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1` with just `grid grid-cols-1` on the `<main>` elements.

**Files:** `src/app/page.tsx`, `src/app/documents/page.tsx`

**Why:** Repeating the same value at every breakpoint is noise. `grid-cols-1` applies at all screen sizes by default. The extra classes mislead future editors into thinking there is an intentional responsive change.

---

## Priority 3 — Testing Setup and Coverage

Complete Priority 1 and 2 first so tests are written against the clean component API.

---

### 3.1 Install and configure Vitest + React Testing Library

**What:**
1. `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`
2. Create `vitest.config.ts` with a jsdom test environment.
3. Add `test` and `test:ci` scripts to `package.json`.
4. Create `src/test/setup.ts` that imports `@testing-library/jest-dom`.

**Files:** Create `vitest.config.ts`, `src/test/setup.ts`; update `package.json`.

**Why:** The project currently has zero tests. No refactoring or feature work can be verified without them.

---

### 3.2 Write unit tests for the `Card` component

**What:** Create `src/components/Card.test.tsx` covering:
- Renders `heading` text
- Renders `description` text
- When `italic={true}`, description has italic styling
- When `italic` is unset, italic styling is absent
- Accepts and applies additional `className`

**File:** Create `src/components/Card.test.tsx`

---

### 3.3 Write unit tests for the `Navbar` component

**What:** Create `src/components/Navbar.test.tsx` covering:
- Renders navigation links to `/`, `/documents`, and the contact email
- Logo image has a non-empty `alt` attribute

**File:** Create `src/components/Navbar.test.tsx`

---

### 3.4 Write unit tests for the `Footer` component

**What:** Create `src/components/Footer.test.tsx` covering:
- Renders the contact email address as a visible link
- The email `href` starts with `mailto:`

**File:** Create `src/components/Footer.test.tsx`

---

### 3.5 Write render tests for each page

**What:** Create `src/app/page.test.tsx` and `src/app/documents/page.test.tsx`. Assert each page renders without throwing and contains expected heading text. Mock `@react-pdf-viewer` in the documents page test.

**Files:** Create `src/app/page.test.tsx`, `src/app/documents/page.test.tsx`

---

### 3.6 Add Playwright for end-to-end testing

**Defer until the contact form is built.** Once ready:
1. Install Playwright.
2. Write a smoke test: load home page, navigate to documents, verify PDF viewer appears.
3. Write a contact form submission test.

**Files:** Create `playwright.config.ts`, `e2e/smoke.spec.ts`; update `package.json`.

---

## Priority 4 — Planned Features

Implement in order — later features (payments) depend on earlier ones (auth).

---

### 4.1 News Portal

**What:** Static Markdown posts in `src/content/news/`. List at `/news`; single post at `/news/[slug]`. Utility in `src/lib/news.ts` reads and parses posts.

**Files to create:** `src/app/news/page.tsx`, `src/app/news/[slug]/page.tsx`, `src/content/news/` (directory), `src/lib/news.ts`

**Why:** The README lists this as a planned feature. Static Markdown requires no backend and is easy for a non-technical board to update via a pull request.

---

### 4.2 Community Calendar

**What:** Embed a Google Calendar widget or use the Google Calendar API to display upcoming events at `/calendar`.

**File to create:** `src/app/calendar/page.tsx`

**Note:** Mark the page as a Client Component and lazy-load the embed. Provide a text alternative list of events for screen readers.

---

### 4.3 Contact Form

**What:**
1. Form at `/contact` (name, email, message).
2. Server Action (`src/app/contact/actions.ts`) sends form data to `HOA_EMAIL` via Resend or SendGrid.
3. Client-side and server-side validation.
4. Success and error states visible after submission.
5. Update the "Contact Us" nav link to point to `/contact` instead of `mailto:`.

**Files to create:** `src/app/contact/page.tsx`, `src/app/contact/actions.ts`

---

### 4.4 Member Authentication

**What:** NextAuth.js v5 (Auth.js) with email/magic-link sign-in. Gate member-only content behind session checks using Next.js middleware.

**Files to create:** `src/auth.ts`, `src/middleware.ts`, `src/app/auth/signin/page.tsx`, `src/app/api/auth/[...nextauth]/route.ts`

**Note:** Decide on a database (Supabase or Neon Postgres) before implementing auth — Auth.js needs a session adapter.

---

### 4.5 Online Dues Payments

**What:** Stripe Checkout to accept annual HOA dues at `/payments`. Webhook endpoint to verify payments. Tie payments to member accounts if auth is implemented.

**Files to create:** `src/app/payments/page.tsx`, `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/webhook/route.ts`

**Note:** Never store raw card data. Always verify the Stripe webhook signature. Test in Stripe's test mode before going live.

---

## Priority 5 — Performance and SEO

Polish items that improve discoverability and load speed. Do these before any public launch.

---

### 5.1 Add Open Graph metadata to all pages

**What:** Extend the `metadata` export in `layout.tsx` with an `openGraph` block. Override per-page in each `page.tsx`.

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/documents/page.tsx`

**Why:** Without Open Graph tags, links shared on social media render with no preview image or description.

---

### 5.2 Add `sitemap.ts` for search engine indexing

**What:** Create `src/app/sitemap.ts` using the Next.js Metadata API sitemap convention. List `/`, `/documents`, and future public routes.

**File:** Create `src/app/sitemap.ts`

---

### 5.3 Add `robots.ts`

**What:** Create `src/app/robots.ts` to allow indexing of public pages and disallow future member-only routes (e.g. `/payments`, `/account`).

**File:** Create `src/app/robots.ts`

---

### 5.4 Fix heading hierarchy on all pages

**What:** Add an `<h1>` element to each page. Demote current top-level headings to `<h2>` only if an `<h1>` has been established above them.

**Files:** `src/app/page.tsx`, `src/app/documents/page.tsx`

**Why:** Search engines and screen readers use heading hierarchy to understand page structure. A page without an `<h1>` has poor SEO and confusing reading order.

---

### 5.5 Add loading state for the PDF viewer page

**What:** Create `src/app/documents/loading.tsx` using Next.js's loading.js convention. Show a spinner or skeleton while the PDF viewer chunk loads.

**File:** Create `src/app/documents/loading.tsx`

---

### 5.6 Add error boundary for the PDF viewer

**What:** Create `src/app/documents/error.tsx` using Next.js's error.js convention. Display a friendly message with a retry option if the PDF fails to load.

**File:** Create `src/app/documents/error.tsx`

---

### 5.7 Move PDF assets to cloud storage

**What:** Host PDF files on a cloud storage service (AWS S3, Cloudflare R2, or Supabase Storage) rather than bundling them with the Next.js deployment.

**Why:** Large PDFs in `public/` increase deployment size and cold start time. Cloud storage with a CDN serves files faster and allows document updates without redeploying the site.
