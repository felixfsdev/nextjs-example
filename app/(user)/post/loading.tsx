import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" /> {/* Title */}
          <Skeleton className="h-4 w-64" /> {/* Subtitle */}
        </div>
        <Skeleton className="h-10 w-28 self-start" /> {/* Button */}
      </div>

      {/* Posts List Skeleton */}
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" /> {/* Post Title */}
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" /> {/* Content Line 1 */}
                <Skeleton className="h-4 w-5/6" /> {/* Content Line 2 */}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar */}
                  <Skeleton className="h-4 w-24" /> {/* Author Name */}
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-32" /> {/* Date */}
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
