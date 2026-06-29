// import React from 'react'
import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productId = product.id || product.name;
  const wishlistId = `product-${productId}`;

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(
      wishlist.some(
        (item) =>
          item.wishlistId === wishlistId ||
          (!item.itemType && item.id === productId),
      ),
    );
  }, [productId, wishlistId]);

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please login to buy products");
      navigate("/user/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        id: productId,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart 🛒`);
  };

  const handleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please login to save wishlist items");
      navigate("/user/login");
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadySaved = wishlist.some(
      (item) =>
        item.wishlistId === wishlistId || (!item.itemType && item.id === productId),
    );

    const updatedWishlist = alreadySaved
      ? wishlist.filter(
          (item) =>
            item.wishlistId !== wishlistId &&
            !(item.itemType === undefined && item.id === productId),
        )
      : [
          ...wishlist,
          {
            ...product,
            id: productId,
            wishlistId,
            itemType: "product",
          },
        ];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!alreadySaved);
    window.dispatchEvent(new Event("wishlistUpdated"));

    alert(
      alreadySaved
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative bg-pink-bg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-contain p-6"
        />

        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full ${
            product.badge === "Best Seller" ? "bg-primary" : "bg-purple-500"
          }`}
        >
          {product.badge}
        </span>

        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow transition ${
            isWishlisted ? "text-primary" : "hover:bg-primary hover:text-white"
          }`}
        >
          {isWishlisted ? <IoMdHeart /> : <IoMdHeartEmpty />}
        </button>
      </div>

      <div className="p-4">
        <p className="font-bold text-heading">{product.name}</p>

        <p className="text-sm text-text">{product.description}</p>

        <p className="text-primary font-bold text-xl mt-3">{product.price}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-text font-medium">
            ⭐ {product.rating} ({product.reviews})
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition"
          >
            <IoCartOutline />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
