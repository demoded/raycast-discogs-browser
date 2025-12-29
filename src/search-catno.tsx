import { List } from "@raycast/api";
import { useState } from "react";
import { discogsSearch } from "./api";
import { ReleaseItem } from "./utils";
import { DiscogsResult } from "./types";

export default function Command() {
  const [results, setResults] = useState<DiscogsResult[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function onSearch(catno: string) {
    if (!catno) return;
    setLoading(true);
    const data = await discogsSearch({ catno, type: "release" });
    setResults(data.results);
    setLoading(false);
  }

  return (
    <List isLoading={isLoading} onSearchTextChange={onSearch} throttle searchBarPlaceholder="Catalog number…">
      {results.map((r) => (
        <ReleaseItem key={r.id} r={r} />
      ))}
    </List>
  );
}
