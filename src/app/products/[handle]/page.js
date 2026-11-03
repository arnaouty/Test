import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const p = getProduct(handle);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const cat = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.handle !== handle).slice(0, 4);

  return (
    <div className="container section">
      <nav className="crumbs muted small">
        <Link href="/">Home</Link> / <Link href={`/collections/${cat.slug}`}>{cat.title}</Link> / {product.title}
      </nav>
      <Suspense>
        <ProductDetails product={product} />
      </Suspense>
      {related.length > 0 && (
        <section className="section">
          <h2>You may also like</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
