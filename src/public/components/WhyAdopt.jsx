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
    <section className="px-4 py-12 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid overflow-hidden rounded-3xl bg-pink-bg p-6 sm:p-8 lg:grid-cols-[0.95fr_1.1fr_0.85fr] lg:items-center lg:gap-8 xl:gap-10">
        <div className="order-3 mt-8 lg:order-1 lg:mt-0">
          <img
            src={petWithPeople}
            alt="Pet Adoption"
            className="mx-auto w-full max-w-xs object-contain sm:max-w-sm lg:max-w-md"
          />
        </div>

        <div className="order-1 min-w-0 space-y-5 text-center lg:order-2 lg:text-left">
          <p className="font-bold text-primary">WHY ADOPT?</p>

          <p className="text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl">
            Adoption Changes Two Lives
          </p>

          <p className="mx-auto max-w-xl font-semibold leading-relaxed text-text lg:mx-0">
            When you adopt, you're not just giving a pet a home, you're giving
            them a second chance at life.
          </p>

          <div className="grid gap-4 pt-3 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/70 p-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-card text-lg text-primary">
                  {item.icon}
                </div>

                <p className="min-w-0 font-bold leading-snug text-heading">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 mt-8 w-full rounded-3xl border-2 border-dashed border-pink-200 bg-white p-6 text-center lg:order-3 lg:mt-0 lg:p-8 xl:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center text-7xl text-primary sm:h-20 sm:w-20 sm:text-8xl">
            <GiChainedHeart />
          </div>

          <p className="mt-6 text-2xl font-bold leading-snug text-heading">
            Thousands of pets are waiting for love.
          </p>

          <p className="mt-4 text-xl font-bold italic text-primary">
            Will you be their hero?
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
