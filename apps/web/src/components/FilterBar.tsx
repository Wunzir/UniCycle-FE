import type { ListingFilters } from "@unicycle/shared";

type Props = {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
};

const defaultFilters: ListingFilters = {
  search: "",
  category: "all",
  sort: "recent",
};

export function FilterBar({ filters, onChange }: Props) {
  return (
    <section className="filter-bar">
      <input
        value={filters.search}
        placeholder="Search listings"
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <select
        value={filters.category}
        onChange={(e) =>
          onChange({
            ...filters,
            category: e.target.value as ListingFilters["category"],
          })
        }
      >
        <option value="all">All categories</option>
        <option value="furniture">Furniture</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="clothing">Clothing</option>
        <option value="other">Other</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) =>
          onChange({
            ...filters,
            sort: e.target.value as ListingFilters["sort"],
          })
        }
      >
        <option value="recent">Most recent</option>
        <option value="price_asc">Price: Low to high</option>
        <option value="price_desc">Price: High to low</option>
      </select>

      <button
        type="button"
        className="filter-reset-button"
        onClick={() => onChange(defaultFilters)}
      >
        Clear Filters
      </button>
    </section>
  );
}