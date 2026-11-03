import { notFound } from "next/navigation";
import { categories, getCategory, productsIn } from "@/data/products";
import CollectionGrid from "@/components/CollectionGrid";

export function generateStaticParams() {
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: slug === "all" ? "All products" : getCategory(slug)?.title };
}

export default async function Collection({ params }) {
  const { slug } = await params;
  const cat = slug === "all" ? { title: "All products" } : getCategory(slug);
  if (!cat) notFound();
  return (
    <div className="container section">
      <h1 className="page-title">{cat.title}</h1>
      <CollectionGrid products={productsIn(slug)} />
    </div>
  );
}
