const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

async function getJson(path: string, searchParams?: URLSearchParams) {
  const url = new URL(path, API_BASE_URL);
  if (searchParams) url.search = searchParams.toString();

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function fetchTransactions(params?: URLSearchParams) {
  return getJson("/api/transactions", params);
}

export function fetchStats(params?: URLSearchParams) {
  return getJson("/api/transactions/stats", params);
}

export function fetchFilterOptions() {
  return getJson("/api/filter-options");
}
