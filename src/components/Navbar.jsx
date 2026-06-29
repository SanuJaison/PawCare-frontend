import { IoPaw } from "react-icons/io5";
import { UserRound, ChevronDown } from "lucide-react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")),
  );

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Adoption", path: "/adoption" },
    { name: "Pet Shop", path: "/pet-shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <div className="flex justify-between items-center backdrop-blur-md border-b border-gray-200 shadow-sm px-10 py-3 sticky top-0 w-full z-50 bg-white/90">
      <div className="flex items-center gap-2">
        <IoPaw className="text-primary text-5xl" />

        <div>
          <p className="text-3xl font-bold">
            <span className="text-primary">Paw</span>Care
          </p>
          <p className="text-xs font-semibold">Pet Care Center</p>
        </div>
      </div>

      <div className="flex items-center gap-8 font-semibold">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-[3px] border-primary py-2 text-primary"
                : "py-2 hover:text-primary transition"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            <button
              onClick={() => navigate("/cart")}
              className="relative border border-gray-200 p-3 rounded-xl shadow hover:bg-gray-50 transition"
            >
              <IoCartOutline className="text-2xl text-heading" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/user-dashboard")}
              className="cursor-pointer"
            >
              {currentUser.profilePic ? (
                <img
                  src={currentUser.profilePic}
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg border-2 border-primary">
                  {currentUser.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          </>
        ) : (
          <>
            <div className="relative group pb-4 -mb-4">
              <button className="flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow hover:bg-gray-50 font-semibold transition">
                <UserRound size={18} />
                User
                <ChevronDown size={18} />
              </button>

              <div className="absolute top-full right-0 w-44 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <NavLink
                  to="/user/login"
                  className="block px-4 py-3 hover:bg-pink-card"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/user/register"
                  className="block px-4 py-3 border-t border-gray-100 hover:bg-pink-card"
                >
                  Register
                </NavLink>
              </div>
            </div>

            <div className="relative group pb-4 -mb-4">
              <button className="flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-xl shadow bg-primary text-white hover:bg-primary-dark font-semibold transition">
                <MdOutlinePowerSettingsNew size={20} />
                Admin
                <ChevronDown size={18} />
              </button>

              <div className="absolute top-full right-0 w-44 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <NavLink
                  to="/petcenter/login"
                  className="block px-4 py-3 hover:bg-pink-card text-heading"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
