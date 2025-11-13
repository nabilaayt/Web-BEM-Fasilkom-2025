import React from "react";
import useInView from "../../../hooks/useInView.jsx";
import LogoCombined from "../images/Logo Visi dan Misi.svg";

const VisiMisi = () => {
  const [ref, inView] = useInView({ threshold: 0.06, once: true });

  return (
    <section ref={ref} className="px-4 sm:px-8 lg:px-16 py-16 animate-fade-up">
      <div className="max-w-[1500px] mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 font-gotham-bold">
          Visi & <span className="text-[#4A0000]">Misi</span>
        </h2>

        <div className="circlePosition w-[260px] h-[200px] bg-[#4A0000] rounded-full absolute z-1 top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 blur-[260px]"></div>

        {/* Container untuk logo dan konten */}
  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-[16rem] animate-stagger ${inView ? 'animate-play' : ''}`}>
          {/* Logo kiri */}
          <div className={`w-full md:w-5/12 flex items-center justify-center ${inView ? 'animate-scale' : ''}`}>
            <img
              src={LogoCombined}
              alt="Logo Visi dan Misi"
              className="w-full max-w-[500px] md:max-w-[650px] lg:max-w-[750px] h-auto drop-shadow-2xl"
            />
          </div>

          {/* Konten kanan */}
          <div className="w-full md:w-7/12">
            <h3 className="text-xl md:text-2xl font-gotham-bold text-[#111] mb-3">
              Visi
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6 font-gotham-book text-justify">
              Terwujudnya BEM KM Fasilkom yang transparan, inklusif, kolaboratif,
              dan responsif, sebagai penggerak perubahan yang berkontribusi
              positif bagi mahasiswa dan masyarakat, serta proaktif dalam
              mengawal aspirasi dan perubahan melalui pengembangan akademik,
              minat bakat, dan advokasi.
            </p>

            <h3 className="text-xl md:text-2xl font-gotham-bold text-[#4A0000] mb-3">
              Misi
            </h3>
            <ol className="list-decimal list-inside text-sm md:text-base text-gray-700 space-y-2 font-gotham-book">
              <li>Integrasi dalam harmoni</li>
              <li>Advokasi dengan hasil nyata dan transparan</li>
              <li>Mendorong kolaborasi</li>
              <li>Mengutamakan pengabdian</li>
              <li>Memfasilitasi pengembangan</li>
              <li>Kaderisasi dan penguatan literasi kritis</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;