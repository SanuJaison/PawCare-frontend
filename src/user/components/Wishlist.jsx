import { useEffect, useState } from "react";
import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { IoCartOutline, IoPawOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = () => {
    setWishlistItems(JSON.parse(localStorage.getItem("wishlist")) || []);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);

    return () => window.removeEventListener("wishlistUpdated", loadWishlist);
  }, []);

  const getItemType = (item) => {
    if (item.itemType) return item.itemType;
    if (item.type && item.breed && item.age && item.gender) return "pet";
    return "product";
  };

  const products = wishlistItems.filter((item) => getItemType(item) === "product");
  const pets = wishlistItems.filter((item) => getItemType(item) === "pet");

  const saveWishlist = (items) => {
    setWishlistItems(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeFromWishlist = (item) => {
    const removeKey = item.wishlistId || item.id;
    saveWishlist(
      wishlistItems.filter(
        (wishlistItem) => (wishlistItem.wishlistId || wishlistItem.id) !== removeKey,
      ),
    );
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} added to cart 🛒`);
  };

  const summaryCards = [
    {
      title: "Total Saved",
      value: wishlistItems.length,
      icon: <FaRegHeart />,
      bg: "bg-pink-card",
      text: "text-primary",
    },
    {
      title: "Products",
      value: products.length,
      icon: <HiOutlineShoppingBag />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pets",
      value: pets.length,
      icon: <IoPawOutline />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-3xl font-bold text-heading">My Wishlist</p>
          <p className="text-text font-semibold mt-2">
            Save favorite products and pets in one place.
          </p>
        </div>

        <Link
          to="/pet-shop"
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
        >
          Browse Products
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-full ${card.bg} ${card.text} flex items-center justify-center text-3xl`}
            >
              {card.icon}
            </div>

            <div>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-text text-sm font-semibold">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-pink-card text-primary flex items-center justify-center mx-auto text-4xl">
            <FaRegHeart />
          </div>

          <p className="text-3xl font-bold mt-5">Your Wishlist is Empty</p>
          <p className="text-text font-semibold mt-3">
            Tap the heart on a product or pet to save it here.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/pet-shop"
              className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
            >
              Browse Products
            </Link>

            <Link
              to="/adoption"
              className="border border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-pink-card transition"
            >
              Browse Pets
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const itemType = getItemType(item);
            const isPet = itemType === "pet";

            return (
              <div
                key={item.wishlistId || item.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-pink-bg h-56 flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full ${isPet ? "object-cover object-top p-0" : "object-contain p-6"}`}
                  />

                  <span className="absolute top-3 left-3 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {isPet ? "Pet" : "Product"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-bold text-heading truncate">
                        {item.name}
                      </p>
                      <p className="text-text text-sm font-semibold mt-1">
                        {isPet
                          ? `${item.breed} • ${item.age} • ${item.gender}`
                          : item.description}
                      </p>
                    </div>

                    {!isPet && (
                      <p className="text-primary text-xl font-bold whitespace-nowrap">
                        {item.price}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-5">
                    {isPet ? (
                      <Link
                        to="/adoption"
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
                      >
                        <IoPawOutline className="text-xl" />
                        Adopt Pet
                      </Link>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
                      >
                        <IoCartOutline className="text-xl" />
                        Add to Cart
                      </button>
                    )}

                    <button
                      onClick={() => removeFromWishlist(item)}
                      className="w-12 h-12 rounded-xl border border-gray-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
