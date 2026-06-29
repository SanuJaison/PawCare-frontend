// import React from 'react'

import FeaturedProducts from "./components/FeaturedProducts"
import FeaturesBar from "./components/FeaturesBar"
import PetShopHero from "./components/PetShopHero"
import PromoBanners from "./components/PromoBanners"
import ShopByCategory from "./components/ShopByCategory"

const PetShop = () => {
  return (
    <>
      <PetShopHero/>
      <ShopByCategory/>
      <FeaturedProducts/>
      <PromoBanners/>
      <FeaturesBar/>
    </>
  )
}

export default PetShop
