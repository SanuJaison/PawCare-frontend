import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Navbar from "../components/Navbar";
import UserSidebar from "../user/components/UserSidebar";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50 pt-[72px] sm:pt-20 lg:flex-row">
        <UserSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="min-w-0 flex-1">
          <div className="sticky top-[72px] z-30 border-b border-gray-100 bg-white px-4 py-3 shadow-sm sm:top-20 sm:px-6 lg:hidden">
            <button
              type="button"
              onClick={openSidebar}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-heading shadow-sm transition hover:bg-gray-50"
            >
              <IoMenu className="text-2xl" />
              Dashboard Menu
            </button>
          </div>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
