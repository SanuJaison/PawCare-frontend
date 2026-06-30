import { NavLink, useNavigate } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoCartOutline, IoClose, IoPaw, IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { LuCalendar, LuDog, LuUsersRound } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { TbReportSearch } from "react-icons/tb";

const PetCenterSidebar = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "MANAGEMENT",
      items: [
        { name: "Dashboard", path: "/petcenter-dashboard", icon: <RxDashboard /> },
        { name: "Users", path: "/petcenter/users", icon: <LuUsersRound /> },
        { name: "Pets", path: "/petcenter/pets", icon: <LuDog /> },
        { name: "Appointments", path: "/petcenter/appointments", icon: <LuCalendar /> },
        { name: "Products", path: "/petcenter/products", icon: <HiOutlineShoppingBag /> },
        { name: "Orders", path: "/petcenter/orders", icon: <IoCartOutline /> },
      ],
    },
    {
      title: "ADOPTIONS",
      items: [
        { name: "Adoption Requests", path: "/petcenter/adoptions", icon: <GoHeart /> },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Reports", path: "/petcenter/reports", icon: <TbReportSearch /> },
        { name: "Settings", path: "/petcenter/settings", icon: <IoSettingsOutline /> },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
    window.location.reload();
  };

  const handleNavigate = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close admin menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-72 max-w-[86vw] flex-col gap-4 bg-[#0D1726] px-4 py-4 text-white shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:h-screen lg:w-72 lg:max-w-none lg:translate-x-0 lg:justify-between lg:px-5 lg:py-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-none lg:overflow-visible lg:pr-0">
          <div className="mb-5 flex items-center justify-between gap-3 lg:mb-8">
            <div className="flex min-w-0 items-center gap-3">
              <IoPaw className="shrink-0 text-4xl text-primary lg:text-5xl" />

              <div className="min-w-0">
                <p className="text-3xl font-bold leading-none lg:text-4xl">
                  <span className="text-primary">Paw</span>Care
                </p>

                <p className="mt-1 text-sm font-medium text-gray-300">
                  Pet Care Center
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-white/20 lg:hidden"
            >
              <IoClose />
            </button>
          </div>

          <div className="space-y-5">
            {menuItems.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400">
                  {section.title}
                </p>

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavigate}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 lg:gap-4 ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-200 hover:bg-white/10"
                        }`
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex shrink-0 items-center justify-center gap-3 rounded-xl border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white lg:px-0"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default PetCenterSidebar;
