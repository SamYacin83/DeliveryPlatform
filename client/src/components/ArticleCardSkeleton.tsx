import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function ArticleCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="h-7 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex flex-col gap-1">
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}
