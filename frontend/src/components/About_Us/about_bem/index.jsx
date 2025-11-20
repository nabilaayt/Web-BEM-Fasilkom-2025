import React, { useRef, useState, useEffect } from "react";
import useInView from "../../../hooks/useInView.jsx";
import Img1 from "../images/1.png";
import Img2 from "../images/2.png";
import Img3 from "../images/3.png";
import Img4 from "../images/4.png";
import Img5 from "../images/5.png";
import Img6 from "../images/6.png";
import Img7 from "../images/7.png";

const AboutBem = () => {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const leftColRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [desktopWidth, setDesktopWidth] = useState(null);

  function handlePointerDown(e) {
    isDown.current = true;
    setIsDragging(true);
    startX.current = e.clientX || e.touches?.[0]?.clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
    // capture pointer for mouse
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!isDown.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const walk = (startX.current - x) * 1; // scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft.current + walk;
  }

  function handlePointerUp(e) {
    isDown.current = false;
    setIsDragging(false);
    try {
      if (e.target.releasePointerCapture)
        e.target.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }

  const items = [
    {
      img: Img1,
      title: "OPREC",
      desc: "Open Recruitment Staff BEM KM Fasilkom UNSRI 2025",
    },
    {
      img: Img2,
      title: "Kekeluargaan",
      desc: "Upgrading Staff BEM KM Fasilkom UNSRI 2025",
    },
    {
      img: Img3,
      title: "Open Recruitment",
      desc: "Pemuda Pemudi Peduli Lingkungan (P3L)",
    },
    {
      img: Img4,
      title: "Kebersamaan",
      desc: "Movie Mates Nonton Bareng Artha Darma ",
    },
    {
      img: Img5,
      title: "Kekeluargaan",
      desc: "BEM Visit Internal Bersama HIMSI",
    },
    {
      img: Img6,
      title: "Open Recruitment",
      desc: "Galang Dana Korban Banjir di Mataram",
    },
    { img: Img7, title: "Open Recruitment", desc: "FEM X BEM FTI UNAND" },
  ];

  const [ref, inView] = useInView({ threshold: 0.08, once: true });

  return (
    <section
      ref={ref}
      className="w-full bg-transparent px-4 sm:px-8 lg:px-16 py-12"
    >
      <div className="max-w-[1750px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:gap-40 gap-6 ">
          {/* observe section to trigger animations */}

          {/* Left - About text */}
          <div
            ref={leftColRef}
            className={`md:w-5/12 animate-stagger ${
              inView ? "animate-play" : ""
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-[#4a0000] mb-4 font-gotham-bold">
              <span className="text-black">About</span> BEM KM Fasilkom UNSRI
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify font-gotham-book">
              BEM KM Fasilkom Unsri adalah organisasi eksekutif mahasiswa yang
              mewadahi aspirasi, inovasi, dan aksi nyata. Dengan semangat Artha
              Dharma, BEM KM Fasilkom Unsri berkomitmen menciptakan lingkungan
              yang dinamis, kolaboratif, dan progresif untuk membentuk mahasiswa
              yang visioner, berintegritas, dan berdampak bagi lingkungan
              sekitar.
            </p>
          </div>

          {/* Right - Horizontal draggable carousel that visually extends to the right */}
          <div className="w-96 md:w-7/12 relative">
            <div
              ref={scrollRef}
              className={`flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 touch-pan-x snap-x snap-mandatory ${
                desktopWidth ? "absolute top-0 right-0" : ""
              }`}
            >
              {items.map((it, idx) => (
                <figure
                  key={idx}
                  className={`group relative min-w-[260px] md:min-w-[320px] lg:min-w-[380px] h-56 md:h-64 rounded-xl overflow-hidden snap-start bg-white/5 drop-shadow ${
                    inView ? "animate-scale" : ""
                  }`}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />

                  {/* caption appears on hover */}
                  <figcaption
                    className="
					absolute inset-x-0 bottom-0
					bg-gradient-to-b from-[#4A0000]/90 to-[#C2421A]/90
					text-white text-center p-4
					opacity-100 group-hover:opacity-0
					transition-opacity duration-300 ease-in-out"
                  >
                    <p className="font-semibold text-sm md:text-base mt-1">
                      {it.desc}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* visual cue: make carousel appear to extend beyond container to the right */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white/0 to-white/80 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBem;
