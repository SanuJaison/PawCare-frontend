// import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { LuClock5 } from "react-icons/lu";

const ContactInfoCards = () => {
  const contactData = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      info: "+91 98765 43210",
      subInfo: "Mon - Sun: 9:00 AM - 8:00 PM",
    },
    {
      icon: <MdOutlineEmail />,
      title: "Email Us",
      info: "pawcare@gmail.com",
      subInfo: "We reply within 24 hours",
    },
    {
      icon: <IoLocationSharp />,
      title: "Visit Us",
      info: "123 Pet Street, Kochi",
      subInfo: "Kerala 682001, India",
    },
    {
      icon: <LuClock5 />,
      title: "Working Hours",
      info: "Mon - Sun",
      subInfo: "9:00 AM - 8:00 PM",
    },
  ];

  return (
    <div className="px-10 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm grid grid-cols-4 overflow-hidden">
        {contactData.map((item, index) => (
          <div key={index} className="flex items-center gap-5 p-8">
            <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center text-primary text-3xl shrink-0">
              {item.icon}
            </div>

            <div
              className={`pr-10 ${
                index !== contactData.length - 1
                  ? "border-r border-pink-100"
                  : ""
              }`}
            >
              <p className="text-2xl font-bold text-heading">{item.title}</p>

              <p className="text-primary font-bold mt-2">{item.info}</p>

              <p className="text-text font-semibold text-xs mt-1">
                {item.subInfo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCards;
