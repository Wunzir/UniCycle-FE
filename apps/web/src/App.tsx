import { useEffect, useState } from "react";
import { ListingCard } from "./components/ListingCard";
import { fetchJson } from "./lib/api";

type ListingsResponse = {
  success: boolean;
  data: Listing[];
};

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchJson<ListingsResponse>("/listings")
      .then((res) => setListings(res.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <main>
      <section>
        <h1>UniCycle Marketplace</h1>
        <p>Buy and sell student essentials.</p>
      </section>

      <section>
        <h2>Latest Listings</h2>
        <div className="listing-grid">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}