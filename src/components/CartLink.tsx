"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCart } from "./CartProvider";

const subscribe = () => () => {};

export default function CartLink() {
  const { count } = useCart();
  // false en el servidor y en el primer render del navegador, true después
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <Link href="/cart" className="rounded-full bg-white/20 px-3 py-1 hover:bg-white/30">
      🛒 Carrito ({mounted ? count : 0})
    </Link>
  );
}