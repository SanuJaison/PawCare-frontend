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
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 px-10">
          <div className="text-6xl font-bold">
            <p>Happy Pets,</p>
            <p className="text-primary-dark flex gap-3">
              Happy Hearts <GoHeartFill />
            </p>
          </div>
          <p className="text-text font-semibold w-85">
            We provide the best care, love and attention to keep your pets
            healthy and happy.
          </p>
          <div className="flex gap-5">
            <Link
              to="/appointments"
              className="font-semibold flex gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <CalendarDays /> Book Appointment
            </Link>
            <Link
              to="/services"
              className="font-semibold flex gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <IoPaw className="text-primary text-xl" /> Explore Services
            </Link>
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

export default Hero;
