"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import type { FormState } from "@/lib/types";

async function saveToken(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "/");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = await apiFetch<{ token: string }>("/login", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    await saveToken(data.token);
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message, fieldErrors: e.errors };
    return { error: (e as Error).message };
  }
  revalidatePath("/", "layout");
  redirect(safeNext(formData.get("next")));
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = await apiFetch<{ token: string }>("/register", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
      }),
    });
    await saveToken(data.token);
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message, fieldErrors: e.errors };
    return { error: (e as Error).message };
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  try {
    await apiFetch("/logout", { method: "POST", auth: true, cache: "no-store" });
  } catch {
    // si el token ya no sirve, igual cerramos sesión localmente
  }
  (await cookies()).delete("token");
  revalidatePath("/", "layout");
  redirect("/login");
}