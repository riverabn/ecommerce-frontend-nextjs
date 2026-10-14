"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { checkoutAction } from "@/actions/orders";

export default function CheckoutForm() {
  const { items, hydrated, total } = useCart();
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  if (!hydrated) return <p>Cargando...</p>;
  if (!items.length)
    return (
      <p>
        No tienes productos. <Link href="/" className="text-blue-600 underline">Ir al catálogo</Link>
      </p>
    );

  function pay() {
    setError(undefined);
    startTransition(async () => {
      const res = await checkoutAction(
        items.map((i) => ({ product_id: i.productId, quantity: i.quantity }))
      );
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="max-w-lg space-y-3 rounded-lg border bg-white p-6">
      {items.map((i) => (
        <div key={i.productId} className="flex justify-between">
          <span>
            {i.name} x {i.quantity}
          </span>
          <span>${(i.price * i.quantity).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <p className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Pago de prueba con Stripe (tarjeta Visa de prueba).</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        onClick={pay}
        disabled={pending}
        className="w-full rounded bg-green-600 p-3 text-white disabled:bg-gray-400"
      >
        {pending ? "Procesando pago..." : "Pagar ahora"}
      </button>
    </div>
  );
}