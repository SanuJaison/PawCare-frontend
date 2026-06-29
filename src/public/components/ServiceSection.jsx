// import React from 'react'
import { ImScissors } from "react-icons/im";
import { FaStethoscope } from "react-icons/fa6";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import ServiceCards from "./ServiceCards";

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      icon: <ImScissors />,
      title: "Pet Grooming",
      description:
        "Professional grooming service to keep your pet clean and happy.",
    },
    {
      id: 2,
      icon: <FaStethoscope />,
      title: "Veterinary Care",
      description: "Expert medical care and health checkups for your pets.",
    },
    {
      id: 3,
      icon: <RiHomeHeartFill />,
      title: "Pet Boarding",
      description: "Safe comfortable and loving boarding for your pets.",
    },
    {
      id: 4,
      icon: <FaGraduationCap />,
      title: "Pet Training",
      description: "Safe comfortable and loving boarding for your pets.",
    },
    {
      id: 5,
      icon: <FaSyringe />,
      title: "Vaccination",
      description: "Safe comfortable and loving boarding for your pets.",
    },
  ];
  return (
    <>
      <div className="px-30 py-15">
        <div className="b-red-700">
          <p className="text-primary-dark font-bold text-xs">OUR SERVICES</p>
          <p className="text-2xl font-semibold">Complete Care for Your Pet</p>
        </div>

        <div className="grid grid-cols-5 gap-6 mt-5">
        {services.map((service) => (
          <ServiceCards key={service.id} service={service} />
        ))}
      </div>
      </div>
      
    </>
  );
};

export default ServiceSection;
