// import React from 'react'
import { Link } from "react-router-dom";
import heroImg from "../../assets/serviceHero-Photoroom.png";
import { CalendarDays } from "lucide-react";
import blobImg from "../../assets/blob-haikei (1).png";

const ServicesHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 w-130">
          <div className="text-6xl font-bold w-full px-7">
            <p className="w-full">Complete Care</p>
            <p className="text-primary-dark">For Your Pets</p>
          </div>
          <p className="text-text font-semibold w-90 px-7">
            From grooming and veterinary care to boarding and training, we provide everything your furry friend needs under one roof
          </p>
          <div className="px-7">
            <Link
              to="/appointments"
              className="font-semibold inline-flex gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <CalendarDays /> Book Appointment
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

export default ServicesHero;
