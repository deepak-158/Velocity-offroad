import React from 'react';

interface MobileFiltersProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  filtersCount: number;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  children,
  isOpen,
  onToggle,
  onClose,
  filtersCount
}) => {
  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            <span className="font-semibold text-gray-900">Filters</span>
            {filtersCount > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {filtersCount}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Desktop filters - always visible */}
      <div className="hidden lg:block">
        {children}
      </div>

      {/* Mobile filters - overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          ></div>

          {/* Filter panel */}
          <div className="relative bg-white w-full max-w-sm h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter content */}
            <div className="p-4">
              {children}
            </div>

            {/* Apply filters button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={onClose}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilters;
