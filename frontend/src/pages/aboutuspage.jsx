import React from "react";
import AboutUsHero from "../components/About_Us/aboutus_hero";
import AboutBem from "../components/About_Us/about_bem";
import VisiMisi from "../components/About_Us/visi_dan_misi";
import useInView from "../hooks/useInView.jsx";

const AboutUsPage = () => {
  const [ref, inView] = useInView({ threshold: 0.02, once: true });

  return (
    <main ref={ref} className={`relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0 animate-stagger ${inView ? 'animate-play' : ''}`}>
      <div className="w-full">
        {/* <Navbar /> */}
    <AboutUsHero />
    <AboutBem />
    <VisiMisi />
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default AboutUsPage;