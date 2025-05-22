import React from "react";

interface SkeletonProps {
  title: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ title }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      <div className="space-y-3 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse p-4 rounded-lg bg-gray-700">
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-600 rounded w-full mb-1" />
            <div className="h-3 bg-gray-600 rounded w-5/6" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skeleton;
