export function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}