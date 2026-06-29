// import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { IoPaw } from "react-icons/io5";

const PetCenterNavbar = () => {
  return (
    <div className="h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8">
      <div className="relative w-105">
        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />

        <input
          type="text"
          placeholder="Search users, pets, appointments, products..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm font-medium"
        />
      </div>

      <div className="flex items-center">
        <button className="relative px-6 py-5 border-gray-200">
          <IoIosNotificationsOutline className="text-3xl text-heading" />

          <span className="absolute top-3 right-4 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
            8
          </span>
        </button>

        <button className="relative px-6 py-5 border-gray-200">
          <MdOutlineEmail className="text-2xl text-heading" />

          <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
            5
          </span>
        </button>

        <div className="flex items-center gap-4 pl-6 ml-2 border-l-2 border-l-gray-100 border-gray-200">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <IoPaw className="text-3xl text-white" />
          </div>

          <div>
            <p className="font-bold text-heading">Admin</p>

            <p className="text-sm text-text font-semibold">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCenterNavbar;
