import { notFound } from "next/navigation";
import { apiFetch, ApiError, unwrapItem } from "@/lib/api";
import type { Product } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let product: Product;
  try {
    product = unwrapItem<Product>(await apiFetch<unknown>(`/products/${id}`, { next: { revalidate: 60 } }));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {product.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.image_url}
          alt={product.name}
          width={600}
          height={450}
          className="aspect-[4/3] w-full rounded bg-gray-200 object-cover"
        />
      ) : (
        <div className="aspect-[4/3] w-full rounded bg-gray-200" />
      )}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-2xl font-bold">${Number(product.price).toFixed(2)}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}