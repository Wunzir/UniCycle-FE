import { useEffect, useState } from "react";
import type { Listing } from "@unicycle/shared";
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
        <p>{listings.length} items available</p>
      </section>
    </main>
  );
}