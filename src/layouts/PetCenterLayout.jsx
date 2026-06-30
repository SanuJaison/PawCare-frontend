import { useState } from "react";
import { Outlet } from "react-router-dom";
import PetCenterNavbar from "../petcenter/components/PetCenterNavbar";
import PetCenterSidebar from "../petcenter/components/PetCenterSidebar";

const PetCenterLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50 lg:h-screen">
      <PetCenterSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-gray-50">
        <PetCenterNavbar onMenuClick={openSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PetCenterLayout;
