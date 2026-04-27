import type { Listing } from "@unicycle/shared";

type Props = {
  listing: Listing;
};

export function ListingCard({ listing }: Props) {
  return (
    <article className="listing-card">
      <img src={listing.imageUrl} alt={listing.title} />
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <strong>${listing.price}</strong>
      <div>{listing.category}</div>
    </article>
  );
}

