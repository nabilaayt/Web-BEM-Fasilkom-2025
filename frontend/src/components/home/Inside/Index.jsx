import React from "react";
import IconAtas from "../../../Assets/Photo-Home/Icon-atas.png";
import IconBawah from "../../../Assets/Photo-Home/Icon-bawah.png";
import IlustrasiKanan from "../../../Assets/Photo-Home/Ilustrasi-kanan.png";
import TetapInformasi from "../../../Assets/Photo-Home/Tetap-Informasi.png";
import GerakanAspirasi from "../../../Assets/Photo-Home/Gerakan-Aspirasi.png";

const Inside_BEM_Apps = () => {
  return (
    <section
      id="inside-bem-apps"
      className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-20 bg-gradient-to-br from-[#fffaf8] to-[#fef6f3]"
    >
      {/* Bagian Kiri */}
      <div className="flex-1 max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Inside <span className="text-[#7A0000]">BEM</span> Apps
        </h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Suara dan informasi mahasiswa kini terintegrasi dalam satu platform.
          Sampaikan aspirasi melalui Gaspol, dan ikuti perkembangan kampus
          terkini lewat Ilkom News.
        </p>

        {/* Card 1 */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src={IconAtas}
            alt="Ikon Gerakan Aspirasi"
            className="w-10 h-10"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Website Gerakan Aspirasi Online
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Platform pelaporan bagi mahasiswa Fakultas Ilmu Komputer
              Universitas Sriwijaya untuk menyampaikan aspirasi seputar kampus.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-start gap-4 bg-white/70 shadow-md p-4 rounded-xl">
          <img src={IconBawah} alt="Ikon Ilkom News" className="w-10 h-10" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Website Ilkom News
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sebagai pusat platform informasi seputar fakultas, beasiswa, lomba,
              dan berbagai hal menarik lainnya.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="relative flex-1 flex justify-center">
        <div className=" rounded-[2rem] p-4 md:p-6 relative">
          <img
            src={IlustrasiKanan}
            alt="Ilustrasi Mahasiswa"
            className="w-72 md:w-80 rounded-2xl object-cover"
          />

          {/* Gambar label “Gerak Aspirasi” */}
          <img
            src={GerakanAspirasi}
            alt="Gerakan Aspirasi"
            className="absolute -top-1 -right-8 w-40 md:w-44"
          />

          {/* Gambar label “Tetap Terinformasi” */}
          <img
            src={TetapInformasi}
            alt="Tetap Terinformasi"
            className="absolute -bottom-6 left-4 w-44 md:w-48"
          />
        </div>
      </div>
    </section>
  );
};

export default Inside_BEM_Apps;
