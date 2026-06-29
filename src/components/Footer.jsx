// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { LuClock5 } from "react-icons/lu";

const Footer = () => {
  return (
    <>
      <div className="bg-pink-bg grid grid-cols-1">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_1.5fr_1.4fr] p-10">
          <div className="flex flex-col items-start gap-5 border-r-2 border-r-gray-200">
            <div className="flex justify-center items-center gap-2">
              <IoPaw className="text-primary text-5xl" />
              <div>
                <p className="text-3xl font-bold">
                  <span className="text-primary">Paw</span>Care
                </p>
                <p className="text-xs font-semibold">Pet Care Center</p>
              </div>
            </div>
            <p className="text-sm text-text font-semibold w-60">We provide the best care, love and attention to keep your pets healthy and happy</p>
            <div className="flex gap-5 text-2xl">
              <FaFacebook className="text-blue-700"/>
              <FaInstagram className="text-pink-600"/>
              <FaXTwitter/>
              <FaYoutube className="text-red-600"/>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center border-r-2 border-r-gray-200">
            <p className="text-heading font-semibold text-lg">Quick Links</p>
            <div className="space-y-1">
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Home</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Services</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> About Us</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Adoption</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Pet Shop</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Contact Us</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 border-r-2 border-r-gray-200">
            <p className="text-heading font-semibold text-lg">Our Services</p>
            <div className="space-y-1">
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Pet Grooming</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Veterinary Care</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Pet Boarding</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Pet Training</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Pet Shop</p>
              <p className="flex items-center text-text font-semibold"><MdOutlineKeyboardArrowRight /> Vaccination</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-8 border-r-2 border-r-gray-200">
            <p className="text-heading font-semibold text-lg w-full">Contact Us</p>
            <div className="space-y-3 w-full">
              <p className="flex items-center text-text font-semibold gap-3"><IoLocationSharp className="text-primary text-2xl"/> 123 Pet Street, Kochi, Kerala 682001</p>
              <p className="flex items-center text-text font-semibold gap-3"><FaPhoneAlt className="text-primary text-xl"/> +91 98765 43210</p>
              <p className="flex items-center text-text font-semibold gap-3"><IoMail className="text-primary text-2xl"/> pawcare@gmail.com</p>
              <p className="flex items-center text-text font-semibold gap-3"><LuClock5 className="text-primary text-2xl"/> Mon - Sun: 9:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-8">
            <p className="text-heading font-semibold text-lg w-full">Newsletter</p>
            <div className="space-y-3">
              <p className="text-text font-semibold pr-3">Subscribe to get updates about our services and offers.</p>
              <div className="flex flex-col gap-3">
                <input type="email" placeholder="Enter your email" className="font-semibold bg-white p-3 border border-gray-200 shadow rounded-lg outline-none"/>
                <button className="font-semibold border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-500">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-20 py-3 font-semibold text-text text-sm bg-pink-card">
          <p>© 2026 PawCare Pet Center. All Right Reserved</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
