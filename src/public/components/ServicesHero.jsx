// import React from 'react'
import { Link } from "react-router-dom";
import heroImg from "../../assets/serviceHero-Photoroom.png";
import { CalendarDays } from "lucide-react";
import blobImg from "../../assets/blob-haikei (1).png";

const ServicesHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex min-h-[calc(100svh-72px)] flex-col items-center justify-center gap-8 px-4 py-10 text-center md:px-8 lg:h-screen lg:flex-row lg:justify-between lg:px-10 lg:py-0 lg:text-left">
        <div className="w-full max-w-2xl space-y-6 px-0 lg:h-80 lg:w-130">
          <div className="w-full px-0 text-4xl font-bold sm:text-5xl lg:px-7 lg:text-6xl">
            <p className="w-full">Complete Care</p>
            <p className="text-primary-dark">For Your Pets</p>
          </div>
          <p className="mx-auto max-w-md px-0 text-text font-semibold lg:mx-0 lg:px-7">
            From grooming and veterinary care to boarding and training, we provide everything your furry friend needs under one roof
          </p>
          <div className="px-0 lg:px-7">
            <Link
              to="/appointments"
              className="inline-flex items-center justify-center gap-2 font-semibold border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <CalendarDays /> Book Appointment
            </Link>
          </div>
        </div>
        <div className="relative h-72 w-full max-w-xl overflow-hidden sm:h-96 lg:h-150">
          <img
            src={blobImg}
            alt=""
            className="absolute left-1/2 top-8 z-0 h-56 -translate-x-1/2 sm:h-80 lg:left-20 lg:h-130 lg:translate-x-0"
          />
          <img src={heroImg} alt="" className="relative z-10 h-full w-full object-contain" />
        </div>
      </div>
    </>
  );
};

export default ServicesHero;

