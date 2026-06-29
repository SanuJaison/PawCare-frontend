// import React from 'react'
import { Link } from "react-router-dom";
import bruno from "../../assets/golden retriever.jpg";
import luna from "../../assets/persian cat.jpg";
import max from "../../assets/beagle.jpg";
import AdoptionCards from "./AdoptionCards";

const AdoptionSection = () => {
  const pets = [
    {
      id: 1,
      image: bruno,
      name: "Bruno",
      breed: "Golden Retriever",
      age: "2 Years",
      des: "Friendly, playful & energetic",
    },
    {
      id: 2,
      image: luna,
      name: "Luna",
      breed: "Persian Cat",
      age: "1 Year",
      des: "Calm, gentle & loving",
    },
    {
      id: 3,
      image: max,
      name: "Max",
      breed: "Beagle",
      age: "1.5 Year",
      des: "Active, smart & loving",
    },
  ];
  return (
    <>
      <div className="px-25">
        <div className="grid grid-cols-[30%_70%] bg-amber-50 px-8 py-4 rounded-xl">
          <div className="space-y-3 pt-10">
            <p className="text-primary-dark font-bold text-xs">ADOPTION</p>
            <p className="text-2xl font-semibold w-50">Give them a Forever Home</p>
            <p className="text-text font-semibold w-70">
              Lovely pets are waiting for a caring family. Adopt and make a difference
            </p>
            <Link
              to="/adoption"
              className="inline-block font-semibold gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              View All Pets
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {pets.map((pet) => (
              <AdoptionCards key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionSection;
