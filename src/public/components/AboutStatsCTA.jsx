// import React from 'react'
import { Link } from "react-router-dom";
import { IoPawOutline } from "react-icons/io5";
import { LuDog } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";
import { CalendarDays } from "lucide-react";

import ctaImg from "../../assets/abtcta-Photoroom.png";

const AboutStatsCTA = () => {
  const stats = [
    { icon: <IoPawOutline />, value: "10+", label: "Years of Experience" },
    { icon: <LuDog />, value: "5000+", label: "Happy Pets" },
    { icon: <FaRegHeart />, value: "2000+", label: "Happy Pet Parents" },
    { icon: <FaAward />, value: "15+", label: "Expert Team Members" },
  ];

  return (
    <div className="px-10 py-16">
      <div className="bg-pink-card rounded-3xl px- py-8">
        <div className="grid grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-center gap-5 ${
                index !== stats.length - 1 ? "border-r border-pink-200" : ""
              }`}
            >
              <div className="text-primary text-5xl">{item.icon}</div>

              <div>
                <p className="text-4xl font-bold text-heading">{item.value}</p>
                <p className="text-text font-semibold mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-pink-card rounded-3xl px-20 flex items-center justify-between overflow-hidden">
        <div>
          <h2 className="text-5xl font-bold text-heading">
            Join The PawCare Family Today!
          </h2>

          <p className="text-text text-xl font-semibold mt-4">
            Experience the best care for your furry friends.
          </p>

          <Link
            to="/appointments"
            className="font-semibold inline-flex gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white mt-5 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
          >
            <CalendarDays /> Book Appointment
          </Link>
        </div>

        <img src={ctaImg} alt="Dog and Cat" className="w-100 object-contain" />
      </div>
    </div>
  );
};

export default AboutStatsCTA;
