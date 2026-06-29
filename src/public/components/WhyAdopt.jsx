// import React from 'react'
import petWithPeople from "../../assets/girlwithdog-Photoroom.png";

import { RiHeart3Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaDog } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { GiChainedHeart } from "react-icons/gi";

const WhyAdopt = () => {
  const benefits = [
    {
      icon: <RiHeart3Line />,
      title: "You save a life",
    },
    {
      icon: <FaUsers />,
      title: "Reduces overpopulation",
    },
    {
      icon: <FaDog />,
      title: "Loyal companionship",
    },
    {
      icon: <CiGlobe />,
      title: "Better for the community",
    },
  ];

  return (
    <div className="px-10 py-16">
      <div className="bg-pink-bg rounded-3xl p-8 flex items-center justify-between gap-10">
        <div className="flex-">
          <img
            src={petWithPeople}
            alt="Pet Adoption"
            className="w-full max-w-md mx-auto"
          />
        </div>

        <div className="flex-1 space-y-5">
          <p className="text-primary font-bold">WHY ADOPT?</p>

          <p className="text-5xl font-bold text-heading">
            Adoption Changes Two Lives
          </p>

          <p className="text-text font-semibold leading-relaxed">
            When you adopt, you're not just giving a pet a home, you're giving
            them a second chance at life.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-3">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-card flex items-center justify-center text-primary text-lg">
                  {item.icon}
                </div>

                <p className="font-bold text-heading">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-80 border-2 border-dashed border-pink-200 rounded-3xl p-10 bg-white text-center mt-10">
          <div className="w-20 h-20 mx-auto flex items-center justify-center text-primary text-8xl">
            <GiChainedHeart />
          </div>

          <p className="text-2xl font-bold text-heading mt-6 leading-snug">
            Thousands of pets
            <br />
            are waiting for love.
          </p>

          <p className="text-primary italic font-bold text-xl mt-4">
            Will you be their hero?
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyAdopt;
