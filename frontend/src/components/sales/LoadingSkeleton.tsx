import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  rows?: number;
}

export default function LoadingSkeleton({ rows = 10 }: LoadingSkeletonProps) {
  return (
    <div className="w-full" data-testid="loading-skeleton">
      <div className="border rounded-lg overflow-hidden">
        <div className="border-b bg-muted/40 h-12 flex items-center px-4 gap-4">
          {[120, 160, 100, 180, 80, 100, 100, 80, 140, 120].map((width, i) => (
            <Skeleton key={i} className="h-4" style={{ width }} />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="h-14 flex items-center px-4 gap-4 border-b last:border-b-0"
          >
            {[120, 160, 100, 180, 80, 100, 100, 80, 140, 120].map((width, i) => (
              <Skeleton key={i} className="h-4" style={{ width: width * (0.7 + Math.random() * 0.3) }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
