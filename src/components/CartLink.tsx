"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="rounded-full bg-white/20 px-3 py-1 hover:bg-white/30">
      🛒 Carrito ({count})
    </Link>
  );
}