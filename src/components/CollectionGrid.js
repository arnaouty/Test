"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price, high to low", fn: (a, b) => b.price - a.price },
  az: { label: "Alphabetically, A–Z", fn: (a, b) => a.title.localeCompare(b.title) },
};

export default function CollectionGrid({ products }) {
  const [sort, setSort] = useState("featured");
  const [inStock, setInStock] = useState(false);
  const list = useMemo(
    () => products.filter((p) => !inStock || !p.soldOut).sort(SORTS[sort].fn),
    [products, sort, inStock]
  );

  return (
    <>
      <div className="toolbar">
        <label className="check">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock only
        </label>
        <span className="muted small">{list.length} products</span>
        <label className="sort">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([k, s]) => (
              <option key={k} value={k}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </>
  );
}
