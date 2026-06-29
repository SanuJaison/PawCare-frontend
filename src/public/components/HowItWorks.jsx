// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { PiCalendarDotsFill } from "react-icons/pi";
import { LuClock5 } from "react-icons/lu";
import { FaShieldHeart } from "react-icons/fa6";
import { LuDog } from "react-icons/lu";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <PiCalendarDotsFill />,
      title: "Book a Service",
      description: "Choose the service your pet needs and book an appointment.",
    },
    {
      id: 2,
      icon: <LuClock5 />,
      title: "Schedule Visit",
      description: "Select a convenient date and time that works best for you.",
    },
    {
      id: 3,
      icon: <FaShieldHeart />,
      title: "Expert Care",
      description: "Our trained professionals will take the best care of your pet.",
    },
    {
      id: 4,
      icon: <LuDog />,
      title: "Happy Pet",
      description: "Your pet goes back home happy, healthy and full of energy!",
    },
  ];

  return (
    <div className="bg-[#FFFDFB] py-10 px-10">
      
      <div className="text-center">
        <p className="text-primary-dark font-bold">
          HOW IT WORKS
        </p>

        <p className="text-5xl font-bold text-heading mt-2">
          Simple Steps For Happy Pets
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-0.5 w-16 bg-primary/40"></div>
          <IoPaw className="text-primary text-xl" />
          <div className="h-0.5 w-16 bg-primary/40"></div>
        </div>
      </div>


      <div className="relative max-w-7xl mx-auto mt-16">

        <div className="absolute top-16 left-[15%] right-[15%] border-t-2 border-dashed border-primary/40"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">

                <div className="absolute -top-2 -left-2 bg-primary text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                  {step.id}
                </div>

                <div className="w-32 h-32 rounded-full border-2 border-pink-100 bg-white shadow-sm flex items-center justify-center text-primary text-5xl">
                  {step.icon}
                </div>

              </div>

              <p className="mt-6 text-2xl font-bold text-heading">
                {step.title}
              </p>

              <p className="mt-3 text-text text-sm font-semibold leading-7 max-w-[230px]">
                {step.description}
              </p>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HowItWorks;