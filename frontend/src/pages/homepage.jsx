import React from "react";
import useInView from "../hooks/useInView.jsx";
// import Navbar from "../../components/N_F/Navbar/Navbar";
// import Footer from "../../components/N_F/Footer/Footer";
import Hero from "../components/Home/Hero";
import Who_are_we from "../components/Home/Who_are_we";
import Inside_BEM_Apps from "../components/Home/Inside";
import PeopleSayAboutUs from "../components/home/People_say_about_us/Index.jsx";

const Homepage = () => {
  const [ref, inView] = useInView({ threshold: 0.02, once: true });

  return (
    <main ref={ref} className={`relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0 animate-stagger ${inView ? 'animate-play' : ''}`}>
      <div className="w-full">
        {/* <Navbar /> */}
        <Hero />
        <Who_are_we />
        <Inside_BEM_Apps />
  <PeopleSayAboutUs />
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default Homepage;
