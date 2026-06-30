import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserSidebar from "../user/components/UserSidebar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col bg-gray-50 pt-[72px] sm:pt-20 lg:flex-row">
        <UserSidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
