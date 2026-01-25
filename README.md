# Discogs Browser

Discogs Browser is a Raycast extension that lets you look up release information on Discogs using free text queries, catalog numbers, or barcodes. It supports both macOS and Windows editions of Raycast and follows Raycast’s React-based command model.

## Features

- Three dedicated commands:
  - **Search releases** by any text (artist, title, label, etc.).
  - **Search by catalog number** for precision lookups.
  - **Search by barcode** for quick physical media identification.
- Consistent release list UI that shows cover art, metadata, and quick actions.
- Detail view with expanded release information fetched on demand. Correct display of the `released` via second release api call.
- Configurable Discogs API authentication via Raycast preferences.

## Getting Started

1. Install dependencies:

   Inline command: `npm install`

2. Provide your Discogs Personal Access Token in the extension preferences inside Raycast (`token` field).

3. Launch Raycast development mode to iterate with hot reload:

   Inline command: `npm run dev`

## Commands

- `Discogs Search for Releases` (`search-text`)
- `Discogs search by catno` (`search-catno`)
- `Discogs search by barcode` (`search-barcode`)

Each command debounces user input, invokes `discogsSearch`, and renders results through the shared `ReleaseItem` component.

## Preferences

| Name  | Type     | Required | Description                              |
|-------|----------|----------|------------------------------------------|
| token | password | Yes      | Discogs Personal Access Token for API access.|

## Project Structure

- `src/api.ts` — centralized Discogs API client and helpers.
- `src/types.ts` — Discogs domain types shared across commands.
- `src/utils.tsx` — shared UI components (`ReleaseItem`, `ReleaseDetail`).
- `src/search-*.tsx` — Raycast command components.

## Scripts

| Script        | Description                                      |
|---------------|--------------------------------------------------|
| `npm run dev` | Start Raycast live development (`ray develop`).  |
| `npm run lint`| Lint with Raycast ESLint configuration.          |
| `npm run fix-lint` | Auto-fix lint issues where possible.       |
| `npm run build`| Create the production Raycast bundle.           |
| `npm run publish`| Publish to the Raycast Store through `@raycast/api`. |

## Development Notes

- Keep Discogs HTTP logic inside `src/api.ts` to maintain a single integration point.
- Reuse `ReleaseItem` when displaying search results so UI and actions stay consistent across commands.
- Follow the roadmap in `plan.md` for upcoming improvements such as richer error handling, empty states, pagination, and advanced Discogs features (collection, wantlist, filters).

## Roadmap Snapshot

- Show user-friendly toasts when searches fail or return no data.
- Add preference-driven Discogs credentials for reduced rate limiting.
- Provide release detail views (tracklist, marketplace stats) accessible from list items.
- Implement pagination or “load more” behavior for large result sets.
- Explore collection/wantlist integration once authenticated endpoints are available.

---

For more contributor guidance, see `AGENTS.md`, which documents common workflows, commands, and conventions used in this repository.
