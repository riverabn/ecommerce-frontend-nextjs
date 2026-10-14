"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/actions/auth";

export default function AuthForm({ mode, next = "/" }: { mode: "login" | "register"; next?: string }) {
  const [state, formAction, pending] = useActionState(
    mode === "login" ? loginAction : registerAction,
    undefined
  );
  const input = "w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900";

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-3 rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>
      <input type="hidden" name="next" value={next} />

      {mode === "register" && <input name="name" placeholder="Nombre" required className={input} />}
      <input name="email" type="email" placeholder="Correo" required className={input} />
      <input name="password" type="password" placeholder="Contraseña" required className={input} />
      {mode === "register" && (
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirmar contraseña"
          required
          className={input}
        />
      )}

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.fieldErrors &&
        Object.values(state.fieldErrors)
          .flat()
          .map((m, i) => (
            <p key={i} className="text-sm text-red-600">
              {m}
            </p>
          ))}

      <button disabled={pending} className="w-full rounded bg-blue-600 p-2 text-white disabled:bg-gray-400">
        {pending ? "Enviando..." : mode === "login" ? "Entrar" : "Registrarme"}
      </button>
    </form>
  );
}