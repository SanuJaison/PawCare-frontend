// import React from 'react'
import heroImg from "../../assets/abouthero-Photoroom.png";
import { ImInfo } from "react-icons/im";
import blobImg from "../../assets/blob-haikei (1).png";

const AboutHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 px-10">
          <div className="text-6xl font-bold">
            <p className="text-primary-dark font-bold text-lg mb-5">
              ABOUT PAWCARE
            </p>
            <p>Caring For Pets</p>
            <p className="text-primary-dark flex gap-3">Like Family</p>
          </div>
          <p className="text-text font-semibold w-85 leading-7">
            At PawCare, we believe every pets deserves love, care and attention.
            From grooming and healthcare to adoption and boarding, we provide
            everything your furry friend needs under one roof.
          </p>
          <div className="flex gap-5">
            <button className="font-semibold flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              <ImInfo className="text-xl" /> Learn More About Us
            </button>
          </div>
        </div>
        <div className="h-150 relative overflow-hidden mr-25">
          <img
            src={blobImg}
            alt=""
            className="absolute left-20 top-10 w- h-130 z-0"
          />
          <img src={heroImg} alt="" className="relative z-10 w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default AboutHero;
