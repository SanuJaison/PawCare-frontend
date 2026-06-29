// import React from 'react'
import { Link } from "react-router-dom";
import ctaImg from "../../assets/cta.png";
import { CalendarDays } from "lucide-react";

const CTASection = () => {
  return (
    <section className="px-10 py-16">
      <div className="max-w-7xl mx-auto bg-pink-card rounded-[30px] relative overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative h-full flex justify-center">
            <img src={ctaImg} alt="Pets" className="w-fit object-cover -mt-6" />
          </div>

          <div className="py-12 pr-10">
            <h2 className="text-5xl font-bold text-heading">
              Need Professional Pet Care?
            </h2>

            <p className="mt-4 text-text text-lg font-semibold leading-8 w-100">
              Book an appointment today and let our experts take care of your furry friend.
            </p>

            <Link
              to="/appointments"
              className="mt-8 inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CalendarDays />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
