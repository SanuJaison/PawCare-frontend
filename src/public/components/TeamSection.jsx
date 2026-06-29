// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import doctorImg from "../../assets/doc.png";
import groomerImg from "../../assets/groomer-Photoroom.png";
import trainerImg from "../../assets/trainer-Photoroom.png";

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      image: doctorImg,
      name: "Dr. John Wilson",
      role: "Veterinarian",
    },
    {
      id: 2,
      image: groomerImg,
      name: "Emily Brown",
      role: "Pet Groomer",
    },
    {
      id: 3,
      image: trainerImg,
      name: "Michael Davis",
      role: "Pet Trainer",
    },
  ];

  return (
    <section className="px-10 py-16">
      <div className="text-center">
        <p className="font-bold text-primary text-3xl">MEET OUR EXPERT TEAM</p>

        <div className="flex justify-center items-center gap-3 mt-2">
          <div className="w-12 h-0.5 bg-primary"></div>
          <IoPaw className="text-primary text-xl" />
          <div className="w-12 h-0.5 bg-primary"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-12">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <div className="w-[45%] bg-gray-50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-contain"
                />
              </div>

              <div className="flex-1 p-6">
                <h3 className="text-2xl font-bold text-heading">
                  {member.name}
                </h3>

                <p className="text-primary font-semibold mt-3">{member.role}</p>

                <div className="flex gap-3 mt-8">
                  <button className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition duration-200">
                    <TiSocialFacebook className="text-xl" />
                  </button>

                  <button className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition duration-200">
                    <FaInstagram />
                  </button>

                  <button className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition duration-200">
                    <RiTwitterXFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
