# Discogs Browser - Development Plan

## Project Overview
This is a Raycast extension for browsing the Discogs music database. It currently supports searching for releases by text, catalog number, and barcode.

## Architecture
*   **Framework:** Raycast API (React + Node.js environment).
*   **Language:** TypeScript.
*   **Structure:**
    *   `src/api.ts`: Handles communication with Discogs API.
    *   `src/types.ts`: Data models for API responses.
    *   `src/utils.tsx`: Shared UI components (e.g., `ReleaseItem`).
    *   `src/*.tsx`: Individual commands (`search-text`, `search-catno`, `search-barcode`).

## Development Strategy
*   **Documentation:** Utilize Context7 MCP to access up-to-date documentation for:
*   **Raycast API:** `/websites/developers_raycast`, `/raycast/extensions`
*   **Discord:** `/websites/discord_js` (for integration features)

## Current Features
- [x] Search releases by Catalog Number.
- [x] Search releases by generic text query.
- [x] Search releases by Barcode.
- [x] List view results rendering.

## Development Roadmap

### Phase 1: Robustness & Configuration (Immediate Priority)
- [x] **Error Handling:** Implement `showToast` for API errors in all search commands to provide user feedback (e.g., network issues, rate limits).
- [x] **Authentication:** Add Raycast Preferences for Discogs Personal Access Token or Consumer Key/Secret to avoid strict rate limiting. Update `api.ts` to use these headers.

### Phase 2: User Experience Improvements
- [x] **Release Details:** Create a `ReleaseDetail` view. When a user selects a list item, push a new view showing:
    -   Full Tracklist.
    -   Notes/Credits.
    -   Marketplace statistics (lowest price, etc.).
- [x] **Actions:** Add an Action Panel to list items:
    -   Open in Browser (Discogs URL).
    -   Copy Link.
    -   Copy Title/Artist.
- [ ] **Pagination:** Support loading more results beyond the initial 50.

### Phase 3: Advanced Features
- [ ] **Collection/Wantlist Integration:** Allow users to view their own collection or wantlist (requires OAuth flow or generic User Token with permissions).
- [ ] **Filtering:** Add dropdowns to filter by Format (Vinyl, CD, etc.) or Country.
- [ ] **Discord Integration:** Share releases to Discord channels (utilize `discord.js` or webhooks).

## Code Conventions
*   **Styling:** Prettier (default Raycast config).
*   **Linting:** ESLint (default Raycast config).
*   **Components:** Functional components with Hooks.
*   **API:** Centralize all fetch logic in `api.ts`.
*   **Types:** Define interfaces in `types.ts` rather than inline.

## Quick Start
1.  `npm install`
2.  `npm run dev` to start the development server.
3.  Open Raycast to test the extension.
