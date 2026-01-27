import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-64 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-64 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 rounded bg-gray-200 dark:bg-gray-700"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;