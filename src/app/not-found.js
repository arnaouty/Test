import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container section narrow center">
      <h1>Page not found</h1>
      <Link href="/collections/all" className="btn">Shop all products</Link>
    </div>
  );
}
