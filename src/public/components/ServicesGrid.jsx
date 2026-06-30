// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { ImScissors } from "react-icons/im";
import { FaStethoscope } from "react-icons/fa6";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import ServicePageCard from "./ServicePageCard";

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      icon: <ImScissors />,
      title: "Pet Grooming",
      description:
        "Bathing, hair trimming, nail clipping, ear cleaning and styling to keep your pet looking and feeling grat.",
      price: "Starting ₹499",
      button: "Book Now",
    },
    {
      id: 2,
      icon: <FaStethoscope />,
      title: "Veterinary Care",
      description:
        "General checkups, consultations and advanced medical care for the health of your pet.",
      price: "Starting ₹600",
      button: "Book Now",
    },
    {
      id: 3,
      icon: <RiHomeHeartFill />,
      title: "Pet Boarding",
      description:
        "Safe, comfortable and clean boarding facility when you are away. Your pet in good hands.",
      price: "Starting ₹699 / day",
      button: "Book Now",
    },
    {
      id: 4,
      icon: <FaGraduationCap />,
      title: "Pet Training",
      description:
        "Obedience training, behaviour correction and fun activities for a well-behaved pet.",
      price: "Starting ₹799",
      button: "Book Now",
    },
    {
      id: 5,
      icon: <FaSyringe />,
      title: "Vaccination",
      description:
        "Complete vaccination services to protect your pet from various diseases",
      price: "Starting 299",
      button: "Book Now",
    },
    {
      id: 6,
      icon: <GiShoppingBag />,
      title: "Pet Shop",
      description:
        "Premium quality pet foods, toys, accessories and more for your furry companions",
      price: "Up to 20% off",
      button: "Shop Now",
    },
  ];
  return (
    <>
      <div className="px-4 py-10 sm:px-6">
        <div className="text-center space-y-2">
          <p className="text-primary-dark font-bold mt-2">OUR SERVICES</p>
          <p className="text-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything Your Pet Needs
          </p>
          <div className="flex items-center gap-2 justify-center mt-4 mb-10">
            <div className="h-0.5 w-16 bg-primary/40"></div>
            <IoPaw className="text-primary text-xl" />
            <div className="h-0.5 w-16 bg-primary/40"></div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:px-20">
          {services.map((service) => (
            <ServicePageCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesGrid;
