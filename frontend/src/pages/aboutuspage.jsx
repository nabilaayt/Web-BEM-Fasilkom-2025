import React from "react";
import AboutUsHero from "../components/About_Us/aboutus_hero";
import AboutBem from "../components/About_Us/about_bem";
import VisiMisi from "../components/About_Us/visi_dan_misi";
import Filosofi from "../Assets/Logo/filosofi.svg";
import FilosofiMobile from "../Assets/Logo/filosofi_mobile.svg";

const AboutUsPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <AboutUsHero />
        <AboutBem />
        <VisiMisi />
        <h2 className="text-center py-6 md:py:16 text-2xl md:text-4xl font-bold md:mb-10 font-gotham-bold">
          Filosofi Logo <span className="text-[#4A0000]">Artha Darma</span>
        </h2>
        <img
          src={Filosofi}
          alt="filosofi"
          className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mb-16 hidden md:block"
        />
        <img
          src={FilosofiMobile}
          alt="filosofi-mobile"
          className="w-full px-5 sm:px-8 py-2 mb-10 md:hidden scale-110"
        />
      </div>
    </main>
  );
};

export default AboutUsPage;
