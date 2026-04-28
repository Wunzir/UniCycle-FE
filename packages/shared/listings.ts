export type ListingCategory =
  | "furniture"
  | "electronics"
  | "books"
  | "clothing"
  | "other";

export type ListingCondition = "new" | "like_new" | "good" | "fair";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  imageUrl: string;
  condition: ListingCondition;
  featured: boolean;
  createdAt: string;
}

export interface ListingFilters {
  search: string;
  category: ListingCategory | "all";
  sort: "recent" | "price_asc" | "price_desc";
}