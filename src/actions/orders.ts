"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError, unwrapItem } from "@/lib/api";

type CheckoutItem = { product_id: number; quantity: number };

export async function checkoutAction(items: CheckoutItem[]): Promise<{ error?: string }> {
  if (!items.length) return { error: "Tu carrito está vacío." };

  let orderId: number;

  // 1) Crear la orden
  try {
    const payload = await apiFetch<unknown>("/orders", {
      method: "POST",
      auth: true,
      cache: "no-store",
      body: JSON.stringify({ items }),
    });
    orderId = unwrapItem<{ id: number }>(payload).id;
    if (!orderId) return { error: "La API no devolvió el id de la orden." };
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) redirect("/login?next=/checkout");
    return { error: (e as Error).message };
  }

  // 2) Pagar la orden (tarjeta de prueba de Stripe)
  try {
    await apiFetch("/payments", {
      method: "POST",
      auth: true,
      cache: "no-store",
      body: JSON.stringify({ order_id: orderId, payment_method: "pm_card_visa" }),
    });
  } catch (e) {
    revalidatePath("/orders");
    return { error: `La orden #${orderId} se creó pero el pago falló: ${(e as Error).message}` };
  }

  // 3) Evitar datos viejos: refrescar historial y catálogo (cambió el stock)
  revalidatePath("/orders");
  revalidatePath("/");

  redirect(`/checkout/success?order=${orderId}`);
}