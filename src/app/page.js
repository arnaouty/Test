import Link from "next/link";
import { site } from "@/config/site";
import { categories, products, productsIn } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const hero = products.find((p) => p.featured) || products[0];
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>{site.hero.title}</h1>
            <p>{site.hero.text}</p>
            <Link href={site.hero.cta.href} className="btn">{site.hero.cta.label}</Link>
          </div>
          <div className="hero-swatches" aria-hidden>
            {hero.colors.slice(0, 6).map((c) => (
              <div key={c.name} className="hero-tile"><ProductImage shape="top" color={c.hex} label={c.name} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cat-grid">
          {categories.map((c) => {
            const p = productsIn(c.slug)[0];
            return (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="cat-tile">
                <div className="cat-media"><ProductImage shape={c.shape} color={p?.colors[0].hex} label={c.title} /></div>
                <span>{c.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <div className="row-between section-head">
          <h2>All products</h2>
          <Link href="/collections/all" className="link-underline">View all</Link>
        </div>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
