import { IoPaw } from "react-icons/io5";
import PetShopCategory from "./PetShopCategory";
import petFoodImg from "../../assets/petfood-Photoroom.png";
import petTreatImg from "../../assets/pettreat-Photoroom.png";
import petToyImg from "../../assets/pettoys-Photoroom.png";
import petAccessoryImg from "../../assets/petcollar-Photoroom.png";
import petLotion from "../../assets/petlotion-Photoroom.png";
import shieldImg from "../../assets/sheild-Photoroom.png";
import petBed from "../../assets/petbed-Photoroom.png";

const ShopByCategory = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    {
      id: 0,
      name: "All Products",
      image: petFoodImg,
    },
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
    <section className="px-4 pt-16 sm:px-6 lg:px-10">
      <div className="mb-12 text-center">
        <p className="text-3xl font-bold text-primary">SHOP BY CATEGORY</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <div className="h-0.5 w-12 bg-primary"></div>
          <IoPaw className="text-xl text-primary" />
          <div className="h-0.5 w-12 bg-primary"></div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
        {categories.map((category) => (
          <PetShopCategory
            key={category.id}
            category={category}
            isActive={selectedCategory === category.name}
            onSelect={onSelectCategory}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
