"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartView() {
  const { items, hydrated, total, add, remove, clear } = useCart();

  if (!hydrated) return <p>Cargando carrito...</p>;
  if (!items.length)
    return (
      <p>
        Tu carrito está vacío. <Link href="/" className="text-blue-600 underline">Ver catálogo</Link>
      </p>
    );

  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i.productId} className="flex items-center gap-4 rounded border bg-white p-3">
          <div className="flex-1">
            <p className="font-semibold">{i.name}</p>
            <p className="text-sm text-gray-600">
              ${i.price.toFixed(2)} x {i.quantity}
            </p>
          </div>
          <button
            onClick={() => remove(i.productId)}
            className="rounded border px-3 py-1"
            aria-label="Quitar uno"
          >
            −
          </button>
          <button
            onClick={() => add({ id: i.productId, name: i.name, price: i.price, stock: i.stock })}
            className="rounded border px-3 py-1"
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
      ))}

      <p className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</p>
      <div className="flex justify-end gap-3">
        <button onClick={clear} className="rounded border px-4 py-2">
          Vaciar
        </button>
        <Link href="/checkout" className="rounded bg-green-600 px-4 py-2 text-white">
          Ir a pagar
        </Link>
      </div>
    </div>
  );
}