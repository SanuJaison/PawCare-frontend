import { useState } from "react";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturesBar from "./components/FeaturesBar";
import PetShopHero from "./components/PetShopHero";
import PromoBanners from "./components/PromoBanners";
import ShopByCategory from "./components/ShopByCategory";

const PetShop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <>
      <PetShopHero />
      <ShopByCategory
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FeaturedProducts selectedCategory={selectedCategory} />
      <PromoBanners />
      <FeaturesBar />
    </>
  );
};

export default PetShop;
