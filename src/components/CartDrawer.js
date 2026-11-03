"use client";
import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/config/site";
import { money } from "@/lib/format";
import { shapeFor } from "@/data/products";
import { useCart } from "./CartProvider";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const remaining = site.freeShippingThreshold - subtotal;

  return (
    <div className={`drawer-wrap ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-label="Cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="link-btn" onClick={() => setOpen(false)}>Close</button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <Link href="/collections/all" className="btn" onClick={() => setOpen(false)}>Continue shopping</Link>
          </div>
        ) : (
          <>
            <p className="ship-note">
              {remaining > 0 ? <>You’re {money(remaining)} away from free delivery.</> : <>You’ve unlocked free delivery.</>}
            </p>
            <ul className="drawer-lines">
              {lines.map((l) => {
                const color = l.product.colors.find((c) => c.name === l.color) || l.product.colors[0];
                return (
                  <li key={`${l.handle}|${l.color}|${l.size}`} className="line">
                    <div className="thumb"><ProductImage shape={shapeFor(l.product)} color={color.hex} label={color.name} /></div>
                    <div className="line-info">
                      <Link href={`/products/${l.handle}`} onClick={() => setOpen(false)}>{l.product.title}</Link>
                      <div className="muted small">{l.color} · {l.size}</div>
                      <div className="qty">
                        <button aria-label="Decrease" onClick={() => setQty(l, l.qty - 1)}>−</button>
                        <span>{l.qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(l, l.qty + 1)}>+</button>
                        <button className="link-btn small" onClick={() => setQty(l, 0)}>Remove</button>
                      </div>
                    </div>
                    <div className="line-price">{money(l.product.price * l.qty)}</div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <div className="row-between"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <p className="muted small">Delivery calculated at checkout.</p>
              <Link href="/checkout" className="btn btn-block" onClick={() => setOpen(false)}>Check out</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
