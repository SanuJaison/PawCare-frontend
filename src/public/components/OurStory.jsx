// import React from 'react'
import storyImg from "../../assets/female-kissing-dog.jpg";
import missionImg from "../../assets/ourmission-Photoroom.png";
import visionImg from "../../assets/ourvision-Photoroom.png";

import { TbTargetArrow } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";

const OurStory = () => {
  return (
    <div className="px-10 py-16">
      <div className="grid grid-cols-2 gap-10 items-center px-10">
        <div>
          <img
            src={storyImg}
            alt="Our Story"
            className="w-full h-105 object-cover rounded-3xl"
          />
        </div>

        <div>
          <p className="text-primary font-bold">OUR STORY</p>

          <h2 className="text-5xl font-bold text-heading mt-2">
            A Passion For Pet Care
          </h2>

          <p className="mt-6 text-text leading-relaxed font-semibold w-100">
            PawCare started with a simple mission: to create a safe, comfortable
            and loving environment for pets and their parents.
          </p>

          <p className="mt-5 text-text leading-relaxed font-semibold w-100">
            Over the years, we've helped thousands of pets stay healthy, happy
            and loved. Our dedicated team works every day with one goal — your
            pet's well-being.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <IoPaw className="text-primary text-3xl" />

            <p className="text-primary text-3xl font-semibold italic">
              Because they deserve the best!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10 px-10">
        <div className="bg-pink-card rounded-3xl p-8 flex items-center justify-between overflow-hidden">
          <div className="max-w-[60%]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 min-w-16 rounded-full bg-primary flex items-center justify-center text-white text-3xl">
                <TbTargetArrow />
              </div>

              <div>
                <p className="text-3xl font-bold text-heading">Our Mission</p>

                <p className="text-text font-semibold leading-relaxed mt-4 text-justify">
                  To provide exceptional pet care services while building
                  lasting relationships with pets and their owners.
                </p>

                <div className="w-12 h-1 bg-primary rounded-full mt-6"></div>
              </div>
            </div>
          </div>

          <img
            src={missionImg}
            alt="Mission"
            className="w-52 h-52 object-contain"
          />
        </div>

        <div className="bg-pink-card rounded-3xl p-8 flex items-center justify-between overflow-hidden">
          <div className="max-w-[60%]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 min-w-16 rounded-full bg-primary flex items-center justify-center text-white text-3xl">
                <FaRegEye />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-heading">Our Vision</h3>

                <p className="text-text font-semibold leading-relaxed mt-4 text-justify">
                  To become the most trusted pet care center by offering quality
                  care, innovation and compassion in everything we do.
                </p>

                <div className="w-12 h-1 bg-primary rounded-full mt-6"></div>
              </div>
            </div>
          </div>

          <img
            src={visionImg}
            alt="Vision"
            className="w-52 h-52 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
