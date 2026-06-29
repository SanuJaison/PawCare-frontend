// import React from 'react'
import { Link } from "react-router-dom";
import heroImg from "../../assets/dogwrope-Photoroom.png";
import { GiShoppingBag } from "react-icons/gi";
import { IoPaw } from "react-icons/io5";
import blobImg from "../../assets/blob-haikei (1).png";
import { FaAward } from "react-icons/fa6";
import { FaShieldDog } from "react-icons/fa6";
import { TbTruck } from "react-icons/tb";

const PetShopHero = () => {
  return (
    <>
      <div className="bg-pink-bg flex items-center justify-between px-10 h-screen">
        <div className="space-y-8 h-80 px-10 w-full">
          <p className="text-primary-dark font-bold text-lg mb-5 flex gap-2 items-center">
            <IoPaw className="text-primary-dark text-xl" />
            PET SHOP
          </p>
          <div className="text-6xl font-bold">
            <p>Everything Your Pet</p>
            <p className="text-primary-dark flex gap-3">
              <span className="text-heading">Needs,</span> All in One Place
            </p>
          </div>
          <p className="text-text font-semibold w-90">
            Premium quality food, toys, accessories and more for your furry
            companions.
          </p>
          <div className="flex gap-5">
            <Link
              to="/pet-shop"
              className="font-semibold flex gap-2 items-center border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <GiShoppingBag /> Shop Now
            </Link>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2 items-center bg-white p-2 rounded-xl font-semibold">
              <FaAward className="text-primary text-3xl" />
              <p className="text-sm w-30">Premium Quality Products</p>
            </div>

            <div className="flex gap-2 items-center bg-white p-2 rounded-xl font-semibold">
              <FaShieldDog className="text-primary text-3xl" />
              <p className="text-sm w-30">Safe & Pet Friendly Products</p>
            </div>

            <div className="flex gap-2 items-center bg-white p-2 rounded-xl font-semibold">
              <TbTruck className="text-primary text-3xl" />
              <p className="text-sm w-30">Fast & Reliable Delivery</p>
            </div>
          </div>
        </div>
        <div className="h-150 relative overflow-hidden w-full">
          <img
            src={blobImg}
            alt=""
            className="absolute left-20 top-10 w- h-130 z-0"
          />
          <img src={heroImg} alt="" className="relative z-10 w-full" />
        </div>
      </div>
    </>
  );
};

export default PetShopHero;
