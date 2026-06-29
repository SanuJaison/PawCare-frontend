// import React from "react";
import { Outlet } from "react-router-dom";
import PetCenterSidebar from "../petcenter/components/PetCenterSidebar";
import PetCenterNavbar from "../petcenter/components/PetCenterNavbar";

const PetCenterLayout = () => {
  return (
    <div className="flex h-screen">
      <PetCenterSidebar />

      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <PetCenterNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PetCenterLayout;
