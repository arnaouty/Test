"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { money } from "@/lib/format";
import { useCart } from "@/components/CartProvider";

const GOVERNORATES = ["Cairo", "Giza", "Alexandria", "Qalyubia", "Sharqia", "Dakahlia", "Gharbia", "Monufia", "Beheira", "Port Said", "Ismailia", "Suez", "Damietta", "Red Sea", "South Sinai", "Other"];

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [order, setOrder] = useState(null);
  const shipping = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: send the order to a backend / payment provider (e.g. Paymob) here.
    setOrder({ id: Math.floor(100000 + Math.random() * 900000), name: data.name, total: subtotal + shipping });
    clear();
  }

  if (order) {
    return (
      <div className="container section narrow center">
        <h1>Thank you, {order.name}!</h1>
        <p>Your order <strong>#{order.id}</strong> for {money(order.total)} has been placed. We’ll call you to confirm delivery.</p>
        <Link href="/collections/all" className="btn">Continue shopping</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container section narrow center">
        <h1>Your cart is empty</h1>
        <Link href="/collections/all" className="btn">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container section checkout">
      <form onSubmit={submit} className="checkout-form">
        <h1>Checkout</h1>
        <h3>Contact</h3>
        <input name="name" placeholder="Full name" required />
        <input name="phone" type="tel" placeholder="Mobile number" required pattern="[0-9+ ]{10,15}" />
        <input name="email" type="email" placeholder="Email (optional)" />
        <h3>Delivery</h3>
        <select name="governorate" required defaultValue="">
          <option value="" disabled>Governorate</option>
          {GOVERNORATES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <input name="city" placeholder="City / Area" required />
        <input name="address" placeholder="Street, building, floor, apartment" required />
        <h3>Payment</h3>
        <label className="radio-card"><input type="radio" name="payment" value="cod" defaultChecked /> Cash on delivery</label>
        <label className="radio-card disabled"><input type="radio" name="payment" value="card" disabled /> Card / wallet <span className="muted small">(coming soon)</span></label>
        <button className="btn btn-block" type="submit">Place order · {money(subtotal + shipping)}</button>
      </form>
      <aside className="summary">
        {lines.map((l) => (
          <div key={`${l.handle}|${l.color}|${l.size}`} className="row-between">
            <span>{l.product.title} <span className="muted small">({l.color}, {l.size}) × {l.qty}</span></span>
            <span>{money(l.product.price * l.qty)}</span>
          </div>
        ))}
        <hr />
        <div className="row-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="row-between"><span>Delivery</span><span>{shipping ? money(shipping) : "Free"}</span></div>
        <div className="row-between total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>
      </aside>
    </div>
  );
}
