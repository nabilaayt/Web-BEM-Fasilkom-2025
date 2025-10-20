import React, { useState, useEffect } from "react";
import KataTokoh from "../../../Assets/Photo-Home/Kata-Tokoh.png";
import KakFadhil from "../../../Assets/Photo-Home/Kak Fadhil1.png";
import KakAdlan from "../../../Assets/Photo-Home/Kak Adlan1.png";
import KakNajib from "../../../Assets/Photo-Home/Kak Najib1.png";
import KakJodi from "../../../Assets/Photo-Home/Kak Jodi1.png";
import KakWanda from "../../../Assets/Photo-Home/kak wanda.png";

const People_say_about_us = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data testimoni - bisa ditambah hingga 6 orang
  const testimonials = [
      {
        id: 1,
        name: "M. Fadhil Rahman",
        position: "Ketua BEM KM Fasilkom UNSRI 2025/2026",
        image: KakFadhil,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        id: 2,
        name: "M. Adlan Azzikra",
        position: "Wakil Ketua BEM KM Fasilkom UNSRI 2025/2026",
        image: KakAdlan,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        id: 3,
        name: "Naufal Nazhif Almaulidzar",
        position: "Inspektorat Jenderal Pengawasan Internal Fasilkom UNSRI 2025/2026",
        image: KakNajib,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..."
      },
      {
        id: 4,
        name: "M. Jodi Pratama",
        position: "Inspektorat Jenderal Pengawasan Proker Fasilkom UNSRI 2025/2026",
        image: KakJodi,
        quote: "BEM KM Fasilkom UNSRI telah memberikan dampak positif yang luar biasa bagi mahasiswa. Program-program yang dijalankan sangat bermanfaat dan membantu pengembangan diri mahasiswa."
      },
      {
        id: 5,
        name: "Wanda Hamidah",
        position: "Sekretaris Umum BEM KM Fasilkom UNSRI 2025/2026",
        image: KakWanda,
        quote: "Organisasi yang sangat solid dan memiliki visi yang jelas. BEM KM Fasilkom UNSRI berhasil menciptakan lingkungan yang kondusif untuk mahasiswa berprestasi dan berkarakter."
      },
      {
        id: 6,
        name: "Fadia Rizka Mumtaz",
        position: "Bendahara Umum BEM KM Fasilkom UNSRI 2025/2026",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        quote: "Sebagai bagian dari BEM KM Fasilkom UNSRI, saya bangga dengan dedikasi dan komitmen tim dalam melayani mahasiswa. Organisasi ini benar-benar memberikan kontribusi nyata."
      }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000); // Auto-scroll setiap 5 detik

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Group testimonials into sets of 3 for carousel
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonials.push(testimonials.slice(i, i + 3));
  }

  return (
    <section
      id="people-say-about-us"
      className="flex flex-col items-center justify-center px-6 md:px-16 pt-20 pb-0 bg-gradient-to-br from-[#fffaf8] to-[#fef6f3] relative"
    >
      {/* Title and Introduction */}
      <div className="text-center mb-12 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What <span className="text-[#FD8F19]"> People </span>Say <span className="text-[#4A0000]"> About </span> Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
            Kami percaya, suara mahasiswa lebih dari sekadar umpan balik ia adalah napas dari perubahan. Dari berbagai sudut kampus, inilah suara mereka tentang kehadiran dan kontribusi BEM KM Fasilkom UNSRI.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl mb-8">
        {/* Testimonial Cards Carousel */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {groupedTestimonials.map((group, groupIndex) => (
              <div key={groupIndex} className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row gap-6">
                  {group.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 flex-1 relative">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-600 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
          aria-label="Previous testimonials"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
          aria-label="Next testimonials"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex space-x-2 mb-8">
        {groupedTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index 
                ? 'bg-[#4A0000] scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Label "Kata Tokoh" */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <img
          src={KataTokoh}
          alt="Kata Tokoh"
          className="w-32 md:w-36"
        />
      </div>
    </section>
  );
};

export default People_say_about_us;