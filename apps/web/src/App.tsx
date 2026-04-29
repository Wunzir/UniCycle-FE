import { useEffect, useMemo, useState } from "react";
import type { Listing, ListingFilters } from "@unicycle/shared";
import { FilterBar } from "./components/FilterBar";
import { ListingCard } from "./components/ListingCard";
import { fetchJson } from "./lib/api";
import { MarketplaceStats } from "./components/MarketplaceStats";

type ListingsResponse = {
  success: boolean;
  data: Listing[];
};

const defaultFilters: ListingFilters = {
  search: "",
  category: "all",
  sort: "recent",
};

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<ListingFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);

    return params.toString();
  }, [filters]);

  useEffect(() => {
    const path = queryString ? `/listings?${queryString}` : "/listings";

    setIsLoading(true);
    setError("");

    fetchJson<ListingsResponse>(path)
      .then((res) => setListings(res.data ?? []))
      .catch(() => setError("Could not load listings."))
      .finally(() => setIsLoading(false));
  }, [queryString]);

  function handleToggleSave(id: string) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  }

  return (
    <main>
      <section>
        <h1>UniCycle Marketplace</h1>
        <p>Buy and sell student essentials.</p>
      </section>

      <FilterBar filters={filters} onChange={setFilters} />

      <section>
        {isLoading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && listings.length === 0 && (
          <p>No listings found.</p>
        )}

        {!isLoading && !error && listings.length > 0 && (
          <div className="listing-grid">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                saved={savedIds.includes(String(listing.id))}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}