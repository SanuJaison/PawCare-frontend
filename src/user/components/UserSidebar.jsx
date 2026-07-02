import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCamera, FaRegHeart, FaRegUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { RiHandHeartFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { updateUserAPI } from "../../services/allAPI";

const UserSidebar = ({ isOpen = false, onClose }) => {
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

  const handleNavigate = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close dashboard menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-80 max-w-[86vw] flex-col justify-between border-r border-gray-100 bg-white px-4 py-4 shadow-2xl transition-transform duration-300 lg:sticky lg:top-20 lg:z-auto lg:h-[calc(100vh-80px)] lg:w-75 lg:max-w-none lg:translate-x-0 lg:px-5 lg:py-5 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="min-h-0 min-w-0 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pr-0">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-xl font-bold text-heading">Dashboard Menu</p>
              <p className="text-sm font-semibold text-text">Manage your account</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-2xl transition hover:bg-gray-50"
            >
              <IoClose />
            </button>
          </div>

          <div className="rounded-3xl border border-pink-50 bg-white p-6 text-center shadow-md">
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

          <div className="mt-6 flex flex-col gap-3 lg:mt-10">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition lg:gap-4 ${
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

        <div className="mt-4 border-t border-gray-100 pl-4 pt-4">
          <button
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-3 rounded-xl py-3 text-sm font-semibold text-red-500 transition hover:text-red-600 lg:py-0"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
