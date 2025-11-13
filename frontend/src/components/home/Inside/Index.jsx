import React, { useState } from "react";
import IconAtas from "../../../Assets/Photo-Home/Icon-atas.png";
import IconBawah from "../../../Assets/Photo-Home/Icon-bawah.png";
import IlustrasiKanan from "../../../Assets/Photo-Home/Ilustrasi-kanan.png";
import TetapInformasi from "../../../Assets/Photo-Home/Rectangle 230.svg";
import GerakanAspirasi from "../../../Assets/Photo-Home/Rectangle 231.svg";
import PotoKanan from "../../../Assets/Photo-Home/Poto-kanan.png";

const sites = [
  {
    id: "gaspol",
    label: "Website Gaspol",
    detail: "Pelaporan",
    title: "Website Gerakan Aspirasi Online",
    description:
      "GASPOL berfungsi agar mahasiswa dapat lebih mudah dalam melakukan pelaporan seputar kampus Fakultas Ilmu Komputer Universitas Sriwijaya.",
    categories: [
      "Kinerja dosen",
      "Kebijakan kampus",
      "Kerusakan fasilitas",
      "Aspirasi ormawa",
      "Pengajuan seminar",
    ],
    img: GerakanAspirasi,
    url: "https://gaspol.bemilkomunsri.org/",
    icon: IconAtas,
  },
  {
    id: "ilkom",
    label: "Website Ilkom News",
    detail: "Berita",
    title: "Website Ilkom News",
    description:
      "Ilkom news adalah tempat untuk mencari berbagai informasi terkait fakultas, informasi beasiswa, info lomba, dan berbagai informasi menarik lainnya.",
    categories: ["Seputar Fakultas Ilmu Komputer UNSRI", "Info akademik", "Info non akademik"],
    img: TetapInformasi,
    url: "https://ilkomnews.bemilkomunsri.org/",
    icon: IconBawah,
  },
];

const Inside_BEM_Apps = () => {
  const [active, setActive] = useState(sites[0].id);
  const current = sites.find((s) => s.id === active) || sites[0];

  return (
    <section
      id="inside-bem-apps"
      className="text-sm md:text-base px-4 sm:px-8 lg:px-16 py-20"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 ">
        <h2 className="text-3xl md:text-4xl font-gotham-bold text-center text-gray-900 mb-2">
          Inside <span className="text-[#C2421A]">BEM</span> Apps
        </h2><br />
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto font-gotham-book">
          Suara dan informasi mahasiswa kini terintegrasi dalam satu platform.<br />
          Sampaikan aspirasi melalui Gaspol, dan ikuti perkembangan kampus
          terkini<br /> lewat Ilkom News.
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {sites.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`text-lg font-medium py-2 px-1 border-b-2 ${
                active === s.id
                  ? "border-[#7A0000] text-[#7A0000]"
                  : "border-transparent text-gray-800 hover:text-[#7A0000]"
              }`}
              aria-pressed={active === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left content */}
          <div className="md:w-1/2">
            <div className="flex items-start gap-4 mb-4">
              <img src={current.icon} alt="icon" className="w-10 h-10" />
              <div>
                <h3 className="font-gotham-bold text-2xl text-gray-900 mb-2">{current.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-gotham-book">{current.description}</p>
              </div>
            </div>

            <h4 className="font-gotham-medium mb-2">Kategori {current.detail.split(' ').pop()}:</h4>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-1 font-gotham-book">
              {current.categories.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ol>

            <a href={current.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4A0000] text-white px-6 py-3 rounded-md font-medium hover:bg-transparent hover:border-[#4A0000] hover:border hover:text-[#4A0000] transition">
                More Info
              </button>
            </a>
          </div>

          <div className="circlePosition w-[260px] h-[200px] bg-[#FBBF6A] rounded-full absolute z-1 top-[80%] left-[10%] -translate-x-1/2 -translate-y-1/2 blur-[260px]"></div>

          {/* Right image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-[1.5rem] p-4 md:p-6 bg-white/60 shadow-lg">
              <img src={current.img} alt={current.title} className="w-full max-w-[640px] rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inside_BEM_Apps;
