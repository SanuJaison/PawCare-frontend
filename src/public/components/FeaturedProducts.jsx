import { useEffect, useState } from "react";
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
import { getAllProductsAPI } from "../../services/allAPI";

const FeaturedProducts = ({ selectedCategory = "All Products" }) => {
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
      category: "Food",
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
      category: "Food",
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
      category: "Toys",
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
      category: "Grooming",
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
      category: "Beds & Mats",
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
      category: "Grooming",
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
      category: "Accessories",
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
      category: "Treats",
    },
  ];

  const categoryAliases = {
    "Health & Care": ["Health & Care", "Health"],
    "Beds & Mats": ["Beds & Mats", "Beds", "Bed"],
  };

  const matchesCategory = (product) => {
    if (selectedCategory === "All Products") return true;

    const validCategories = categoryAliases[selectedCategory] || [selectedCategory];

    return validCategories.some(
      (category) =>
        product.category?.toLowerCase() === category.toLowerCase(),
    );
  };

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

  useEffect(() => {
    setShowAllProducts(false);
  }, [selectedCategory]);

  const allProducts = [
    ...staticProducts,
    ...apiProducts.map((product) => ({
      ...product,
      id: `api-${product.id}`,
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
    })),
  ];

  const filteredProducts = allProducts.filter(matchesCategory);

  const visibleProducts =
    selectedCategory === "All Products" && !showAllProducts
      ? filteredProducts.slice(0, 8)
      : filteredProducts;

  return (
    <section id="shop-products" className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mb-12">
        <div className="w-full text-center">
          <p className="text-3xl font-bold text-primary">
            {selectedCategory === "All Products"
              ? "FEATURED PRODUCTS"
              : selectedCategory.toUpperCase()}
          </p>

          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-0.5 w-12 bg-primary"></div>
            <IoPaw className="text-xl text-primary" />
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-pink-100 bg-white p-10 text-center shadow-sm">
          <p className="text-2xl font-bold text-heading">No products found</p>
          <p className="mt-2 font-semibold text-text">
            Products for this category will appear here when they are added.
          </p>
        </div>
      )}

      {selectedCategory === "All Products" && filteredProducts.length > 8 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="mt-6 whitespace-nowrap rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            {showAllProducts ? "Show Less" : "View All Products"}
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
