// import React from 'react'
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { IoPaw } from "react-icons/io5";
import { IoMdFemale, IoMdHeart, IoMdMale } from "react-icons/io";
import { RiHeart3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdoptionPetCard = ({ pet, onAdopt }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const wishlistId = `pet-${pet.id}`;

  const badgeColors = {
    Dog: "bg-primary",
    Cat: "bg-purple-500",
    Rabbit: "bg-green-500",
    Hamster: "bg-yellow-500",
    Bird: "bg-blue-500",
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.wishlistId === wishlistId));
  }, [wishlistId]);

  const handleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please login to save pets");
      navigate("/user/login");
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadySaved = wishlist.some((item) => item.wishlistId === wishlistId);

    const updatedWishlist = alreadySaved
      ? wishlist.filter((item) => item.wishlistId !== wishlistId)
      : [
          ...wishlist,
          {
            ...pet,
            wishlistId,
            itemType: "pet",
          },
        ];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!alreadySaved);
    window.dispatchEvent(new Event("wishlistUpdated"));

    alert(
      alreadySaved
        ? `${pet.name} removed from wishlist`
        : `${pet.name} added to wishlist`,
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
      <div className="relative">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-52 object-cover object-top"
        />

        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeColors[pet.type]}`}
        >
          {pet.type}s
        </span>

        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow text-lg duration-300 ${
            isWishlisted ? "text-primary" : "hover:bg-primary hover:text-white"
          }`}
        >
          {isWishlisted ? <IoMdHeart /> : <RiHeart3Line />}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-heading">{pet.name}</h3>

        <div className="flex items-center gap-4 mt-3 font-semibold text-text flex-wrap">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 text-primary" />
            {pet.age}
          </span>

          <span className="flex items-center gap-1">
            {pet.gender === "Male" ? (
              <IoMdMale className="text-primary" />
            ) : (
              <IoMdFemale className="text-primary" />
            )}
            {pet.gender}
          </span>

          <span className="flex items-center gap-1">
            <IoPaw className="text-primary" />
            {pet.breed}
          </span>
        </div>

        <button
          onClick={() => onAdopt(pet)}
          className="w-full mt-4 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
        >
          Adopt Me
        </button>
      </div>
    </div>
  );
};

export default AdoptionPetCard;
