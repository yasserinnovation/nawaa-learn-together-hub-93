import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CourseCardSkeleton = () => (
  <Card className="shadow-md">
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-8 w-full" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

export const SpaceCardSkeleton = () => (
  <Card className="shadow-md">
    <CardHeader className="space-y-3">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-7 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

export const ToolCardSkeleton = () => (
  <Card className="shadow-md">
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </CardContent>
  </Card>
);

export const ListSkeleton = ({ count = 3, type = "course" }: { count?: number; type?: "course" | "space" | "tool" }) => {
  const SkeletonCard = type === "course" ? CourseCardSkeleton : type === "space" ? SpaceCardSkeleton : ToolCardSkeleton;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
