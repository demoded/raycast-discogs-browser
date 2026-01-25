import { Action, ActionPanel, List, Toast, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchReleaseDetail } from "./api";
import { DiscogsReleaseDetail, DiscogsResult } from "./types";

export function ReleaseItem({ r }: { r: DiscogsResult }) {
  return (
    <List.Item
      title={r.title}
      subtitle={[r.year && String(r.year), r.catno, r.format?.join(", ")].filter(Boolean).join(" · ")}
      icon={r.cover_image}
      actions={
        <ActionPanel>
          <Action.Push title="Show Details" target={<ReleaseDetail release={r} />} />
          <Action.OpenInBrowser url={`https://www.discogs.com/release/${r.id}`} />
          <Action.CopyToClipboard content={`https://www.discogs.com/release/${r.id}`} />
          <Action.CopyToClipboard title="Copy Release ID" content={String(r.id)} />
        </ActionPanel>
      }
    />
  );
}

export function ReleaseDetail({ release }: { release: DiscogsResult }) {
  const [detail, setDetail] = useState<DiscogsReleaseDetail | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchReleaseDetail(release.resource_url);
        if (!cancelled) {
          setDetail(data);
        }
      } catch (error) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Could not load release details",
          message: error instanceof Error ? error.message : String(error),
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [release.resource_url]);

  const releaseDate = detail?.released_formatted ?? detail?.released;
  const year = detail?.year ?? release.year;
  const country = detail?.country ?? release.country;
  const catno = release.catno;
  const resourceUrl = detail?.resource_url ?? release.resource_url;
  const title = detail?.title ?? release.title;

  const formats = release.format?.join(", ");
  const labels = release.label?.join(", ");
  const barcodes = release.barcode?.join(", ");

  const discogsUrl = detail?.uri ?? `https://www.discogs.com/release/${release.id}`;
  const rows = [
    { label: "Title", value: title },
    { label: "Year", value: year ? String(year) : undefined },
    { label: "Release Date", value: releaseDate },
    { label: "Country", value: country },
    { label: "Catalog Number", value: catno },
    { label: "Formats", value: formats },
    { label: "Labels", value: labels },
    { label: "Barcodes", value: barcodes },
    { label: "Resource URL", value: resourceUrl, url: resourceUrl },
    { label: "Discogs URL", value: discogsUrl, url: discogsUrl },
  ].filter((row): row is { label: string; value: string; url?: string } => Boolean(row.value));

  return (
    <List navigationTitle={`Details • ${title}`} searchBarPlaceholder="Filter release details" isLoading={isLoading}>
      <List.Section title="Release Details">
        {rows.map((row) => (
          <List.Item
            key={`${row.label}-${row.value}`}
            title={row.label}
            subtitle={row.value}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title={`Copy ${row.label}`} content={row.value} />
                {row.url && <Action.OpenInBrowser url={row.url} />}
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
