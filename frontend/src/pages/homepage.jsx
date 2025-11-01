import React from "react";
import Hero from "../components/Home/Hero";
import Who_are_we from "../components/Home/Who_are_we";
import Inside_BEM_Apps from "../components/Home/Inside";
import People_say_about_us from "../components/Home/People_say_about_us/Index";

const Homepage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <Hero />
        <Who_are_we />
        <Inside_BEM_Apps />
        <People_say_about_us />
      </div>
    </main>
  );
};

export default Homepage;
