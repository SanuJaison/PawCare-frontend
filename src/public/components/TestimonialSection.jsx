// import React from 'react'
import { useState } from "react";
import user1 from "../../assets/uifaces-popular-avatar (1).jpg";
import user2 from "../../assets/uifaces-popular-avatar (2).jpg";
import user3 from "../../assets/uifaces-popular-avatar (3).jpg";
import user4 from "../../assets/uifaces-popular-avatar (4).jpg";
import user5 from "../../assets/uifaces-popular-avatar (5).jpg";
import user6 from "../../assets/uifaces-popular-avatar (6).jpg";
import { MdOutlineChevronLeft } from "react-icons/md";
import { MdOutlineChevronRight } from "react-icons/md";
import TestimonialCards from "./TestimonialCards";
import { IoPaw } from "react-icons/io5";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Pet Owner",
      image: user2,
      review:
        "PawCare is amazing! My dog looks so happy after every grooming session.",
    },
    {
      id: 2,
      name: "Emma Davis",
      role: "Pet Owner",
      image: user3,
      review: "Best pet care center in town! My cat loves the attention.",
    },
    {
      id: 3,
      name: "Mia Anderson",
      role: "Pet Owner",
      image: user4,
      review: "The staff is so caring and professional. Highly recommended!",
    },
    {
      id: 4,
      name: "John Smith",
      role: "Pet Owner",
      image: user1,
      review: "Excellent service and very friendly staff.",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Pet Owner",
      image: user5,
      review:
        "The boarding facility is clean and safe. I always leave my pet here with complete peace of mind.",
    },
    {
      id: 6,
      name: "Michael Brown",
      role: "Pet Owner",
      image: user6,
      review:
        "From grooming to health checkups, PawCare has become our go-to place for everything.",
    },
  ];

  const [start, setStart] = useState(0);
  const nextSlide = () => {
    if (start < testimonials.length - 3) {
      setStart(start + 1);
    }
  };

  const prevSlide = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  };

  return (
    <>
      <div className="bg-pink-bg py-16 px-20 relative">
        <p className="text-center text-primary font-bold text-3xl mb-10 flex justify-center items-center gap-3">
          <IoPaw className="text-primary text-3xl" /> WHAT PET PARENTS SAY
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg"
          >
            <MdOutlineChevronLeft className="text-2xl" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6 flex-1">
            {testimonials.slice(start, start + 3).map((testimonials) => (
              <TestimonialCards
                key={testimonials.id}
                testimonials={testimonials}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg"
          >
            <MdOutlineChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;
