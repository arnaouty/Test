"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";

const CartContext = createContext(null);
const KEY = "storefront-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      // Drop lines whose product no longer exists in the catalog.
      setItems(Array.isArray(saved) ? saved.filter((i) => getProduct(i.handle)) : []);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: getProduct(i.handle) }));
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const keyOf = (i) => `${i.handle}|${i.color}|${i.size}`;

    return {
      lines,
      count,
      subtotal,
      open,
      setOpen,
      add(handle, color, size, qty = 1) {
        setItems((prev) => {
          const k = keyOf({ handle, color, size });
          const hit = prev.find((i) => keyOf(i) === k);
          if (hit) return prev.map((i) => (keyOf(i) === k ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { handle, color, size, qty }];
        });
        setOpen(true);
      },
      setQty(line, qty) {
        const k = keyOf(line);
        setItems((prev) =>
          qty <= 0 ? prev.filter((i) => keyOf(i) !== k) : prev.map((i) => (keyOf(i) === k ? { ...i, qty } : i))
        );
      },
      clear() {
        setItems([]);
      },
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
