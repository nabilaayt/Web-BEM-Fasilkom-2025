import React from "react";
import LogoTengah from "../../../Assets/Photo-Home/Logo-tengah.png";
import PotoKanan from "../../../Assets/Photo-Home/Poto-kanan.png";
import PotoKiri from "../../../Assets/Photo-Home/Poto-kiri.png"
const Who_are_we = () => {
  return (
    <section
      id="who-are-we"
      className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 py-20 bg-gradient-to-br from-[#fffaf8] to-[#fef6f3]"
    >
      {/* Bagian Kiri (Gambar) */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Gambar kiri */}
        <img
          src={PotoKiri}
          alt="Foto Kiri"
          className="w-60 md:w-72 mt-24 rounded-2xl shadow-lg object-cover"
        />

        {/* Gambar kanan */}
        <img
          src={PotoKanan}
          alt="Foto Kanan"
          className="w-60 md:w-72 rounded-2xl shadow-lg object-cover"
        />

        {/* Logo tengah (tumpang tindih di depan gambar) */}
        <img
          src={LogoTengah}
          alt="Logo Tengah"
          className="absolute w-28 md:w-36 z-10"
        />
      </div>

      {/* Bagian Kanan (Teks) */}
      <div className="max-w-lg text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2b2b2b]">
          Who <span className="text-[#f6a200]">Are</span> We?
        </h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          BEM KM Fasilkom Unsri adalah organisasi eksekutif mahasiswa yang
          mewadahi aspirasi, inovasi, dan aksi nyata.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Dengan semangat <span className="italic">Artha Dharma</span>, BEM KM
          Fasilkom Unsri berkomitmen menciptakan lingkungan yang dinamis,
          kolaboratif, dan progresif untuk membentuk mahasiswa yang visioner,
          berintegritas, dan berdampak bagi lingkungan sekitar.
        </p>

        {/* Poin list */}
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-start gap-3">
            <span className="text-[#7A0000] text-lg">✔</span>
            Memiliki total 12 dinas dan 5 bidang
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#7A0000] text-lg">✔</span>
            Menjadi garda terdepan aspirasi, inovasi, dan aksi nyata mahasiswa
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#7A0000] text-lg">✔</span>
            Sinergi program kerja yang bermanfaat
          </li>
        </ul>

        {/* Tombol */}
        <button className="mt-8 bg-[#5A0000] text-white px-6 py-2 rounded-md font-medium hover:bg-[#7A0000] transition">
          More About Bem
        </button>
      </div>
    </section>
  );
};

export default Who_are_we;
