"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { money } from "@/lib/format";
import { shapeFor } from "@/data/products";
import { useCart } from "./CartProvider";
import ProductImage from "./ProductImage";

export default function ProductDetails({ product }) {
  const params = useSearchParams();
  const initial = product.colors.find((c) => c.name === params.get("color")) || product.colors[0];
  const [color, setColor] = useState(initial);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { add } = useCart();
  const onSale = product.compareAtPrice > product.price;

  function onAdd() {
    if (!size) return setError("Please choose a size.");
    setError("");
    add(product.handle, color.name, size, qty);
  }

  return (
    <div className="pdp">
      <div className="pdp-media">
        <ProductImage shape={shapeFor(product)} color={color.hex} label={`${product.title} in ${color.name}`} />
      </div>
      <div className="pdp-info">
        <h1>{product.title}</h1>
        <div className="price large">
          {onSale ? (
            <>
              <span className="sale">{money(product.price)}</span> <s className="muted">{money(product.compareAtPrice)}</s>
              <span className="badge-inline">Sale</span>
            </>
          ) : (
            money(product.price)
          )}
        </div>

        <fieldset className="option">
          <legend>Color: <strong>{color.name}</strong></legend>
          <div className="swatches big">
            {product.colors.map((c) => (
              <button
                key={c.name}
                aria-label={c.name}
                title={c.name}
                aria-pressed={c.name === color.name}
                className={`swatch ${c.name === color.name ? "active" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="option">
          <legend>Size</legend>
          <div className="pills">
            {product.sizes.map((s) => (
              <button key={s} className={`pill ${s === size ? "active" : ""}`} aria-pressed={s === size} onClick={() => { setSize(s); setError(""); }}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="buy-row">
          <div className="qty boxed">
            <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span>{qty}</span>
            <button aria-label="Increase" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <button className="btn btn-grow" disabled={product.soldOut} onClick={onAdd}>
            {product.soldOut ? "Sold out" : "Add to cart"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}

        <p>{product.description}</p>
        <ul className="details">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <details className="accordion">
          <summary>Delivery & exchanges</summary>
          <p>Delivery across Egypt in 2–5 working days. Exchanges accepted within 14 days for unworn items with tags.</p>
        </details>
      </div>
    </div>
  );
}
