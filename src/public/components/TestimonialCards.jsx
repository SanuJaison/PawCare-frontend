// import React from 'react'

const TestimonialCards = ({ testimonials }) => {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col h-full">
        <div className="flex justify-center text-yellow-400 text-xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-text mb-6">{testimonials.review}</p>

        <div className="flex items-center gap-3 mt-auto">
          <img
            src={testimonials.image}
            alt={testimonials.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-bold text-heading">{testimonials.name}</p>

            <p className="text-sm text-text">{testimonials.role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCards;
