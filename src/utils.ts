import { Action, ActionPanel, List } from "@raycast/api";
import { DiscogsResult } from "./types";

export function ReleaseItem({ r }: { r: DiscogsResult }) {
  return (
    <List.Item
      key={r.id}
      title={r.title}
      subtitle={[
        r.year && String(r.year),
        r.catno,
        r.format?.join(", "),
      ]
        .filter(Boolean)
        .join(" · ")}
      accessories={[
        ...(r.label ? [{ text: r.label.join(", ") }] : []),
      ]}
      icon={r.cover_image}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={`https://www.discogs.com/release/${r.id}`} />
          <Action.CopyToClipboard content={`https://www.discogs.com/release/${r.id}`} />
          <Action.CopyToClipboard title="Copy Release ID" content={String(r.id)} />
        </ActionPanel>
      }
    />
  );
}
