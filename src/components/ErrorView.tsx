"use client";

export default function ErrorView({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-6">
      <h2 className="font-bold text-red-700">Algo salió mal</h2>
      <p className="mt-1 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded bg-red-600 px-4 py-2 text-white">
        Reintentar
      </button>
    </div>
  );
}