"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const sinStock = product.stock <= 0;

  return (
    <button
      onClick={() => add(product)}
      disabled={sinStock}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {sinStock ? "Sin stock" : "Agregar al carrito"}
    </button>
  );
}