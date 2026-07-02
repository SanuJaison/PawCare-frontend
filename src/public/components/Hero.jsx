// import React from 'react'
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";
import { GoHeartFill } from "react-icons/go";
import { CalendarDays } from "lucide-react";
import { IoPaw } from "react-icons/io5";
import blobImg from "../../assets/blob-haikei (1).png";

const Hero = () => {
  return (
    <>
      <div className="bg-pink-bg flex min-h-[calc(100svh-72px)] flex-col items-center justify-center gap-8 px-4 py-10 text-center md:px-8 lg:h-screen lg:flex-row lg:justify-between lg:gap-8 lg:px-10 lg:py-0 lg:text-left xl:gap-12">
        <div className="w-full max-w-2xl space-y-6 px-0 lg:h-80 lg:px-10">
          <div className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            <p>Happy Pets,</p>
            <p className="flex flex-wrap justify-center gap-3 text-primary-dark lg:justify-start">
              Happy Hearts <GoHeartFill />
            </p>
          </div>
          <p className="mx-auto max-w-md text-text font-semibold lg:mx-0">
            We provide the best care, love and attention to keep your pets
            healthy and happy.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/appointments"
              className="flex items-center justify-center gap-2 font-semibold border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <CalendarDays /> Book Appointment
            </Link>
            <Link
              to="/services"
              className="flex items-center justify-center gap-2 font-semibold border border-gray-200 px-5 py-2 rounded-xl shadow bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <IoPaw className="text-primary text-xl" /> Explore Services
            </Link>
          </div>
        </div>
        <div className="relative h-72 w-full max-w-xl overflow-hidden sm:h-96 lg:h-150 lg:max-w-[44rem] xl:max-w-[48rem]">
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

export default Hero;

