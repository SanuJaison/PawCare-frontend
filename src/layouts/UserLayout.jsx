// import React from 'react'

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserSidebar from "../user/components/UserSidebar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <UserSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
