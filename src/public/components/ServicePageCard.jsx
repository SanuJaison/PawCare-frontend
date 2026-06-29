// import React from 'react'
import { Link } from "react-router-dom";

const ServicePageCard = ({ service }) => {
  const actionPath = service.button === "Shop Now" ? "/pet-shop" : "/appointments";

  return (
    <>
      <div className="bg-white rounded-2xl w-80 border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
        <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center text-primary text-3xl">
          {service.icon}
        </div>

        <h3 className="mt-5 text-2xl font-bold">{service.title}</h3>

        <p className="mt-3 text-text font-semibold text-sm">
          {service.description}
        </p>

        <p className="mt-5 font-bold text-primary text-lg">{service.price}</p>

        <Link
          to={actionPath}
          className="inline-block mt-4 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          {service.button}
        </Link>
      </div>
    </>
  );
};

export default ServicePageCard;
