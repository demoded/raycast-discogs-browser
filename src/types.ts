export interface DiscogsResult {
  id: number;
  title: string;
  year?: number;
  country?: string;
  catno?: string;
  barcode?: string[];
  format?: string[];
  label?: string[];
  cover_image?: string;
  thumb?: string;
  resource_url: string;
}

/**
 * Minimal subset of fields we care about when fetching a single release
 * via https://api.discogs.com/releases/:id.
 */
export interface DiscogsIdentifier {
  type?: string;
  value?: string;
}

export interface DiscogsReleaseDetail {
  id: number;
  title: string;
  year?: number;
  released?: string;
  released_formatted?: string;
  country?: string;
  resource_url: string;
  uri?: string;
  identifiers?: DiscogsIdentifier[];
}

export interface DiscogsSearchResponse {
  results: DiscogsResult[];
}
