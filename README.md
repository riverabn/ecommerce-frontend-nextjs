# Frontend E-commerce – Next.js 16

Aplicación en Next.js (App Router + TypeScript + Tailwind) que consume la API REST de e-commerce hecha en Laravel 12 + Stripe + Swagger.

API: https://github.com/riverabn/api-ecommerce-larabel

## Configuración

1. Copia `.env.example` a `.env.local`:

```
copy .env.example .env.local
```

2. Variables:

| Variable | Descripción |
|---|---|
| `BASE_URL` | URL base de la API (ej. `http://localhost:8000/api`) |

## Cómo ejecutar

1. Levanta la API Laravel (ver su README): `php artisan serve`
2. En este proyecto:

```
npm install
npm run dev
```

3. Abre http://localhost:3000

Usuario de prueba: `test@example.com` / `Password.12`

## Rutas implementadas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Pública | Catálogo de productos (Server Component + Suspense) |
| `/products/[id]` | Pública | Detalle de producto |
| `/login` | Pública | Inicio de sesión (Server Action, cookie httpOnly) |
| `/register` | Pública | Registro (Server Action) |
| `/cart` | Pública | Carrito (estado local) |
| `/checkout` | Protegida | Crea la orden y paga con Stripe (Server Action) |
| `/checkout/success` | Protegida | Confirmación de compra |
| `/orders` | Protegida | Historial de compras (Suspense) |

## Seguridad y rendimiento

- Token guardado en cookie `httpOnly` mediante Server Actions; rutas protegidas con `proxy.ts`.
- Lecturas con Server Components; mutaciones con Server Actions.
- `loading.tsx` y `error.tsx` en catálogo, checkout e historial.
- `revalidatePath()` tras crear orden/pagar para evitar datos desactualizados.
- Reporte Lighthouse incluido en la carpeta `/evidencias`.