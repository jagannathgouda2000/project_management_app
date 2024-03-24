import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingList = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((k, i) => {
        return <Skeleton key={i} className="h-20" />;
      })}
    </div>
  );
};

export default LoadingList;
