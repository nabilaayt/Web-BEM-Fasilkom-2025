import React from "react";
import AboutUsHero from "../components/About_Us/aboutus_hero";
import AboutBem from "../components/About_Us/about_bem";

const AboutUsPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        {/* <Navbar /> */}
  <AboutUsHero />
  <AboutBem />
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default AboutUsPage;