import Link from "next/link";
import ClearCart from "@/components/ClearCart";
import { apiFetch, unwrapItem } from "@/lib/api";
import type { Order } from "@/lib/types";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  let order: Order | null = null;
  if (orderId) {
    try {
      order = unwrapItem<Order>(await apiFetch<unknown>(`/orders/${orderId}`, { auth: true, cache: "no-store" }));
    } catch {
      order = null;
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-3 rounded-lg border bg-white p-8 text-center">
      <ClearCart />
      <p className="text-5xl">✅</p>
      <h1 className="text-2xl font-bold">¡Compra confirmada!</h1>
      <p>Orden #{orderId}</p>
      {order && (
        <p>
          Total: <b>${Number(order.total).toFixed(2)}</b> · Estado: <b>{order.status}</b>
        </p>
      )}
      <div className="flex justify-center gap-4 pt-2">
        <Link href="/orders" className="text-blue-600 underline">
          Ver mis compras
        </Link>
        <Link href="/" className="text-blue-600 underline">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}