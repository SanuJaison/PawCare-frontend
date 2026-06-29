// import React from 'react'
import { Link } from "react-router-dom";

const AdoptionCards = ({ pet }) => {
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-45 object-cover object-top"
          />

          <span className="absolute bottom-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Adoption
          </span>
        </div>
        <div className="p-4">
          <p className="text-xl font-bold text-heading">{pet.name}</p>

          <p className="text-text mt-1">
            {pet.breed} • {pet.age}
          </p>

          <p className="text-text mt-2">{pet.des}</p>

          <Link
            to="/adoption"
            className="inline-block mt-4 text-primary font-semibold hover:text-primary-dark transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdoptionCards;
