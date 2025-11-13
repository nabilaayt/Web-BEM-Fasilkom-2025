import React from "react";
import LogoTengah from "../../../Assets/Photo-Home/Logo-tengah.png";
import PotoKanan from "../../../Assets/Photo-Home/Poto-kanan.png";
import PotoKiri from "../../../Assets/Photo-Home/Poto-kiri.png";
import { Link } from "react-router-dom";

const Who_are_we = () => {
  return (
    <section
      id="who-are-we"
      className="flex text-sm md:text-lg flex-col md:flex-row items-center justify-between gap-10 px-4 sm:px-8 lg:px-16 py-20"
    >
      {/* Bagian Kiri (Gambar) */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 flex-shrink-0">
        {/* Gambar kiri */}
        <img
          src={PotoKiri}
          alt="Foto Kiri"
          className="w-60 md:w-80 translate-y-8 md:translate-y-12 rounded-2xl shadow-lg object-cover"
        />

        {/* Gambar kanan */}
        <img
          src={PotoKanan}
          alt="Foto Kanan"
          className="w-60 md:w-80 -translate-y-8 md:-translate-y-12 rounded-2xl shadow-lg object-cover"
        />

        {/* Logo tengah (tumpang tindih di depan gambar) */}
        <img
          src={LogoTengah}
          alt="Logo Tengah"
          className="absolute w-28 md:w-36 z-10"
        />
      </div>

      {/* Bagian Kanan (Teks) */}
      <div className="max-w-xl flex-shrink-0 font-gotham-book text-[#3E3E3E] text-center md:text-left">
        <h2 className="text-3xl font-gotham-bold md:text-5xl font-bold mb-4 text-[#030303]">
          Who <span className="text-[#C2421B]">Are</span> We?
        </h2>

        <p className="max-w-lg mb-4 leading-relaxed">
          BEM KM Fasilkom Unsri adalah organisasi eksekutif mahasiswa yang
          mewadahi aspirasi, inovasi, dan aksi nyata.
        </p>

        <p className="max-w-lg mb-6 leading-relaxed">
          Dengan semangat <span className="italic">Artha Dharma</span>, BEM KM
          Fasilkom Unsri berkomitmen menciptakan lingkungan yang dinamis,
          kolaboratif, dan progresif untuk membentuk mahasiswa yang visioner,
          berintegritas, dan berdampak bagi lingkungan sekitar.
        </p>

        {/* Poin list */}
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#4A0000] text-lg flex-shrink-0">✔</span>
            Memiliki total 12 dinas dan 5 bidang
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#4A0000] text-lg">✔</span>
            Menjadi garda terdepan aspirasi, inovasi, dan aksi nyata mahasiswa
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#4A0000] text-lg">✔</span>
            Sinergi program kerja yang bermanfaat
          </li>
        </ul>

        {/* Tombol */}
        <Link
          to="/profile"
          className="font-gotham-medium inline-block mt-8 bg-[#4A0000] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0000] hover:border hover:border-[#5A0000] hover:text-[#5A0000] transition"
        >
          More About Bem
        </Link>

        <div className="circlePosition w-[260px] h-[200px] bg-[#4A0000] rounded-full absolute z-1 top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 blur-[260px]"></div>
      </div>
    </section>
  );
};

export default Who_are_we;
