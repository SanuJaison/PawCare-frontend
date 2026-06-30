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
      <div className="bg-pink-bg flex min-h-[calc(100svh-72px)] flex-col items-center justify-center gap-8 px-4 py-10 text-center md:px-8 lg:min-h-[calc(100vh-80px)] lg:flex-row lg:justify-between lg:gap-6 lg:px-10 lg:py-10 lg:text-left xl:gap-10 xl:px-16 2xl:px-20">
        <div className="w-full max-w-3xl min-w-0 space-y-6 px-0 lg:flex-[1_1_52%] lg:px-0 xl:max-w-[56rem]">
          <p className="mb-5 flex items-center justify-center gap-2 text-lg font-bold text-primary-dark lg:justify-start">
            <IoPaw className="text-primary-dark text-xl" />
            PET SHOP
          </p>
          <div className="text-4xl font-bold leading-tight sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <p>Everything Your Pet</p>
            <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-primary-dark lg:justify-start">
              <span className="text-heading">Needs,</span> All in One Place
            </p>
          </div>
          <p className="mx-auto max-w-md text-text font-semibold lg:mx-0">
            Premium quality food, toys, accessories and more for your furry
            companions.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/pet-shop"
              className="flex items-center justify-center gap-2 font-semibold border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
            >
              <GiShoppingBag /> Shop Now
            </Link>
          </div>

          <div className="grid gap-3 lg:max-w-[54rem] lg:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 text-left font-semibold shadow-sm">
              <FaAward className="shrink-0 text-3xl text-primary" />
              <p className="min-w-0 whitespace-nowrap text-sm">Premium Quality Products</p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white p-3 text-left font-semibold shadow-sm">
              <FaShieldDog className="shrink-0 text-3xl text-primary" />
              <p className="min-w-0 whitespace-nowrap text-sm">Safe & Pet Friendly Products</p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white p-3 text-left font-semibold shadow-sm">
              <TbTruck className="shrink-0 text-3xl text-primary" />
              <p className="min-w-0 whitespace-nowrap text-sm">Fast & Reliable Delivery</p>
            </div>
          </div>
        </div>
        <div className="relative h-72 w-full max-w-xl min-w-0 overflow-hidden sm:h-96 lg:h-[34rem] lg:flex-[0_1_44%] lg:max-w-[42rem] xl:h-[40rem] xl:max-w-[48rem]">
          <img
            src={blobImg}
            alt=""
            className="absolute left-1/2 top-8 z-0 h-56 -translate-x-1/2 sm:h-80 lg:left-16 lg:h-[30rem] lg:translate-x-0 xl:h-[36rem]"
          />
          <img src={heroImg} alt="" className="relative z-10 h-full w-full object-contain" />
        </div>
      </div>
    </>
  );
};

export default PetShopHero;

