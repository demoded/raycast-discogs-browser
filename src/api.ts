import { getPreferenceValues } from "@raycast/api";
import { DiscogsSearchResponse } from "./types";

const BASE_URL = "https://api.discogs.com/database/search";

export async function discogsSearch(params: Record<string, string>): Promise<DiscogsSearchResponse> {
  const { token } = getPreferenceValues<{ token: string }>();
  const query = new URLSearchParams({
    ...params,
    per_page: "50",
  });

  const response = await fetch(`${BASE_URL}?${query}`, {
    headers: {
      "User-Agent": "RaycastDiscogsSearch/1.0",
      Authorization: `Discogs token=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json() as Promise<DiscogsSearchResponse>;
}
