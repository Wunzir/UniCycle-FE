import type { Listing } from "@unicycle/shared";

type Props = {
  listing: Listing;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
};

export function ListingCard({
  listing,
  saved = false,
  onToggleSave,
}: Props) {
  return (
    <article className="listing-card">
      <img src={listing.imageUrl} alt={listing.title} />

      <div className="listing-card__header">
        <h3>{listing.title}</h3>
        <button onClick={() => onToggleSave?.(String(listing.id))}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <p>{listing.description}</p>
      <strong>${listing.price}</strong>
      <div>{listing.category}</div>
    </article>
  );
}