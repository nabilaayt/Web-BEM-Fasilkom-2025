import React from "react";
// import Navbar from "../../components/N_F/Navbar/Navbar";
// import Footer from "../../components/N_F/Footer/Footer";
import Hero from "../components/home/Hero";
import Who_are_we from "../components/home/Who_are_we/Index.jsx";
import Inside_BEM_Apps from "../components/home/Inside/index.jsx";

const Homepage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <Hero />
        <Who_are_we />
        <Inside_BEM_Apps />
      </div>
    </main>
  );
};

export default Homepage;
