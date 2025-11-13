import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MemberCard from '../dinas/MemberCard';

const StaffCarousel = ({ staff, dinasName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(staff.length / itemsPerPage);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return staff.slice(startIndex, endIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex);
  };

  if (staff.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Staff Cards Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div key={pageIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
                {staff
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((member) => (
                    <MemberCard
                      key={member.uuid}
                      name={member.nama}
                      position={member.divisi}
                      imageUrl={member.url}
                      label="STAFF"
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-900 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Page Counter */}
      {totalPages > 1 && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default StaffCarousel;
