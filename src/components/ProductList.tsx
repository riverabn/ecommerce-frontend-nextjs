import { apiFetch, unwrapList } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const payload = await apiFetch<unknown>("/products", { next: { revalidate: 60 } });
  const products = unwrapList<Product>(payload);

  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} eager={i < 4} />
      ))}
    </div>
  );
}