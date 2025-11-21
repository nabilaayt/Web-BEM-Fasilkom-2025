import React, { useEffect, useRef } from "react";
import KataTokoh from "../../../Assets/Photo-Home/Kata Tokoh.svg";
import Fadhil from "./images/Fadhil_Kabem.svg";
import Jonathan from "./images/Jonathan_Kabem.svg";
import Wanda from "./images/Sekum_Wanda.svg";
import Hauzan from "./images/Kadin_PPSDM.svg";
import Diva from "./images/Koorbid_Kerumahtanggaan.svg";
import Xenia from "./images/Kadin_Adm.svg";

const testimonials = [
  {
    name: "M Fadhil Rahman",
    title: "Ketua BEM KM Fasilkom UNSRI 2025",
    quote:
      "BEM selalu menjadi ruang kolaborasi yang memungkinkan mahasiswa untuk berinovasi dan menyuarakan aspirasi dengan penuh tanggung jawab.",
    foto: Fadhil,
  },
  {
    name: "Jonathan Alfasya Putra",
    title: "Ketua BEM KM Fasilkom UNSRI 2024",
    quote:
      "Kami percaya bahwa keterlibatan aktif mahasiswa adalah kunci perubahan kampus yang berkelanjutan.",
    foto: Jonathan,
  },
  {
    name: "Wanda Hamidah",
    title: "Sekretaris Umum",
    quote:
      "Pengalaman di BEM membuka banyak kesempatan untuk berkembang, belajar organisasi, dan berjejaring.",
    foto: Wanda,
  },
  {
    name: "Muhammad Hauzan Irsyad",
    title: "Kepala Dinas PPSDM",
    quote:
      "Setiap program kerja direncanakan demi memberikan manfaat maksimal bagi sivitas akademika.",
    foto: Hauzan,
  },
  {
    name: "Diva Sarasvati Azzahra",
    title: "Koorbid Kerumahtanggaan",
    quote:
      "Kolaborasi antar dinas menjadi kekuatan utama dalam menjalankan visi misi kami.",
    foto: Diva,
  },
  {
    name: "Xenia Clarissa Valencia Marpaung",
    title: "Kepala Dinas Administrasi",
    quote:
      "Kami terus menjalin hubungan dengan stakeholder agar program BEM lebih berdampak.",
    foto: Xenia,
  },
];

export default function PeopleSayAboutUs() {
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      const card = el.querySelector("[data-card]");
      if (!card) return;
      const gap = 24; // matches tailwind gap-6
      const step = card.getBoundingClientRect().width + gap;
      // smooth scroll by step
      el.scrollBy({ left: step, behavior: "smooth" });
      // if near end, reset to start after small delay
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        // allow smooth to finish then reset
        setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "auto" });
        }, 600);
      }
    }, 2600);
  }

  function stopAutoplay() {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }

  // pointer drag handlers
  function handlePointerDown(e) {
    isDragging.current = true;
    stopAutoplay();
    startX.current = e.clientX || e.touches?.[0]?.clientX;
    scrollLeftStart.current = containerRef.current.scrollLeft;
    if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!isDragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const walk = startX.current - x;
    containerRef.current.scrollLeft = scrollLeftStart.current + walk;
  }

  function handlePointerUp(e) {
    isDragging.current = false;
    if (e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    // restart autoplay after short pause
    setTimeout(() => startAutoplay(), 1200);
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 mb-12 py-16">
      <div className="px-6">
        <div className="flex items-center justify-center mb-6">
          <div>
            <h3 className="text-[22px] md:text-4xl mb-4 text-center font-gotham-bold">
              What <span className="text-[#FD8F17]">People</span> Say{" "}
              <span className="text-[#4A0000]">About</span> Us
            </h3>
            <p className="text-gray-600 max-w-xl mt-2 text-center text-sm md:text-base leading-relaxed font-gotham-book">
              Kami percaya, suara mahasiswa lebih dari sekadar umpan balik ia
              adalah napas dari perubahan. Dari berbagai sudut kampus, inilah
              suara mereka tentang kehadiran dan kontribusi BEM KM Fasilkom
              UNSRI.
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-2 touch-pan-x snap-x snap-mandatory"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseEnter={() => stopAutoplay()}
          onMouseLeave={() => startAutoplay()}
          style={{ scrollBehavior: "smooth" }}
        >
          {testimonials.map((t, i) => (
            <article
              key={i}
              data-card
              className="min-w-[250px] md:min-w-[320px] max-w-60 md:max-w-80 bg-white rounded-2xl p-6 shadow-md shadow-black/5 border border-gray-100 flex-shrink-0 mb-8 snap-start hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-9 h-9 bg-[#FD9B2D] rounded-full flex-none overflow-hidden grid place-items-center">
                  <div className="w-8 h-16">
                    <img
                      src={t.foto}
                      alt={t.name}
                      className={"w-full h-full object-cover rounded-full" + (i === 1 ? " object-[30%_center]" : "") +(i === 2 ? " object-[30%_center]" : "")}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm md:text-base font-gotham-medium">{t.name}</div>
                  <div className="text-xs md:text-sm font-gotham-book text-gray-500">
                    {t.title}
                  </div>
                </div>
              </div>
              <blockquote className="italic text-sm leading-relaxed text-gray-700">
                “{t.quote}”
              </blockquote>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <img
            src={KataTokoh}
            alt="Kata Tokoh"
            className="my-8 absolute right-12 md:right-80 bottom-4 w-32 md:w-40 opacity-90"
          />
        </div>
      </div>
      <div className="circlePosition w-[260px] h-[200px] bg-[#4A0000] rounded-full absolute z-1 top-[10%] right-[5%] -translate-x-1/2 -translate-y-1/2 blur-[300px]"></div>
    </section>
  );
}
