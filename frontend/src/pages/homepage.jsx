import React from "react";
import Navbar from "../components/N_F/Navbar/Navbar";
import Footer from "../components/N_F/Footer/Footer";
import Hero from "../components/home/hero";
import Who_are_we from "../components/home/Who_are_we";
import Inside_BEM_Apps from "../components/home/Inside";
import People_say_about_us from "../components/home/People_say_about_us/Index";

const Homepage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <Navbar />
        <div className="pt-20">
          <Hero />
          <Who_are_we />
          <Inside_BEM_Apps />
          <People_say_about_us />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Homepage;
