"use client";
import Link from "next/link";
import { useState } from "react";
import { money } from "@/lib/format";
import { shapeFor } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const [color, setColor] = useState(product.colors[0]);
  const onSale = product.compareAtPrice > product.price;
  const href = `/products/${product.handle}?color=${encodeURIComponent(color.name)}`;
  const n = product.colors.length;

  return (
    <div className="card">
      <Link href={href} className="card-media">
        <ProductImage shape={shapeFor(product)} color={color.hex} label={`${product.title} in ${color.name}`} />
        {product.soldOut ? <span className="badge badge-dark">Sold out</span> : onSale && <span className="badge badge-sale">Sale</span>}
        <span className="card-choose">{product.soldOut ? "View" : "Choose options"}</span>
      </Link>
      <div className="swatches" role="radiogroup" aria-label="Color">
        {product.colors.slice(0, 6).map((c) => (
          <button
            key={c.name}
            role="radio"
            aria-checked={c.name === color.name}
            aria-label={c.name}
            title={c.name}
            className={`swatch ${c.name === color.name ? "active" : ""}`}
            style={{ background: c.hex }}
            onMouseEnter={() => setColor(c)}
            onClick={() => setColor(c)}
          />
        ))}
        {n > 6 && <span className="muted small">+{n - 6}</span>}
      </div>
      <Link href={href} className="card-title">{product.title}</Link>
      <div className="muted small">Available in {n} color{n === 1 ? "" : "s"}</div>
      <div className="price">
        {onSale ? (
          <>
            <span className="sale">{money(product.price)}</span> <s className="muted">{money(product.compareAtPrice)}</s>
          </>
        ) : (
          money(product.price)
        )}
      </div>
    </div>
  );
}
