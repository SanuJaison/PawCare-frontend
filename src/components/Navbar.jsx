import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import { IoCartOutline, IoPaw } from "react-icons/io5";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")),
  );
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Adoption", path: "/adoption" },
    { name: "Pet Shop", path: "/pet-shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce(
        (total, item) => total + (item.quantity || 0),
        0,
      );

      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdown("");
  };

  const renderAvatar = (sizeClass = "w-11 h-11") => {
    if (currentUser?.profilePic) {
      return (
        <img
          src={currentUser.profilePic}
          alt="Profile"
          className={`${sizeClass} rounded-full object-cover border-2 border-primary`}
        />
      );
    }

    return (
      <div
        className={`${sizeClass} rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg border-2 border-primary`}
      >
        {currentUser?.fullName?.charAt(0).toUpperCase()}
      </div>
    );
  };

  const desktopDropdownClass =
    "absolute top-full right-0 w-44 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden";

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/85 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
        <div className="flex h-[72px] items-center justify-between gap-4 px-4 py-3 sm:h-20 sm:px-6 lg:px-10">
          <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2">
            <IoPaw className="text-primary text-4xl sm:text-5xl" />

            <div>
              <p className="text-2xl font-bold leading-tight sm:text-3xl">
                <span className="text-primary">Paw</span>Care
              </p>
              <p className="text-xs font-semibold">Pet Care Center</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 font-semibold xl:gap-8 lg:flex">
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
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {currentUser ? (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative border border-gray-200 p-3 rounded-xl shadow hover:bg-gray-50 transition"
                  aria-label="Open cart"
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
                  aria-label="Open user dashboard"
                >
                  {renderAvatar()}
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

                  <div className={desktopDropdownClass}>
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

                  <div className={desktopDropdownClass}>
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

          <div className="flex items-center gap-2 lg:hidden">
            {currentUser && (
              <>
                <button
                  onClick={() => {
                    closeMenu();
                    navigate("/cart");
                  }}
                  className="relative border border-gray-200 p-2.5 rounded-xl shadow hover:bg-gray-50 transition"
                  aria-label="Open cart"
                >
                  <IoCartOutline className="text-xl text-heading" />

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    closeMenu();
                    navigate("/user-dashboard");
                  }}
                  aria-label="Open user dashboard"
                >
                  {renderAvatar("w-10 h-10")}
                </button>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 shadow"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
          />

          <aside className="absolute right-0 top-0 flex h-dvh w-[min(22rem,calc(100vw-1.5rem))] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <IoPaw className="text-primary text-4xl" />
                <p className="text-2xl font-bold">
                  <span className="text-primary">Paw</span>Care
                </p>
              </div>

              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <nav className="grid gap-2 font-semibold">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 ${
                        isActive
                          ? "bg-pink-card text-primary"
                          : "text-heading hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {!currentUser ? (
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <button
                      onClick={() =>
                        setMobileDropdown((value) =>
                          value === "user" ? "" : "user",
                        )
                      }
                      className="flex w-full items-center justify-between px-4 py-3 font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <UserRound size={18} /> User
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition ${
                          mobileDropdown === "user" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileDropdown === "user" && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        <NavLink
                          to="/user/login"
                          onClick={closeMenu}
                          className="block px-4 py-3 font-semibold"
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/user/register"
                          onClick={closeMenu}
                          className="block border-t border-gray-100 px-4 py-3 font-semibold"
                        >
                          Register
                        </NavLink>
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-xl border border-primary">
                    <button
                      onClick={() =>
                        setMobileDropdown((value) =>
                          value === "admin" ? "" : "admin",
                        )
                      }
                      className="flex w-full items-center justify-between bg-primary px-4 py-3 font-semibold text-white"
                    >
                      <span className="flex items-center gap-2">
                        <MdOutlinePowerSettingsNew size={20} /> Admin
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition ${
                          mobileDropdown === "admin" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileDropdown === "admin" && (
                      <div className="border-t border-pink-200 bg-white">
                        <NavLink
                          to="/petcenter/login"
                          onClick={closeMenu}
                          className="block px-4 py-3 font-semibold text-heading"
                        >
                          Login
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    closeMenu();
                    navigate("/user-dashboard");
                  }}
                  className="mt-5 flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold"
                >
                  {renderAvatar("w-10 h-10")}
                  Dashboard
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
