# TODO — Barry Brooke HOA

Items are ordered by priority. Each item lists what to change, which file(s) are affected, and why it matters.

---

## Priority 2 — Architecture Improvements

Reduces duplication and establishes patterns that all future features depend on.

---

### 2.1 Create `src/lib/constants.ts` and centralize all repeated values

**What:** Create the file with at minimum:

```typescript
export const HOA_EMAIL = 'barrybrookehoa@gmail.com';
export const HOA_NAME = 'Barry Brooke HOA';
export const HOA_SITE_URL = 'https://barrybrookehoa.com';
```

Replace every hardcoded occurrence in components and pages.

**Files to update:** `src/lib/constants.ts` (new), `src/components/Footer.tsx`, `src/components/Navbar.tsx`, `src/app/layout.tsx`

**Why:** The email appears in multiple files today. When it changes, it must be updated in multiple places, which is error-prone.

---

### 2.2 Create a `NavLink` component to eliminate repeated nav link class strings

**What:** Create `src/components/NavLink.tsx` wrapping `next/link` with the shared class string used across all nav links. Replace the repeated `<Link className="...">` usages in Navbar.

**Files:** Create `src/components/NavLink.tsx`; update `src/components/Navbar.tsx`.

**Why:** The class string is repeated verbatim across desktop and mobile nav links. Adding a new nav link or restyling them requires touching every instance.

---

### 2.3 Move `canvas` from production to dev dependencies

**What:** Run `npm install -D canvas` (move from `dependencies` to `devDependencies`), or `npm uninstall canvas` if it is not used in any production code path.

**File:** `package.json`

**Why:** `canvas` is a native Node.js addon requiring build tools at install time. If it is only needed in test environments, it should not be a production dependency.

---

## Priority 3 — Testing

---

### 3.1 Write tests for the `PageLayout` component

**What:** Create `src/test/PageLayout.test.tsx` covering:
- Children are rendered inside the layout
- Navbar and Footer are present

**File:** Create `src/test/PageLayout.test.tsx`

**Why:** `PageLayout` is a shared component used by every page and currently has no test coverage.

---

### 3.2 Add Playwright for end-to-end testing

**Defer until the contact form is built.** Once ready:
1. Install Playwright.
2. Write a smoke test: load home page, navigate to documents, verify PDF viewer appears.
3. Write a contact form submission test.

**Files:** Create `playwright.config.ts`, `e2e/smoke.spec.ts`; update `package.json`.

---

## Priority 4 — Planned Features

---

### 4.1 Announcements Section

**What:** Add a static announcements array to `src/lib/constants.ts`. Display active announcements on the home page between the welcome card and board of directors sections. Each entry should have a title, body, and date.

**Files:** `src/lib/constants.ts`, `src/app/page.tsx`

**Why:** The board needs a way to surface time-sensitive community updates (e.g. upcoming meetings, maintenance notices) without a full CMS. A static array in constants.ts keeps it simple and editable via a pull request.

---

### 4.2 Contact Form

**What:**
1. Form at `/contact` (name, email, message).
2. Server Action (`src/app/contact/actions.ts`) sends form data to `HOA_EMAIL` via Resend or SendGrid.
3. Client-side and server-side validation.
4. Success and error states visible after submission.
5. Update the "Contact Us" nav link to point to `/contact` instead of `mailto:`.

**Files to create:** `src/app/contact/page.tsx`, `src/app/contact/actions.ts`

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

**What:** Create `src/app/documents/candr/loading.tsx` using Next.js's loading.js convention. Show a spinner or skeleton while the PDF viewer chunk loads.

**File:** Create `src/app/documents/candr/loading.tsx`

---

### 5.6 Add error boundary for the PDF viewer

**What:** Create `src/app/documents/candr/error.tsx` using Next.js's error.js convention. Display a friendly message with a retry option if the PDF fails to load.

**File:** Create `src/app/documents/candr/error.tsx`

---

### 5.7 Move PDF assets to cloud storage

**What:** Host PDF files on a cloud storage service (AWS S3, Cloudflare R2, or Supabase Storage) rather than bundling them with the Next.js deployment.

**Why:** Large PDFs in `public/` increase deployment size and cold start time. Cloud storage with a CDN serves files faster and allows document updates without redeploying the site.
