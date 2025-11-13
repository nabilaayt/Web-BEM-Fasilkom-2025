import React, { useEffect, useRef } from "react";
import KataTokoh from "../../../Assets/Photo-Home/Kata Tokoh.svg";

const testimonials = [
  {
    name: "M Fadhil Rahman",
    title: "Ketua BEM KM Fasilkom UNSRI 2022/2023",
    quote:
      "BEM selalu menjadi ruang kolaborasi yang memungkinkan mahasiswa untuk berinovasi dan menyuarakan aspirasi dengan penuh tanggung jawab.",
  },
  {
    name: "Jonathan Alfasya Putra",
    title: "Ketua BEM KM Fasilkom UNSRI 2023/2024",
    quote:
      "Kami percaya bahwa keterlibatan aktif mahasiswa adalah kunci perubahan kampus yang berkelanjutan.",
  },
  {
    name: "Siti Nurhaliza",
    title: "Sekretaris Umum",
    quote:
      "Pengalaman di BEM membuka banyak kesempatan untuk berkembang, belajar organisasi, dan berjejaring.",
  },
  {
    name: "Ridwan Hidayat",
    title: "Bendahara",
    quote:
      "Setiap program kerja direncanakan demi memberikan manfaat maksimal bagi sivitas akademika.",
  },
  {
    name: "Maya Putri",
    title: "Koorbid Medtek",
    quote:
      "Kolaborasi antar dinas menjadi kekuatan utama dalam menjalankan visi misi kami.",
  },
  {
    name: "Ahmad Sulaiman",
    title: "Koorbid Relasi",
    quote:
      "Kami terus menjalin hubungan dengan stakeholder agar program BEM lebih berdampak.",
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
    <section className="py-16 bg-gradient-to-r from-white to-[#fff6f3]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">What <span className="text-[#C2421B]">People</span> Say <span className="text-[#4A0000]">About</span> Us</h3>
            <p className="text-gray-600 max-w-xl mt-2 text-justify">Kami percaya, suara mahasiswa lebih dari sekadar umpan balik ia adalah napas dari perubahan. Dari berbagai sudut kampus, inilah suara mereka tentang kehadiran dan kontribusi BEM KM Fasilkom UNSRI.</p>
          </div>

          <div className="flex items-center gap-4">
            <img src={KataTokoh} alt="Kata Tokoh" className="w-32 opacity-90" />
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
              className="min-w-[280px] md:min-w-[340px] bg-white rounded-xl p-6 shadow-md flex-shrink-0 snap-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#f3b9b5] flex items-center justify-center text-white font-semibold">{t.name.split(" ")[0][0]}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.title}</div>
                </div>
              </div>
              <blockquote className="text-gray-700">“{t.quote}”</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
