import Link from "next/link";
import type { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            width={400}
            height={300}
            loading={eager ? "eager" : "lazy"}
            className="aspect-[4/3] w-full rounded-lg bg-slate-100 object-cover"
          />
        ) : (
          <div className="aspect-[4/3] w-full rounded-lg bg-slate-100" />
        )}
        <h2 className="mt-2 font-semibold text-slate-800">{product.name}</h2>
      </Link>
      <p className="text-xl font-bold text-emerald-600">${Number(product.price).toFixed(2)}</p>
      <AddToCartButton product={product} />
    </article>
  );
}