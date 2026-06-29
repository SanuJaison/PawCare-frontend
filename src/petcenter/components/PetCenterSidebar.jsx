// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound, LuDog } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { TbReportSearch } from "react-icons/tb";
import { LuCalendar } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";

const PetCenterSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "MANAGEMENT",
      items: [
        {
          name: "Dashboard",
          path: "/petcenter-dashboard",
          icon: <RxDashboard />,
        },
        {
          name: "Users",
          path: "/petcenter/users",
          icon: <LuUsersRound />,
        },
        {
          name: "Pets",
          path: "/petcenter/pets",
          icon: <LuDog />,
        },
        {
          name: "Appointments",
          path: "/petcenter/appointments",
          icon: <LuCalendar />,
        },
        {
          name: "Products",
          path: "/petcenter/products",
          icon: <HiOutlineShoppingBag />,
        },
        {
          name: "Orders",
          path: "/petcenter/orders",
          icon: <IoCartOutline />,
        },
      ],
    },
    {
      title: "ADOPTIONS",
      items: [
        {
          name: "Adoption Requests",
          path: "/petcenter/adoptions",
          icon: <GoHeart />,
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        {
          name: "Reports",
          path: "/petcenter/reports",
          icon: <TbReportSearch />,
        },
        {
          name: "Settings",
          path: "/petcenter/settings",
          icon: <IoSettingsOutline />,
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-72 h-screen bg-[#0D1726] text-white flex flex-col justify-between px-5 py-6 shadow-xl">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <IoPaw className="text-primary text-5xl" />

          <div>
            <p className="text-4xl font-bold leading-none">
              <span className="text-primary">Paw</span>Care
            </p>

            <p className="text-sm text-gray-300 font-medium mt-1">
              Pet Care Center
            </p>
          </div>
        </div>

        {menuItems.map((section) => (
          <div key={section.title} className="mb-3">
            <p className="text-xs text-gray-400 font-semibold tracking-wider mb-4">
              {section.title}
            </p>

            <div className="space-y-2">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white font-semibold shadow-md"
                        : "text-gray-200 hover:bg-white/10"
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>

                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3 border border-primary rounded-xl py-3 text-primary font-semibold hover:bg-primary hover:text-white transition"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </div>
  );
};

export default PetCenterSidebar;
