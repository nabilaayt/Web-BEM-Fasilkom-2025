import React, { useRef, useEffect, useState } from "react";
import Profil from "../../../Assets/Photo-Home/PP.png";

const People_say_about_us = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const people = [
    {
      name: "Fernandico Geovardo",
      role: "Ketua BEM KM Fasilkom UNSRI 2022/2023",
      image: Profil,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    },
    {
      name: "Jonathan Alfasya Putra",
      role: "Ketua BEM KM Fasilkom UNSRI 2023/2024",
      image: Profil,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur.",
    },
    {
      name: "Fernandico Geovardo",
      role: "Ketua BEM KM Fasilkom UNSRI 2021/2022",
      image: Profil,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Maecenas vitae mattis tellus.",
    },
    {
      name: "Nama Lain",
      role: "Ketua BEM KM Fasilkom UNSRI 2020/2021",
      image: Profil,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet, neque quis fermentum viverra, massa leo accumsan turpis.",
    },
  ];

  // duplicate array once to guarantee overflow for looping
  const extended = [...people, ...people];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId;
    const speed = 0.4; // px per tick (atur kecepatan; kecil = pelan)
    const tick = () => {
      if (!isPaused) {
        // Jika tidak ada overflow, tick akan tidak berguna (safe)
        container.scrollLeft += speed;

        // Looping mulus:
        // ketika sudah melewati setengah scrollWidth, mundurkan setengahnya
        const half = container.scrollWidth / 2;
        if (container.scrollLeft >= half) {
          // kurangi nilai sebesar half, jadi posisi terlihat mulus
          container.scrollLeft = container.scrollLeft - half;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPaused]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50/30 text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading kiri */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-4 text-left leading-tight">
            What <span className="text-orange-500">People</span> Say <br /> About{" "}
            <span className="text-black">Us</span>
          </h2>
          <p className="max-w-2xl text-gray-600 text-left leading-relaxed">
            Kami percaya, suara mahasiswa lebih dari sekadar umpan balik ia
            adalah napas dari perubahan. Dari berbagai sudut kampus, inilah
            suara mereka tentang kehadiran dan kontribusi BEM KM Fasilkom UNSRI.
          </p>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-8 overflow-x-auto pb-4 no-scrollbar"
          style={{
            // memastikan gesture scroll tetap smooth
            scrollBehavior: "smooth",
            // kalau mau batasi tinggi agar card tidak terpotong
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* CSS untuk menyembunyikan scrollbar; menarget class no-scrollbar */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {/* Render cards dari extended list (duplikat) */}
          {extended.map((person, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-white shadow-md rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm leading-relaxed">
                “ {person.message} “
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default People_say_about_us;
