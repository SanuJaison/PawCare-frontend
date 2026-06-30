import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCamera, FaRegHeart, FaRegUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuCalendar } from "react-icons/lu";
import { RiHandHeartFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
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
    { name: "Dashboard", path: "/user-dashboard", icon: <RxDashboard /> },
    { name: "My Profile", path: "/profile", icon: <FaRegUser /> },
    { name: "Appointments", path: "/appointments", icon: <LuCalendar /> },
    { name: "Orders", path: "/orders", icon: <HiOutlineShoppingBag /> },
    { name: "Adoptions", path: "/adoptions", icon: <RiHandHeartFill /> },
    { name: "Wishlist", path: "/wishlist", icon: <FaRegHeart /> },
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
    <aside className="w-full border-b border-gray-100 bg-white px-4 py-4 shadow-lg lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-80px)] lg:w-75 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
      <div className="min-w-0">
        <div className="hidden rounded-3xl border border-pink-50 bg-white p-6 text-center shadow-md lg:block">
          <div className="relative mx-auto w-fit">
            {currentUser.profilePic ? (
              <img
                src={currentUser.profilePic}
                alt=""
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
                {currentUser.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-pink-card text-primary">
              <FaCamera />
            </button>
          </div>

          <p className="mt-3 text-xl font-bold">{currentUser.fullName}</p>

          <p className="mt-1 truncate text-sm font-semibold text-text">
            {currentUser.email}
          </p>

          <p className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-text">
            <FaPhone className="text-primary" />
            {currentUser.phone}
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:mt-10 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition lg:gap-4 ${
                  isActive
                    ? "bg-pink-card text-primary"
                    : "text-text hover:bg-gray-50"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-3 border-gray-100 lg:border-t lg:pl-4 lg:pt-4">
        <button
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 lg:px-0 lg:py-0 lg:hover:bg-transparent"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
