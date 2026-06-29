// import React from 'react'
import { FaUsers } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { PiCalendarStarBold } from "react-icons/pi";
import { FaAward } from "react-icons/fa6";

const StatsSection = () => {
  const stats = [
    {
      icon: <FaUsers />,
      value: "1500+",
      label: "Happy Pet Owners",
    },
    {
      icon: <IoPaw />,
      value: "3000+",
      label: "Pets Treated",
    },
    {
      icon: <PiCalendarStarBold />,
      value: "5000+",
      label: "Appointments Done",
    },
    {
      icon: <FaAward />,
      value: "10+",
      label: "Years Experience",
    },
  ];
  return (
    <>
      <div className="px-20 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 grid grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-center gap-4 py-6
        ${index !== stats.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              <div className="text-primary text-5xl">{stat.icon}</div>

              <div>
                <p className="text-4xl font-bold text-primary">
                  {stat.value}
                </p>

                <p className="text-text">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsSection;
