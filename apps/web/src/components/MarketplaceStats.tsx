import type { ListingFilters } from "@unicycle/shared";

type Props = {
  totalListings: number;
  savedCount: number;
  filters: ListingFilters;
};

export function MarketplaceStats({
  totalListings,
  savedCount,
  filters,
}: Props) {
  const activeCategory =
    filters.category === "all" ? "All Categories" : filters.category;

  return (
    <section className="marketplace-stats">
      <div className="marketplace-stat-card">
        <h3>{totalListings}</h3>
        <p>Listings Shown</p>
      </div>

      <div className="marketplace-stat-card">
        <h3>{savedCount}</h3>
        <p>Saved Items</p>
      </div>

      <div className="marketplace-stat-card">
        <h3>{activeCategory}</h3>
        <p>Active Category</p>
      </div>
    </section>
  );
}