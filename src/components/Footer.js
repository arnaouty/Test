import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">{site.name}</div>
          <p className="muted">{site.tagline}</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/collections/all">All products</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}>{c.title}</Link>
          ))}
        </div>
        <div>
          <h4>Customer care</h4>
          <Link href="/pages/exchange-policy">Exchange policy</Link>
          <Link href="/pages/contact">Contact</Link>
        </div>
        <div>
          <h4>Connect</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span className="muted">{site.phone}</span>
        </div>
      </div>
      <div className="container footer-bottom muted small">© {new Date().getFullYear()} {site.name}</div>
    </footer>
  );
}
