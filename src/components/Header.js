"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { categories } from "@/data/products";
import { useCart } from "./CartProvider";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <>
      <div className="announcement">{site.announcement}</div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn menu-toggle" aria-label="Menu" onClick={() => setMenu((m) => !m)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          </button>
          <Link href="/" className="logo">{site.name}</Link>
          <nav className={`nav ${menu ? "nav-open" : ""}`} onClick={() => setMenu(false)}>
            <Link href="/">Home</Link>
            <div className="nav-dropdown">
              <Link href="/collections/all">Shop all</Link>
              <div className="dropdown-panel">
                <Link href="/collections/all">All products</Link>
                {categories.map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}`}>{c.title}</Link>
                ))}
              </div>
            </div>
            <Link href="/pages/exchange-policy">Exchange policy</Link>
            <Link href="/pages/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button className="icon-btn cart-btn" aria-label={`Cart, ${count} items`} onClick={() => setOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}
