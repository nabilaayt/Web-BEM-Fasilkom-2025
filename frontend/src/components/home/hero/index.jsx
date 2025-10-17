import React from "react";
import Advokasi from "../../../Assets/Photo-Home/Advokasi.png";
import Inisiatif from "../../../Assets/Photo-Home/Inisiatif.png";
import Kolaborasi from "../../../Assets/Photo-Home/Kolaborasi.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-b from-[#fffaf8] to-[#fef6f3]"
    >
      {/* ===== TEKS UTAMA ===== */}
      <h2 className="text-lg md:text-xl font-semibold text-black mb-2">
        Tumbuh <span className="text-[#7A0000]">Bersama</span> Wujudkan{" "}
        <span className="text-[#f6a200] font-semibold">Asa</span>
      </h2>

      <h1 className="text-3xl md:text-5xl font-serif text-[#7A0000] font-bold mb-4">
        BEM KM FASILKOM UNSRI
      </h1>

      <p className="max-w-2xl text-sm md:text-base text-gray-700 leading-relaxed mb-8">
        Sebagai wadah aspirasi mahasiswa, BEM KM Fasilkom UNSRI hadir untuk
        menjembatani suara mahasiswa dengan civitas akademika, serta
        menciptakan ruang pengembangan diri di bidang akademik,
        kepemimpinan, dan sosial.
      </p>

      {/* ===== TOMBOL ===== */}
      <div className="flex gap-4">
        <button className="bg-[#5A0000] text-white px-6 py-2 rounded-md font-medium hover:bg-transparent hover:border-[#5A0000] hover:border hover:text-[#5A0000] transition">
          More Info
        </button>
        <button className="border border-[#5A0000] text-[#5A0000] px-6 py-2 rounded-md font-medium hover:bg-[#5A0000] hover:text-white transition">
          Send a Report
        </button>
      </div>

      {/* ===== GAMBAR TAG MENGAMBANG ===== */}
      {/* Inisiatif */}
      <img
        src={Inisiatif}
        alt="Inisiatif"
        className="absolute left-10 top-1/3 w-28 md:w-36 animate-float-slow"
      />

      {/* Kolaborasi */}
      <img
        src={Kolaborasi}
        alt="Kolaborasi"
        className="absolute right-10 top-10 w-28 md:w-36 animate-float-slow"
      />

      {/* Advokasi */}
      <img
        src={Advokasi}
        alt="Advokasi"
        className="absolute right-47 bottom-10 w-28 md:w-36 animate-float-slow"
      />
    </section>
  );
};

export default Hero;
