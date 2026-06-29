// import React from 'react'
import heroImg from "../../assets/adoptionhero.png";
import { IoPaw } from "react-icons/io5";
import blobImg from "../../assets/blob-haikei (1).png";

const AdoptionHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 px-10">
          
          <div className="text-6xl font-bold">
            <p className="text-primary-dark font-bold text-lg mb-5">ADOPT, DONT SHOP</p>
            <p>Give Love.</p>
            <p className="text-primary-dark flex gap-3">
              Adopt a Pet.
            </p>
          </div>
          <p className="text-text font-semibold w-85">
            Every pet deserves a loving home. Browse our adorable pets looking for their forever familes.
          </p>
          <div className="flex gap-5">
            <button className="font-semibold flex gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              <IoPaw className="text-white text-xl" /> Find Your New Best Friend
            </button>
          </div>
        </div>
        <div className="h-150 relative overflow-hidden">
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

export default AdoptionHero;
