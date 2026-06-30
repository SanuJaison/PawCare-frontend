// import React from 'react'
import { Link } from "react-router-dom";
import truckImg from "../../assets/dtruck-Photoroom.png";
import dogImg from "../../assets/paw10-Photoroom.png";
import catImg from "../../assets/catquality-Photoroom.png";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const PromoBanners = () => {
  return (
    <div className="px-4 pb-8 sm:px-6 lg:px-10">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col items-start justify-between gap-3 overflow-hidden rounded-3xl bg-pink-card p-6 sm:flex-row sm:items-center">
          <img
            src={truckImg}
            alt="Delivery Truck"
            className="w-32 h-32 object-contain"
          />

          <div className="flex-1">
            <p className="text-3xl font-bold text-heading sm:text-4xl">Free Delivery</p>

            <p className="text-text font-medium mt-1">On orders above ₹999</p>

            <Link
              to="/pet-shop"
              className="mt-4 inline-flex items-center gap-2 bg-white px-5 py-3 rounded-xl font-bold text-heading shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Shop Now
              <MdKeyboardDoubleArrowRight className="text-primary text-2xl" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-purple-100 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-3xl font-bold text-purple-700 sm:text-4xl">Flat 10% Off</p>

            <p className="text-text font-medium mt-1">On first order</p>

            <div className="mt-4 border-2 border-dashed border-purple-400 text-heading font-bold text-3xl px-4 py-2 rounded-xl inline-block">
              PAW10A
            </div>
          </div>

          <img src={dogImg} alt="Dog" className="w-40 h-40 object-contain" />
        </div>

        <div className="flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-green-50 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-3xl font-bold text-green-900 sm:text-4xl">Best Quality</p>

            <p className="text-text font-medium mt-1">For Your Best Friend</p>
            <div className="mt-4 inline-block bg-white text-green-900 font-bold px-4 py-2 rounded-xl shadow-sm">
              ✓ 100% Quality Assured
            </div>
          </div>

          <img src={catImg} alt="Cat" className="w-40 h-40 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
