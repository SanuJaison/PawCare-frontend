import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
