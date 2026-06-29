// import React from 'react'
import { Link } from "react-router-dom";

const ServiceCards = ({ service }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-card text-primary text-3xl">
          {service.icon}
        </div>

        <p className="mt-4 text-lg font-bold text-heading">{service.title}</p>

        <p className="mt-2 text-text text-sm leading-6">
          {service.description}
        </p>

        <Link
          to="/services"
          className="inline-block mt-4 text-primary font-semibold hover:text-primary-dark"
        >
          Learn More →
        </Link>
      </div>
    </>
  );
};

export default ServiceCards;
