// import React from 'react'
import { IoPaw } from "react-icons/io5";
import { IoIosPaperPlane } from "react-icons/io";

const ContactFormSection = () => {
  return (
    <div className="p-16">
      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <p className="text-4xl font-bold text-heading flex items-center gap-2">
            Send Us a Message
            <IoPaw className="text-primary" />
          </p>

          <p className="text-text font-semibold mt-3 mb-8">
            Fill out the form below and our team will get back to you soon.
          </p>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="font-semibold text-heading">
                  Your Name <span className="text-primary">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-heading">
                  Email Address <span className="text-primary">*</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="font-semibold text-heading">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-heading">
                  Subject <span className="text-primary">*</span>
                </label>

                <select className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary">
                  <option>Select a subject</option>
                  <option>Pet Adoption</option>
                  <option>Pet Shop</option>
                  <option>Veterinary Care</option>
                  <option>General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-heading">
                Message <span className="text-primary">*</span>
              </label>

              <textarea
                rows="6"
                placeholder="Type your message here..."
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-3 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              <IoIosPaperPlane  className="text-xl"/> Send Message
            </button>
          </form>
        </div>


        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7857.815573609896!2d76.33926777507838!3d10.024468090082184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c5e4a47a303%3A0x5d0ef0df9a9b89a3!2sPET%20TRUST%20-%20Veterinary%20Hospital!5e0!3m2!1sen!2sin!4v1781530435254!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[650px]"
            title="Pet Trust Veterinary Hospital"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactFormSection;