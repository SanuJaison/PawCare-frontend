// import React from 'react'

const PetShopCategory = ({ category }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <img
        src={category.image}
        alt={category.name}
        className="w-20 h-20 object-contain"
      />

      <p className="font-bold text-heading">{category.name}</p>
    </div>
  );
};

export default PetShopCategory;
