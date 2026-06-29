import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./public/Home";
import Services from "./public/Services";
import About from "./public/About";
import Adoption from "./public/Adoption";
import PetShop from "./public/PetShop";
import Contact from "./public/Contact";
import UserLogin from "./user/UserLogin";
import UserRegister from "./user/UserRegister";
import PetCenterLogin from "./petcenter/PetCenterLogin";
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./user/UserDashboard";
import UserProfile from "./user/components/UserProfile";
import MyAppointments from "./user/components/MyAppointments";
import MyOrders from "./user/components/MyOrders";
import Cart from "./user/components/Cart";
import PetCenterLayout from "./layouts/PetCenterLayout";
import PetCenterDashboard from "./petcenter/PetCenterDashboard";
import PetCenterUsers from "./petcenter/components/PetCenterUsers";
import PetCenterPets from "./petcenter/components/PetCenterPets";
import PetCenterAppointments from "./petcenter/components/PetCenterAppointments";
import PetCenterProducts from "./petcenter/components/PetCenterProducts";
import Checkout from "./user/components/Checkout";
import PetCenterOrders from "./petcenter/components/PetCenterOrders";
import MyAdoptions from "./user/components/MyAdoptions";
import Wishlist from "./user/components/Wishlist";
import PetCenterAdoptionRequests from "./petcenter/components/PetCenterAdoptionRequests";
import SimpleInfoPage from "./components/SimpleInfoPage";
import ScrollToTop from "./components/ScrollToTop";
import { getAllUsersAPI } from "./services/allAPI";

const UserProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return currentUser ? children : <Navigate to="/user/login" replace />;
};

const PetCenterProtectedRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return admin ? children : <Navigate to="/petcenter/login" replace />;
};

const AuthSync = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const getStoredUser = () => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        localStorage.removeItem("user");
        return null;
      }
    };

    const logoutDeletedUser = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
      window.dispatchEvent(new Event("userUpdated"));

      const userOnlyPaths = [
        "/user-dashboard",
        "/profile",
        "/appointments",
        "/orders",
        "/adoptions",
        "/wishlist",
        "/checkout",
      ];

      if (userOnlyPaths.some((path) => location.pathname.startsWith(path))) {
        alert(
          "Your account was removed by the admin. Please contact PawCare support for help.",
        );
        navigate("/user/login", { replace: true });
      }
    };

    const validateUser = async () => {
      const storedUser = getStoredUser();

      if (!storedUser?.id) return;

      const result = await getAllUsersAPI();

      if (
        !isMounted ||
        result.status < 200 ||
        result.status >= 300 ||
        !Array.isArray(result.data)
      ) {
        return;
      }

      const serverUser = result.data.find(
        (user) => user.id?.toString() === storedUser.id?.toString(),
      );

      if (!serverUser || serverUser.isDeleted || serverUser.deletedByAdmin) {
        logoutDeletedUser();
      }
    };

    validateUser();

    return () => {
      isMounted = false;
    };
  }, [location.pathname, navigate]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthSync />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/pet-shop" element={<PetShop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <SimpleInfoPage
                title="Forgot Password"
                subtitle="Contact PawCare support to recover your account."
                description="For this demo system, password recovery is handled by the PawCare team. Send us your registered email and we will help you regain access."
                actionLabel="Contact Support"
                actionPath="/contact"
              />
            }
          />
        </Route>

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/petcenter/login" element={<PetCenterLogin />} />

        <Route
          element={
            <UserProtectedRoute>
              <UserLayout />
            </UserProtectedRoute>
          }
        >
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/adoptions" element={<MyAdoptions />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        <Route
          element={
            <PetCenterProtectedRoute>
              <PetCenterLayout />
            </PetCenterProtectedRoute>
          }
        >
          <Route path="/petcenter-dashboard" element={<PetCenterDashboard />} />
          <Route path="/petcenter/users" element={<PetCenterUsers />} />
          <Route path="/petcenter/pets" element={<PetCenterPets />} />
          <Route path="/petcenter/appointments" element={<PetCenterAppointments />} />
          <Route path="/petcenter/products" element={<PetCenterProducts />} />
          <Route path="/petcenter/orders" element={<PetCenterOrders />} />
          <Route path="/petcenter/adoptions" element={<PetCenterAdoptionRequests />} />
          <Route
            path="/petcenter/reports"
            element={
              <SimpleInfoPage
                title="Reports"
                subtitle="Your admin reports will live here."
                description="Use the dashboard analytics for now. This page keeps the navigation working until a detailed reports module is added."
                actionLabel="Open Dashboard"
                actionPath="/petcenter-dashboard"
              />
            }
          />
          <Route
            path="/petcenter/settings"
            element={
              <SimpleInfoPage
                title="Settings"
                subtitle="Center settings are not configured yet."
                description="This page keeps the settings navigation active while future admin preferences are added."
                actionLabel="Open Dashboard"
                actionPath="/petcenter-dashboard"
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
