// import React from 'react'
import { BiCheckShield } from "react-icons/bi";
import { RxLoop } from "react-icons/rx";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHeadset } from "react-icons/fa6";

const FeaturesBar = () => {
  return (
    <>
      <div className="flex justify-around mb-5 border-t-3 border-b-3 border-pink-100 shadow-lg">
        <div className="flex gap-2 p-5 items-center">
          <div className="bg-pink-card w-15 h-15 rounded-full flex items-center justify-center">
            <BiCheckShield className="text-4xl text-primary" />
          </div>
          <p className="text-heading font-bold text-lg">
            100% Safe <br />{" "}
            <span className="text-base font-semibold">Products</span>
          </p>
        </div>

        <div className="flex gap-2 p-5 items-center">
          <div className="bg-pink-card w-15 h-15 rounded-full flex items-center justify-center">
            <RxLoop className="text-3xl text-primary" />
          </div>
          <p className="text-heading font-bold text-lg">
            Easy Returns <br />{" "}
            <span className="text-base font-semibold">& Refunds</span>
          </p>
        </div>

        <div className="flex gap-2 p-5 items-center">
          <div className="bg-pink-card w-15 h-15 rounded-full flex items-center justify-center">
            <RiSecurePaymentLine className="text-4xl text-primary" />
          </div>
          <p className="text-heading font-bold text-lg">
            Secure <br />{" "}
            <span className="text-base font-semibold">Payments</span>
          </p>
        </div>

        <div className="flex gap-2 p-5 items-center">
          <div className="bg-pink-card w-15 h-15 rounded-full flex items-center justify-center">
            <FaHeadset className="text-3xl text-primary" />
          </div>
          <p className="text-heading font-bold text-lg">
            24/7 Customer <br />{" "}
            <span className="text-base font-semibold">Support</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FeaturesBar;
