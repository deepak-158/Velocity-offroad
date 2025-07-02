import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
          {/* Image skeleton */}
          <div className="h-64 bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-5">
            {/* Category badge skeleton */}
            <div className="mb-2">
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="mb-4">
              <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>
            
            {/* Options skeleton */}
            <div className="mb-4 space-y-3">
              <div>
                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-10"></div>
                  <div className="h-8 bg-gray-200 rounded w-10"></div>
                  <div className="h-8 bg-gray-200 rounded w-10"></div>
                </div>
              </div>
            </div>
            
            {/* Buttons skeleton */}
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
