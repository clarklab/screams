import { Skeleton } from '@/components/ui/Skeleton';

export default function MovieLoading() {
  return (
    <div className="pb-4">
      <Skeleton className="aspect-[2/3] max-h-[60vh] rounded-none" />
      <div className="px-4 mt-4 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex border-b border-[var(--border)] mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1 mx-1 rounded-none" />
        ))}
      </div>
      <div className="px-4 mt-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
