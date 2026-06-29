// import React from 'react'
import PetShopCategory from "./PetShopCategory";
import petFoodImg from "../../assets/petfood-Photoroom.png";
import petTreatImg from "../../assets/pettreat-Photoroom.png";
import petToyImg from "../../assets/pettoys-Photoroom.png";
import petAccessoryImg from "../../assets/petcollar-Photoroom.png";
import petLotion from "../../assets/petlotion-Photoroom.png";
import shieldImg from "../../assets/sheild-Photoroom.png";
import petBed from "../../assets/petbed-Photoroom.png";
import { IoPaw } from "react-icons/io5";

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Food",
      image: petFoodImg,
    },
    {
      id: 2,
      name: "Treats",
      image: petTreatImg,
    },
    {
      id: 3,
      name: "Toys",
      image: petToyImg,
    },
    {
      id: 4,
      name: "Accessories",
      image: petAccessoryImg,
    },
    {
      id: 5,
      name: "Grooming",
      image: petLotion,
    },
    {
      id: 6,
      name: "Health & Care",
      image: shieldImg,
    },
    {
      id: 7,
      name: "Beds & Mats",
      image: petBed,
    },
  ];

  return (
    <div className="pt-16 px-10">
      <div className="text-center mb-12">
        <p className="text-primary font-bold text-3xl">SHOP BY CATEGORY</p>
        <div className="flex justify-center items-center gap-3 mt-2">
          <div className="w-12 h-0.5 bg-primary"></div>
          <IoPaw className="text-primary text-xl" />
          <div className="w-12 h-0.5 bg-primary"></div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {categories.map((category) => (
          <PetShopCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
