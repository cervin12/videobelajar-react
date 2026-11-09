# Test Plan — SkillPop / VideoBelajar 1.1

**Version:** 1.0 · **Date:** 2026-11-07 · **Status:** Draft

---

## 1. Scope & Objectives

Verify that the SkillPop web app (React 19 + TypeScript + Vite) behaves correctly on
**success paths** (happy flows return expected data and UI state) and **error paths**
(failures are handled gracefully: fallbacks, rollbacks, error messages, no crashes).

**In scope:**

| Area | Files |
|------|-------|
| API service layer | `src/services/api.ts` (course, student, notes, auth services) |
| Pages | `LandingPage`, `CoursePage`, `StudentDashboardPage`, `NotesPage`, `AuthPage` |
| App navigation | `src/App.tsx` (hash-based routing + floating page switcher) |
| Shared UI | `Header`, `Sidebar`, `ThemeToggle`, `Skeleton`, `RevealOnScroll` |

**Out of scope (for this iteration):**

- Visual/design regression (screenshot comparison)
- End-to-end tests with a real backend (MSW simulates the API; no real server exists)
- Performance/load testing
- Accessibility audit (may be added later)

---

## 2. Test Environment & Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| Vitest | ^5.1.0 | Test runner (config: `vitest.config.ts`) |
| @testing-library/react + user-event | ^16 / ^14 | Component & page rendering, user interaction |
| jest-dom | ^7.0.1 | DOM assertions |
| MSW (msw) | ^3.0.3 | API mocking via `src/mocks/handlers.ts` + `src/test/setupServer.ts` |
| jsdom | ^31.0.0 | DOM environment (`environment: 'jsdom'`) |

**Setup facts already in place:**

- `src/test/setup.ts`: global setup — MSW server lifecycle (`listen/resetHandlers/close`),
  `localStorage.clear()` after each test, mocks for `matchMedia`, `scrollTo`, `IntersectionObserver`.
- MSW handlers keep **stateful** data: notes persist to `localStorage['skillpop-notes']`,
  profile persists to `localStorage['skillpop_mock_student_profile']`.
- `localStorage` keys used by the app: `skillpop_token`, `skillpop_user`,
  `skillpop_mock_student_profile`, `skillpop-notes`, `skillpop-theme`.
- Error simulation pattern: `server.use(http.get('/api/...', () => HttpResponse.json({...}, { status: 500 })))`.

**Run commands:**

```bash
pnpm test            # watch mode
pnpm test:run        # single run
pnpm test:coverage   # coverage report (v8)
```

---

## 3. Test Strategy (Layers)

| Layer | Technique | File locations |
|-------|-----------|----------------|
| **L1 — Service layer (unit)** | Call service functions directly; assert requests, responses, headers, error behavior. Override handlers with `server.use(...)`. | `src/services/__tests__/api.test.ts` |
| **L2 — Page (integration)** | Render page inside `MemoryRouter`; assert UI flows end-to-end against default MSW handlers. | `src/pages/__tests__/` |
| **L3 — App navigation** | Render `App`; assert hash-based routing and switcher buttons. | `src/__tests__/App.test.tsx` (new) |
| **L4 — Shared components** | Small component tests only where logic exists (ThemeToggle persistence, Sidebar logout/navigation). | `src/components/__tests__/` (new) |

**Order of work (priority):** L2 Notes/Auth error cases → L2 Course/Dashboard → L1 gaps → L3 → L4.

---

## 4. SUCCESS TEST PLAN (Happy Path)

### 4.1 API Service Layer (`api.test.ts`)

| ID | Scenario | Precondition | Expected result |
|----|----------|--------------|-----------------|
| API-S-01 | `getCourses` returns course array | Default handler | Resolves `Course[]`, length > 0, first item has `id`, `title` |
| API-S-02 | `getCourseById` returns matching course | Default handler | Resolved course `id` matches requested id |
| API-S-03 | `getDisciplines` / `getFeaturedCourse` / `getQuickStats` / `getValuePromises` resolve | Default handler | Each resolves with non-empty data |
| API-S-04 | `getNotes()` with no params | Default handler | Resolves `Note[]` with seeded notes |
| API-S-05 | `getNotes({ q, tag })` builds query string | `server.use` capturing `request.url` | URL contains `q=<value>` and `tag=<value>`; `tag=all` is omitted |
| API-S-06 | `createNote` sends payload and returns created note | `server.use` capturing body | Request body matches payload; response has new `id`; status 201 |
| API-S-07 | `updateNote` sends partial payload | Default handler | Response reflects updated fields |
| API-S-08 | `deleteNote` returns `{ success, deletedId }` | Default handler | `deletedId` matches input id |
| API-S-09 | Auth header attached | `localStorage.skillpop_token = 'x'` | Request has `Authorization: Bearer x` |
| API-S-10 | No auth header without token | Empty localStorage | No `Authorization` header sent |
| API-S-11 | `studentService.getProfile` / `getActiveCourses` / `getMentorReview` / `getQuestBadges` / `getDiscordJams` / `getProjectAssets` | Default handler | Each resolves seeded data |
| API-S-12 | `updateProfile` PUT persists changes | Default handler | Response returns merged profile |
| API-S-13 | `authService.login` returns token + user | Default handler | Response has `token`, `user.name`, `user.email` |
| API-S-14 | `authService.register` returns token + user (201) | Default handler | Response status 201; user reflects submitted `fullName`, `selectedTrack` |
| API-S-15 | `authService.logout` clears session | Tokens in localStorage | `skillpop_token`, `skillpop_user`, `skillpop_mock_student_profile` removed |

### 4.2 NotesPage (integration)

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| NP-S-01 | Renders creator + initial notes | Render page | Title & "Take a note..." placeholders, Save Note button, seeded note cards appear after loading |
| NP-S-02 | Create note with title + content | Type title/content → Save Note | New note card appears with entered text; inputs reset; success toast shown |
| NP-S-03 | Create note with checklist | Enable checklist → add items (Enter/Add) → Save | New note renders checklist items, all unchecked |
| NP-S-04 | Create pinned note | Toggle pin in creator → Save | Note appears in "PINNED" section |
| NP-S-05 | Create note with color tint | Pick a color → Save | Card renders with matching color style |
| NP-S-06 | Tag parsing | Enter `blender, #shaders` → Save | Tags normalized to `#blender`, `#shaders`; deduplicated |
| NP-S-07 | Edit note via modal | Click Edit Note → change title/content/tags → Save Changes | Card updates; toast "updated" shown; modal closes |
| NP-S-08 | Modal closes on Cancel, backdrop click, Escape | Open modal → each close path | Modal unmounts; body scroll unlocked |
| NP-S-09 | Delete note | Click Delete Note | Note removed from grid; toast shown |
| NP-S-10 | Pin / unpin from card | Click pin button on a note | Note moves between PINNED and OTHERS sections; toast shown |
| NP-S-11 | Toggle checklist item | Click checklist item on a card | Checkbox state flips; completed item gets strikethrough |
| NP-S-12 | Search filter | Type query in header search | Only matching notes (title/content/tags/checklist) shown; count updates |
| NP-S-13 | Tag filter | Click a tag chip / "Pinned" filter | Only matching notes shown; "Showing X of Y notes" updates |
| NP-S-14 | Empty result state | Search for non-matching text | "No Notes Found" + Clear Filters button; clicking Clear Filters restores list |
| NP-S-15 | Loading skeleton | Slow handler / initial render | Skeleton cards visible while loading, replaced by notes after |
| NP-S-16 | Logout from sidebar | Click logout | `onNavigateToAuth` called; localStorage session keys cleared |
| NP-S-17 | Theme toggle persists | Toggle theme | `skillpop-theme` updated; `dark` class toggled on `documentElement` |

### 4.3 AuthPage (integration)

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| AP-S-01 | Register success | Fill fullName/email/password (≥6 chars), pick track → submit | Toast "Welcome to SkillPop"; `skillpop_token` + `skillpop_user` saved; `onNavigateToDashboard` called after ~700 ms |
| AP-S-02 | Login success | Switch to Log In → fill email/password → submit | Toast "Welcome back"; token + user saved; navigation callback called |
| AP-S-03 | Mode switching | Click Log In / Sign Up tabs | Fields & submit button text switch (`Jump Back In ⚡` ↔ `Claim Your Free Pass...`) |
| AP-S-04 | Show/hide password | Click visibility toggle | Input type toggles `password` ↔ `text` |
| AP-S-05 | Track selection | Click a track chip | Chip appears selected; submitted `selectedTrack` matches |
| AP-S-06 | Social sign-in simulation | Click Google/GitHub/Discord/Apple | Toast "…simulated successfully!" (no crash) |
| AP-S-07 | Forgot password | Click "Forgot password?" in login mode | Toast "Password reset instructions sent" |
| AP-S-08 | Submitting state | Submit (slow handler) | Button disabled, shows "Processing..." during request |

### 4.4 CoursePage (integration)

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| CP-S-01 | Catalog loads | Render page | Course cards, filter bar, hero/featured sections render from MSW data |
| CP-S-02 | Discipline/software/level filters | Select filter values | Grid shows only matching courses |
| CP-S-03 | Search | Type query in search bar | Matching courses only (title / instructor / software) |
| CP-S-04 | Pagination | Click page controls | Grid shows correct slice; controls reflect page state |
| CP-S-05 | Course detail view | Click a course card | Detail renders with syllabus weeks (4 seeded weeks) |
| CP-S-06 | Loading state | Slow handler | Skeleton/loader visible before data |

### 4.5 StudentDashboardPage (integration)

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| DP-S-01 | Dashboard loads all sections | Render page | Profile, quick stats, active courses, mentor review, badges, Discord jams, project assets render |
| DP-S-02 | Profile update | Edit profile field → save | `PUT /api/student/profile` called; UI reflects change; persists to localStorage |
| DP-S-03 | Navigation callbacks | Click nav links | Correct `onNavigate*` prop invoked |

### 4.6 App Navigation (new `src/__tests__/App.test.tsx`)

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| APP-S-01 | Default view | Render `App` with empty hash | LandingPage rendered |
| APP-S-02 | Initial hash routes | Set `window.location.hash` before render (`#notes`, `#courses`, `#dashboard`, `#auth`) | Corresponding page rendered |
| APP-S-03 | Switcher navigation | Click floating switcher buttons | Page changes; `window.location.hash` updated |
| APP-S-04 | `hashchange` event | Dispatch `hashchange` with `#auth` | AuthPage rendered |

### 4.7 Shared Components

| ID | Scenario | Expected result |
|----|----------|-----------------|
| CMP-S-01 | `ThemeToggle` click calls handler | Toggle state changes |
| CMP-S-02 | `Sidebar` navigation | `onNavigate` called with correct page key |
| CMP-S-03 | `Header` search input | `onSearchChange` receives typed value |

---

## 5. ERROR TEST PLAN (Failure Path)

### 5.1 API Service Layer

| ID | Scenario | Simulation (`server.use`) | Expected result |
|----|----------|---------------------------|-----------------|
| API-E-01 | `getNotes` 500 **with fallback** | `GET /api/notes → 500 { message }` | Resolves fallback notes array (no throw); warning logged |
| API-E-02 | `getNotes` network error with fallback | Handler throws / aborts | Resolves fallback data |
| API-E-03 | `createNote` 400 **no fallback** | `POST /api/notes → 400 { message: 'Title is required' }` | Rejects with `Error('Title is required')` (server message used) |
| API-E-04 | `createNote` non-JSON error | `POST → 502 plain text` | Rejects with `HTTP error 502: Bad Gateway` |
| API-E-05 | `updateNote` 404 | `PUT /api/notes/:id → 404 { message: 'Note not found' }` | Rejects with server message |
| API-E-06 | `deleteNote` 404 | `DELETE /api/notes/unknown → 404` | Rejects with 'Note not found' |
| API-E-07 | Auth failure 401 | `POST /api/auth/login → 401 { message: 'Invalid credentials' }` | Rejects with 'Invalid credentials'; **no** token saved |
| API-E-08 | Register failure 500 | `POST /api/auth/register → 500` | Rejects; no localStorage writes |
| API-E-09 | `logout` when server offline | `POST /api/auth/logout` throws | **Still clears** localStorage keys (finally block) |
| API-E-10 | Malformed JSON success body | `GET → 200 'not-json'` (endpoint without fallback) | Rejects with JSON parse error (surfaced, not swallowed) |
| API-E-11 | 204 No Content | `DELETE → 204` | Resolves `{}` without JSON parse failure |
| API-E-12 | Empty body 200 | `GET → 200 ''` | Resolves `{}` |

### 5.2 NotesPage

| ID | Scenario | Simulation | Expected result |
|----|----------|-----------|-----------------|
| NP-E-01 | Empty note blocked client-side | Click Save with no title/content/checklist | No request; toast "Please enter a title or note content."; state unchanged |
| NP-E-02 | Create fails (500) | `POST /api/notes → 500` | Toast "Failed to save note."; save status cleared; form retains input; no crash |
| NP-E-03 | Delete fails (500) | `DELETE /api/notes/:id → 500` | **Optimistic rollback**: deleted note reappears; toast "Failed to delete note on server." |
| NP-E-04 | Delete non-existent note (404) | `DELETE → 404` | Same rollback behavior as NP-E-03 |
| NP-E-05 | Update fails (500) | `PUT /api/notes/:id → 500` | Modal closes, then note **reverts** to previous data; toast "Failed to update note on server." |
| NP-E-06 | Pin toggle fails | `PUT → 500` | Pin state stays optimistic in UI (no revert) — log only; no crash *(document current behavior)* |
| NP-E-07 | Checklist toggle fails | `PUT → 500` | Same as NP-E-06 — no crash |
| NP-E-08 | Initial load: profile API fails | `GET /api/student/profile → 500` | Notes still render; profile falls back to default; no crash |
| NP-E-09 | Initial load: notes API fails | `GET /api/notes → 500` | Page renders empty notes list; no crash |
| NP-E-10 | Corrupted `skillpop-notes` localStorage | Seed invalid JSON | Handler falls back to seeded `initialNotesData`; page loads |
| NP-E-11 | Empty checklist add | Click Add with blank input | No item added, no crash |

### 5.3 AuthPage

| ID | Scenario | Simulation / Steps | Expected result |
|----|----------|--------------------|-----------------|
| AP-E-01 | Short password (<6 chars) | Submit with `abc` | Error box: "Password must be at least 6 characters long."; no request sent; submitting resets |
| AP-E-02 | Login server error (401) | `POST /api/auth/login → 401 { message: 'Invalid credentials' }` | Error message rendered in red alert; button re-enabled |
| AP-E-03 | Register server error (500) | `POST /api/auth/register → 500` | Error box shows server message; no token saved; form data preserved |
| AP-E-04 | Network failure on submit | Handler throws | Error box shows fallback text "Authentication failed..."; no crash |
| AP-E-05 | Error clears on resubmit | Trigger error → fix → resubmit | Old errorMessage removed before new attempt |
| AP-E-06 | Required fields empty | Submit empty form | Browser validation blocks submit (or app shows error) — no API call |

### 5.4 CoursePage

| ID | Scenario | Simulation | Expected result |
|----|----------|-----------|-----------------|
| CP-E-01 | Catalog 500 | `GET /api/courses → 500` | Falls back to local `coursesData` (service fallback); page renders |
| CP-E-02 | Course detail 500 | `GET /api/courses/:id → 500` | Falls back to first course; no crash |
| CP-E-03 | Empty result search | Search gibberish | Empty-state UI rendered (not blank screen) |
| CP-E-04 | Featured course failure | `GET /api/featured-course → 500` | Fallback data rendered |

### 5.5 StudentDashboardPage

| ID | Scenario | Simulation | Expected result |
|----|----------|-----------|-----------------|
| DP-E-01 | Profile 500 | `GET /api/student/profile → 500` | Falls back to `studentProfileData`; page renders |
| DP-E-02 | Any dashboard section fails (active-courses, badges, jams, assets, mentor-review) | 500 per endpoint | That section falls back; rest of page unaffected; no crash |
| DP-E-03 | Profile update fails | `PUT /api/student/profile → 500` | Error surfaced to user (toast/alert); form not left in broken state |

### 5.6 App / Components

| ID | Scenario | Steps | Expected result |
|----|----------|-------|-----------------|
| APP-E-01 | Unknown hash | `#unknown` initial hash | Falls back to LandingPage |
| CMP-E-01 | Sidebar logout when API offline | `POST /api/auth/logout` throws | Session cleared anyway; navigation still occurs |

---

## 6. Coverage Targets

| Layer | Current state | Target |
|-------|---------------|--------|
| `src/services/api.ts` | Partial (headers, fallback, some CRUD) | ≥ 90% lines |
| `src/pages/NotesPage.tsx` | 3 tests (render, create, checklist) | ≥ 80% lines |
| `src/pages/AuthPage.tsx` | 2 tests (render, mode switch) | ≥ 80% lines |
| `CoursePage`, `StudentDashboardPage`, `LandingPage` | 0 tests | ≥ 70% lines each |
| `src/App.tsx` | 0 tests | ≥ 80% |
| Components | 0 tests | ≥ 60% (logic-bearing only) |

**Definition of done per test case:**

1. Test exists under the layer listed above, with a unique ID in the `it(...)` description.
2. Passes in `pnpm test:run` (no `.only`/`.skip`).
3. For error cases: asserts BOTH user-visible outcome (toast/error/fallback) and absence of crash.

---

## 7. Execution & Reporting

```bash
pnpm test:run          # required before merge
pnpm test:coverage     # generates coverage/ (text + html)
```

- **Regression gate:** all IDs listed in §4/§5 must pass in CI; new PRs must not remove coverage from existing IDs.
- **Flakiness notes:** toast assertions should use `findByText` (toasts are async);
  AuthPage navigation happens ~700 ms after success — use `waitFor` with generous timeout or fake timers.
- **MSW state leakage:** `afterEach` clears `localStorage` and resets handlers globally (already in `setup.ts`);
  tests must re-seed `localStorage['skillpop-notes']` deliberately when testing corrupted/empty states.

## 8. Risks & Assumptions

- Optimistic pin/checklist failures (NP-E-06/07) currently only log — plan documents current behavior;
  if product requires rollback, behavior changes first, then tests.
- Hash routing is tested at `App` level; no react-router URL assertions on pages themselves (pages use `MemoryRouter`).
- MSW handler delays (50–150 ms) mean page tests must await `findBy*` queries.
