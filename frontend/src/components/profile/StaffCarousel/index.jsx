import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MemberCard from "../dinas/MemberCard";

const StaffCarousel = ({ staff }) => {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const updateItems = () => {
      setItemsPerPage(media.matches ? 5 : staff.length);
    };

    updateItems();
    media.addEventListener("change", updateItems);

    return () => media.removeEventListener("change", updateItems);
  }, [staff.length]);

  const totalPages = Math.ceil(staff.length / itemsPerPage);

  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(0);
    }
  }, [totalPages]);

  // ⬅️ ARROW LEFT
  const goToPrevious = () => {
    if (itemsPerPage === staff.length) {
      // 👉 MOBILE MODE (scroll)
      scrollRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    } else {
      // 👉 DESKTOP MODE (carousel)
      setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    }
  };

  // ➡️ ARROW RIGHT
  const goToNext = () => {
    if (itemsPerPage === staff.length) {
      // 👉 MOBILE MODE (scroll)
      scrollRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    } else {
      // 👉 DESKTOP MODE (carousel)
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }
  };

  if (staff.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Staff Cards */}
      <div
        ref={scrollRef}
        className="overflow-x-auto md:overflow-x-hidden no-scrollbar"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform:
              itemsPerPage === staff.length
                ? "none" // 👉 MOBILE: disable transform
                : `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div
              key={pageIndex}
              className="w-auto md:w-full flex justify-center flex-shrink-0"
            >
              <div
                className={`flex md:grid gap-6 px-4 justify-center ${
                  itemsPerPage === staff.length ? "" : "grid-cols-5"
                }`}
              >
                {staff
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
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
    </div>
  );
};

export default StaffCarousel;
