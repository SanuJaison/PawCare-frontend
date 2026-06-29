// import React from 'react'
import heroImg from "../../assets/catphn-Photoroom.png";
import { FaPhone } from "react-icons/fa6";
import { IoPaw } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import blobImg from "../../assets/blob-haikei (1).png";

const ContactHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 px-10">
          <p className="text-primary-dark font-bold text-lg mb-5">
              CONTACT US
            </p>
          <div className="text-6xl font-bold">
            <p>We're Here for You</p>
            <p className="flex gap-3">
               and <span className="text-primary-dark">Your Pets!</span> <IoPaw className="text-primary-dark" />
            </p>
          </div>
          <p className="text-text font-semibold w-87">
            Have questions or need assistance? Our team is always happy to help you and your fury friends.
          </p>
          <div className="flex gap-5">
            <button className="font-semibold flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              <FaPhone /> Call Us Now
            </button>
            <button className="font-semibold text-primary flex gap-2 border-2 border-primary px-5 py-2 rounded-xl shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              <MdOutlineEmail className="text-2xl" /> Email Us
            </button>
          </div>
        </div>
        <div className="h-150 relative overflow-hidden">
          <img
            src={blobImg}
            alt=""
            className="absolute left-20 top-10 w- h-130 z-0"
          />
          <img src={heroImg} alt="" className="relative z-10 w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default ContactHero;
