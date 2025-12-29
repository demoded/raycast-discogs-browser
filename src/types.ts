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
  resource_url: string;
}
