import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/actions/auth";
import CartLink from "./CartLink";

export default async function Navbar() {
  const token = (await cookies()).get("token")?.value;

  return (
    <header
      className="text-white shadow-md"
      style={{ background: "linear-gradient(90deg, #2563eb, #4f46e5)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-4 p-4">
        <Link href="/" className="text-xl font-bold tracking-wide">
          🛍️ Tienda
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <CartLink />
          {token ? (
            <>
              <Link href="/orders" className="hover:underline">
                Mis compras
              </Link>
              <form action={logoutAction}>
                <button className="rounded-lg bg-white/20 px-3 py-1 hover:bg-white/30">Salir</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Ingresar
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-white px-3 py-1 font-medium text-blue-700 hover:bg-blue-50"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}