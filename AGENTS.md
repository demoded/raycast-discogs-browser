# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Key commands

All commands are run from the repository root (`discogs-browser`). Dependencies are managed with `npm`.

- Install dependencies:
  - `npm install`
- Start Raycast development mode for this extension:
  - `npm run dev`
  - This runs `ray develop` as defined in `package.json` and lets you live-reload the extension from Raycast.
- Lint the project using the Raycast ESLint config:
  - `npm run lint`
- Auto-fix lint issues where possible:
  - `npm run fix-lint`
- Build the extension bundle:
  - `npm run build`
- Publish to the Raycast Store (when appropriate):
  - `npm run publish`
  - Note: there is a `prepublishOnly` script that intentionally prevents publishing this package to npm directly; use `npm run publish` for Raycast Store distribution instead of `npm publish`.

### Tests

- There is currently no test script defined in `package.json` and no test files in the repo. If you introduce tests, add an appropriate `"test"` script to `package.json` (e.g., Jest, Vitest, or Node-based tests) and document how to run a single test file there.

## Project overview

This repository contains a Raycast extension called **Discogs Browser**. It searches the Discogs music database for release information by:
- Free text query (artist, album, etc.)
- Catalog number
- Barcode

The extension targets both macOS and Windows Raycast platforms and is implemented in TypeScript using the Raycast React-based API.

## High-level architecture

The codebase is intentionally small and organized around a few core modules:

- **Extension manifest (`package.json`)**
  - Declares the extension metadata and commands (`search-text`, `search-catno`, `search-barcode`).
  - Wires each command name to a corresponding React component under `src/`.
  - Defines Raycast-specific scripts (`ray develop`, `ray lint`, `ray build`) and the dependencies (`@raycast/api`, `@raycast/utils`).

- **Type definitions (`src/types.ts`)**
  - Centralizes the Discogs domain types:
    - `DiscogsResult` models a single search result (id, title, year, country, catalog number, barcodes, format, labels, cover image URL, and `resource_url`).
    - `DiscogsSearchResponse` wraps a `results: DiscogsResult[]` array.
  - All other modules import these types instead of defining ad-hoc shapes.

- **API client (`src/api.ts`)**
  - Encapsulates all interaction with the Discogs Search API.
  - Exposes a single function:
    - `discogsSearch(params: Record<string, string>): Promise<DiscogsSearchResponse>`
      - Builds a query string from `params` plus a fixed `per_page=50` limit.
      - Issues a `fetch` to `https://api.discogs.com/database/search` with a custom `User-Agent` header.
      - Throws an error if `response.ok` is false (non-2xx), otherwise returns the parsed JSON as `DiscogsSearchResponse`.
  - Future behavior changes related to Discogs (e.g., authentication headers, rate limiting, pagination, or error normalization) should be implemented here so all commands benefit uniformly.

- **Shared UI (`src/utils.tsx`)**
  - Provides the shared `ReleaseItem` component:
    - Renders a `List.Item` configured for a `DiscogsResult`.
    - Displays the title and a composite subtitle (year, catalog number, formats) joined with separators.
    - Shows labels via `accessories` and uses the release `cover_image` as the icon when available.
    - Defines a reusable `ActionPanel` with actions:
      - Open the release on Discogs in a browser.
      - Copy the Discogs release URL.
      - Copy the numeric release ID.
  - Any new command that lists Discogs releases should reuse `ReleaseItem` to keep visuals and actions consistent.

- **Raycast commands (`src/search-*.tsx`)**
  - Each file (`search-text.tsx`, `search-catno.tsx`, `search-barcode.tsx`) exports a default `Command` React component used by Raycast.
  - Common interaction pattern across all commands:
    - Maintain `results: DiscogsResult[]` state.
    - Maintain `isLoading: boolean` state.
    - Define an async `onSearch` function that:
      - Early-returns if the search input is empty.
      - Sets `isLoading` to `true`.
      - Calls `discogsSearch` with a different primary query parameter per command:
        - `search-text`: `{ q: query, type: "release" }`
        - `search-catno`: `{ catno, type: "release" }`
        - `search-barcode`: `{ barcode, type: "release" }`
      - Updates `results` with `data.results`.
      - Sets `isLoading` back to `false`.
    - Render a `List` component with:
      - `isLoading` bound to state.
      - `onSearchTextChange={onSearch}` and `throttle` enabled for debounced queries.
      - A `searchBarPlaceholder` tailored to the command (e.g., "Search releases…", "Catalog number…", "Barcode…").
      - One `ReleaseItem` per result, keyed by `r.id`.
  - When introducing new search variants (e.g., by label, artist-only, or user collection), follow this pattern: add a new command entry in `package.json` and a corresponding `src/search-*.tsx` file that calls `discogsSearch` with the appropriate parameter.

- **Tooling configuration**
  - `tsconfig.json` is configured for strict TypeScript, React JSX (`react-jsx`), ES2023 target and libs, and CommonJS modules. All source files live under `src/`.
  - `eslint.config.js` imports the official Raycast ESLint configuration and re-exports it, so linting rules are centralized and consistent with other Raycast extensions.

## Existing roadmap and conventions

The `plan.md` file documents a roadmap and conventions for this extension. Important points for agents:

- **Roadmap highlights (future work)**
  - Improve robustness:
    - Add user-facing error handling (e.g., `showToast`) in all commands when Discogs requests fail or return unexpected responses.
    - Introduce configuration via Raycast Preferences for Discogs credentials (Personal Access Token or Consumer Key/Secret) to reduce rate limiting and centralize auth in `api.ts`.
    - Provide empty-state messaging when searches return no results.
  - UX enhancements:
    - Add a `ReleaseDetail` view with tracklist, notes/credits, and marketplace stats, navigated from a list item selection.
    - Extend `ReleaseItem` actions (e.g., open in browser, copy link, copy title/artist) as needed.
    - Implement pagination or "load more" behavior for result sets beyond the initial page.
  - Advanced features (longer-term):
    - Integrate user collection and wantlist views (requires Discogs auth).
    - Add filtering controls (e.g., format, country).

- **Code conventions**
  - Centralize Discogs HTTP logic in `src/api.ts`.
  - Keep Discogs-related type definitions in `src/types.ts` rather than inline types.
  - Use functional React components and hooks for Raycast commands.
  - Use the existing `ReleaseItem` component from `src/utils.tsx` as the single place to adjust list item layout and actions.

Agents extending this project should align with these established patterns and evolve `api.ts`, `types.ts`, and `ReleaseItem` rather than duplicating logic across commands.
