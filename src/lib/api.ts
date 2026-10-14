/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;
  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

type Options = RequestInit & { auth?: boolean };

export async function apiFetch<T = unknown>(path: string, options: Options = {}): Promise<T> {
  if (!BASE_URL) throw new Error("Falta la variable BASE_URL en .env.local");

  const { auth = false, headers, ...rest } = options;
  const h = new Headers(headers);
  h.set("Accept", "application/json");
  if (rest.body) h.set("Content-Type", "application/json");

  if (auth) {
    const token = (await cookies()).get("token")?.value;
    if (token) h.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...rest, headers: h });
  } catch {
    throw new Error("No se pudo conectar con la API. ¿Está corriendo php artisan serve?");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.message ?? "Error en la API", res.status, data?.errors);
  }
  return data as T;
}

// La API puede devolver [..] o { data: [..] } o { data: { data: [..] } }
export function unwrapList<T>(payload: any): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

// Para un solo objeto: { data: {..} } o { product: {..} } o { order: {..} } o {..}
export function unwrapItem<T>(payload: any): T {
  return (payload?.data ?? payload?.product ?? payload?.order ?? payload) as T;
}