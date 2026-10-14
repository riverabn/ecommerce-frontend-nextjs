import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import { ProductGridSkeleton } from "@/components/Skeletons";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-slate-800">Catálogo</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductList />
      </Suspense>
    </>
  );
}