import { redirect } from "next/navigation";
import { apiFetch, ApiError, unwrapList } from "@/lib/api";
import type { Order } from "@/lib/types";

export default async function OrdersList() {
  let orders: Order[] = [];
  try {
    orders = unwrapList<Order>(await apiFetch<unknown>("/orders", { auth: true, cache: "no-store" }));
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) redirect("/login?next=/orders");
    throw e;
  }

  if (!orders.length) return <p>Aún no tienes compras.</p>;

  return (
    <div className="space-y-3">
      {orders.map((o) => {
        const n = (o.items ?? o.order_items)?.length;
        return (
          <div key={o.id} className="flex items-center justify-between rounded border bg-white p-4">
            <div>
              <p className="font-semibold">Orden #{o.id}</p>
              <p className="text-sm text-gray-600">
                {o.created_at ? new Date(o.created_at).toLocaleString("es-SV") : ""}
                {n ? ` · ${n} producto(s)` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${Number(o.total).toFixed(2)}</p>
              <span
                className={`rounded px-2 py-0.5 text-xs ${
                  o.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {o.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}