import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className=' w-screen flex flex-col justify-center align-middle items-center gap-3'>
      <Skeleton className="h-16 w-[85vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
      <Skeleton className="h-12 w-[84vw]" />
    </div>
  );
}

export default SkeletonLoading
