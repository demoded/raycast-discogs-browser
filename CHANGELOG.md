# Changelog

All notable changes to **Discogs Browser** will be documented in this file following the Keep a Changelog convention.

## [Unreleased]

### Added
- Project overview in `README.md`, including setup instructions, command descriptions, and development notes.

### Planned
- User-friendly error states, pagination, richer release details, and Discogs credential configuration (see `plan.md`).

## [0.1.0] - 2026-01-25

### Added
- Initial Raycast extension scaffold with three commands:
  - Text-based Discogs release search.
  - Catalog-number search.
  - Barcode search.
- Shared `ReleaseItem` list component and `ReleaseDetail` view.
- Centralized Discogs API client with typed responses.
- Raycast preferences for Discogs Personal Access Token.
- ESLint/Prettier/TypeScript configuration aligned with Raycast standards.

[0.1.0]: https://github.com/gravisus/discogs-browser/releases/tag/v0.1.0