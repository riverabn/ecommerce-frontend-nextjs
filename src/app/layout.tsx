import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import WebVitals from "@/components/WebVitals";

export const metadata: Metadata = {
  title: "Tienda | E-commerce Next.js",
  description: "Catálogo, carrito y pagos con Stripe usando Next.js y Laravel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen text-slate-800" suppressHydrationWarning>
        <CartProvider>
          <Suspense fallback={<div className="h-14 border-b bg-white" />}>
            <Navbar />
          </Suspense>
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </CartProvider>
        <WebVitals />
      </body>
    </html>
  );
}