// import React from 'react'
import { IoPaw } from "react-icons/io5";
import ProductCard from "./ProductCard";

import whiskasImg from "../../assets/whiskas-Photoroom.png";
import chewToyImg from "../../assets/chewtoy-Photoroom.png";
import brushImg from "../../assets/petbrush-Photoroom.png";
import pedigreeImg from "../../assets/pedigree-Photoroom.png";
import petbedImg from "../../assets/petbed2-Photoroom.png";
import petshampooImg from "../../assets/shampoo2-Photoroom.png";
import collarImg from "../../assets/collar2-Photoroom.png";
import treatsImg from "../../assets/treat2-Photoroom.png";
import { useEffect, useState } from "react";
import { getAllProductsAPI } from "../../services/allAPI";

const FeaturedProducts = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const staticProducts = [
    {
      id: "static-1",
      image: pedigreeImg,
      badge: "Best Seller",
      name: "Pedigree Dog Food",
      description: "(Adult)",
      price: "₹1,299",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: "static-2",
      image: whiskasImg,
      badge: "New",
      name: "Whiskas Cat Food",
      description: "(Chicken)",
      price: "₹649",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: "static-3",
      image: chewToyImg,
      badge: "Best Seller",
      name: "Interactive Chew Toy",
      description: "for Dogs",
      price: "₹299",
      rating: 4.6,
      reviews: 76,
    },
    {
      id: "static-4",
      image: brushImg,
      badge: "New",
      name: "Pet Grooming Brush",
      description: "(Soft Bristles)",
      price: "₹399",
      rating: 4.5,
      reviews: 64,
    },
    {
      id: "static-5",
      image: petbedImg,
      badge: "Best Seller",
      name: "Comfort Pet Bed",
      description: "(Soft & Cozy)",
      price: "₹899",
      rating: 4.7,
      reviews: 88,
    },
    {
      id: "static-6",
      image: petshampooImg,
      badge: "New",
      name: "Pet Shampoo",
      description: "(Aloe Vera)",
      price: "₹349",
      rating: 4.6,
      reviews: 55,
    },
    {
      id: "static-7",
      image: collarImg,
      badge: "Best Seller",
      name: "Adjustable Dog Collar",
      description: "(Medium)",
      price: "₹199",
      rating: 4.6,
      reviews: 111,
    },
    {
      id: "static-8",
      image: treatsImg,
      badge: "New",
      name: "Training Treats",
      description: "(Chicken Flavor)",
      price: "₹249",
      rating: 4.5,
      reviews: 69,
    },
  ];

  const loadProducts = async () => {
    const result = await getAllProductsAPI();

    if (result.status >= 200 && result.status < 300) {
      const availableProducts = result.data.filter(
        (product) => Number(product.stock) > 0,
      );

      setApiProducts(availableProducts);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const allProducts = [
    ...staticProducts,
    ...apiProducts.map((product) => ({
      ...product,
      id: `api-${product.id}`,
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
    })),
  ];

  const visibleProducts = showAllProducts
    ? allProducts
    : staticProducts.slice(0, 8);

  return (
    <div className="py-16 px-10">
      <div className="mb-12">
        <div className="w-full text-center">
          <p className="font-bold text-primary text-3xl">FEATURED PRODUCTS</p>

          <div className="flex justify-center items-center gap-3 mt-2">
            <div className="w-12 h-0.5 bg-primary"></div>
            <IoPaw className="text-primary text-xl" />
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {allProducts.length > 8 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="border border-primary text-primary px-6 py-3 rounded-xl font-semibold mt-6 hover:bg-primary hover:text-white transition whitespace-nowrap"
          >
            {showAllProducts ? "Show Less" : "View All Products"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
