// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiHandHeartFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/allAPI";

const UserSidebar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );

  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")) || {});
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/user-dashboard",
      icon: <RxDashboard />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaRegUser />,
    },
    {
      name: "My Appointments",
      path: "/appointments",
      icon: <LuCalendar />,
    },
    {
      name: "My Orders",
      path: "/orders",
      icon: <HiOutlineShoppingBag />,
    },
    {
      name: "My Adoptions",
      path: "/adoptions",
      icon: <RiHandHeartFill />,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <FaRegHeart />,
    },
  ];

  const handleLogout = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser?.id) {
      await updateUserAPI(currentUser.id, {
        status: "Inactive",
      });
    }

    localStorage.removeItem("user");

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/");
  };

  return (
    <div className="w-75 h-[calc(100vh-80px)] sticky top-20 bg-white border-r border-gray-100 shadow-lg px-5 py-5 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="bg-white rounded-3xl shadow-md border border-pink-50 p-6 text-center">
          <div className="relative w-fit mx-auto">
            {currentUser.profilePic ? (
              <img
                src={currentUser.profilePic}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                {currentUser.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-pink-card text-primary flex items-center justify-center">
              <FaCamera />
            </button>
          </div>

          <p className="text-xl font-bold mt-3">{currentUser.fullName}</p>

          <p className="text-sm text-text font-semibold mt-1 truncate">
            {currentUser.email}
          </p>

          <p className="flex items-center justify-center gap-2 text-sm text-text font-semibold mt-2">
            <FaPhone className="text-primary" />
            {currentUser.phone}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-pink-card text-primary font-semibold text-sm"
                    : "hover:bg-gray-50 text-text font-semibold text-sm"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pl-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-500 text-sm font-semibold hover:text-red-600 transition"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
