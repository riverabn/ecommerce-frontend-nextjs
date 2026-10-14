"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

type NewItem = { id: number; name: string; price: number | string; stock: number };

type CartContextType = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  total: number;
  add: (p: NewItem) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const KEY = "cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, hydrated]);

  const add = useCallback((p: NewItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === p.id);
      if (found) {
        return prev.map((i) =>
          i.productId === p.id ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i
        );
      }
      return [
        ...prev,
        { productId: p.id, name: p.name, price: Number(p.price), stock: p.stock, quantity: 1 },
      ];
    });
  }, []);

  const remove = useCallback((productId: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      add,
      remove,
      clear,
      count: items.reduce((s, i) => s + i.quantity, 0),
      total: items.reduce((s, i) => s + i.quantity * i.price, 0),
    }),
    [items, hydrated, add, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}