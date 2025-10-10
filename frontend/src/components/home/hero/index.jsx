import React from "react";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="hero-bg"></div>
      <div className="absolute top-8 right-12">
        <button className="bg-[#B71C1C] text-white px-5 py-2 rounded-full font-semibold shadow-lg">Kolaborasi</button>
      </div>
      <div className="absolute left-12 top-40 flex flex-col items-center">
        <button className="bg-[#B71C1C] text-white px-6 py-2 rounded-full font-semibold shadow-lg">Inisiatif</button>
        <span className="text-[#B71C1C] text-2xl mt-1">&#9650;</span>
      </div>
      <div className="absolute right-24 top-2/3 flex items-center">
        <span className="text-[#1a1a1a] text-2xl mr-2">&#9664;</span>
        <button className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow-lg">Advokasi</button>
      </div>
      <div className="flex flex-col items-center mt-24">
        <h2 className="text-2xl font-bold text-black mb-2">
          Tumbuh Bersama Wujudkan <span className="text-[#B71C1C]">Asa</span>
        </h2>
        <h1 className="text-5xl font-bold text-[#B71C1C] mb-4">BEM KM FASILKOM UNSRI</h1>
        <p className="max-w-xl text-center text-[#7B2D2D] mb-8">
          Sebagai wadah aspirasi mahasiswa, BEM KM Fasilkom UNSRI hadir untuk menjembatani suara mahasiswa dengan civitas akademika, serta menciptakan ruang pengembangan diri di bidang akademik, kepemimpinan, dan sosial.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#5C1A1B] text-white px-8 py-2 rounded-md font-semibold">More Info</button>
          <button className="border-2 border-[#5C1A1B] text-[#5C1A1B] px-8 py-2 rounded-md font-semibold">Send a Report</button>
        </div>
      </div>
    </div>
  );
}