// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbClipboardCheck } from "react-icons/tb";
import { RiHomeHeartLine } from "react-icons/ri";

const AdoptionProcess = () => {
  const steps = [
    {
      id: 1,
      icon: <FiSearch />,
      title: "Browse Pets",
      description: "Explore pets and find the one who steals your heart.",
    },
    {
      id: 2,
      icon: <IoDocumentTextOutline />,
      title: "Submit Application",
      description: "Fill out the adoption form and tell us about yourself.",
    },
    {
      id: 3,
      icon: <TbClipboardCheck />,
      title: "Meet & Greet",
      description: "Schedule a meeting to bond with your chosen pet.",
    },
    {
      id: 4,
      icon: <RiHomeHeartLine />,
      title: "Take Them Home",
      description: "Once approved, take your new best friend home!",
    },
  ];

  return (
    <div className="px-10">
      <div className="bg-pink-bg rounded-3xl p-10">
        <div className="text-center mb-16">
          <p className="font-bold text-primary text-2xl">HOW ADOPTION WORKS</p>

          <div className="flex justify-center items-center gap-3 mt-2">
            <div className="w-12 h-0.5 bg-primary"></div>
            <IoPaw className="text-primary text-xl" />
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start gap-5">
              <div className="absolute -top-3 left-14 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                {step.id}
              </div>

              <div className="w-24 h-24 rounded-full bg-white shadow-md border border-pink-100 flex items-center justify-center text-primary text-5xl flex-shrink-0">
                {step.icon}
              </div>

              <div>
                <h3 className="font-bold text-heading text-xl mb-2">
                  {step.title}
                </h3>

                <p className="text-text font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div className="absolute -right-5 top-0 h-full w-px bg-pink-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdoptionProcess;
