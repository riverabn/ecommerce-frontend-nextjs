import { Suspense } from "react";
import OrdersList from "@/components/OrdersList";
import { ListSkeleton } from "@/components/Skeletons";

export default function OrdersPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Mis compras</h1>
      <Suspense fallback={<ListSkeleton />}>
        <OrdersList />
      </Suspense>
    </>
  );
}