"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products, shapeFor } from "@/data/products";
import { money } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function SearchOverlay({ onClose }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const results = term
    ? products.filter((p) => `${p.title} ${p.category} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase().includes(term))
    : products.slice(0, 4);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-row">
          <input autoFocus placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="link-btn" onClick={onClose}>Close</button>
        </div>
        <p className="muted small">{term ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular"}</p>
        <div className="search-results">
          {results.map((p) => (
            <Link key={p.handle} href={`/products/${p.handle}`} className="search-item" onClick={onClose}>
              <div className="thumb"><ProductImage shape={shapeFor(p)} color={p.colors[0].hex} label={p.colors[0].name} /></div>
              <div>
                <div>{p.title}</div>
                <div className="muted small">{money(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
