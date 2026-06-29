// import React from "react";
import { useEffect, useState } from "react";
import { LuCalendar, LuDog, LuClock3 } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  getAppointmentsAPI,
  getAllOrdersAPI,
  getAllAdoptionRequestsAPI,
} from "../services/allAPI";

const UserDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const loadDashboardData = async () => {
    const appointmentResult = await getAppointmentsAPI();
    const orderResult = await getAllOrdersAPI();
    const adoptionResult = await getAllAdoptionRequestsAPI();

    if (appointmentResult.status >= 200 && appointmentResult.status < 300) {
      const userAppointments = appointmentResult.data
        .filter((item) => item.userId === currentUser?.id)
        .reverse();

      setAppointments(userAppointments);
    }

    if (orderResult.status >= 200 && orderResult.status < 300) {
      const userOrders = orderResult.data
        .filter((item) => item.userId === currentUser?.id)
        .reverse();

      setOrders(userOrders);
    }

    if (adoptionResult.status >= 200 && adoptionResult.status < 300) {
      const userAdoptions = adoptionResult.data
        .filter((item) => item.userId === currentUser?.id)
        .reverse();

      setAdoptions(userAdoptions);
    }

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  };

  useEffect(() => {
    loadDashboardData();

    const handleWishlistUpdate = () => {
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const upcomingAppointments = appointments.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "Upcoming" ||
      item.status === "Confirmed",
  );

  const recentOrders = orders.slice(0, 3);

  const adoptedPets = adoptions.filter((item) => item.status === "Approved");

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
      <div>
        <p className="text-3xl font-bold text-heading">
          Welcome back,{" "}
          <span className="text-primary">
            {currentUser.fullName || "User"}!
          </span>{" "}
          👋
        </p>

        <p className="text-text font-semibold mt-2">
          Here's what's happening with your pet care journey.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
              <LuCalendar className="text-primary text-3xl" />
            </div>

            <div>
              <p className="text-3xl font-bold">{appointments.length}</p>
              <p className="text-text font-semibold">Appointments</p>
            </div>
          </div>

          <Link
            to="/appointments"
            className="block text-primary font-semibold text-sm mt-6 text-center"
          >
            Upcoming
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <LuDog className="text-blue-600 text-3xl" />
            </div>

            <div>
              <p className="text-3xl font-bold">{adoptedPets.length}</p>
              <p className="text-text font-semibold">Adopted Pets</p>
            </div>
          </div>

          <Link
            to="/adoptions"
            className="block text-blue-600 font-semibold text-sm mt-6 text-center"
          >
            View Details
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <HiOutlineShoppingBag className="text-green-600 text-3xl" />
            </div>

            <div>
              <p className="text-3xl font-bold">{orders.length}</p>
              <p className="text-text font-semibold">Orders</p>
            </div>
          </div>

          <Link
            to="/orders"
            className="block text-green-600 font-semibold text-sm mt-6 text-center"
          >
            View Orders
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <FaRegHeart className="text-purple-600 text-3xl" />
            </div>

            <div>
              <p className="text-3xl font-bold">{wishlist.length}</p>
              <p className="text-text font-semibold">Wishlist Items</p>
            </div>
          </div>

          <Link
            to="/wishlist"
            className="block text-purple-600 font-semibold text-sm mt-6 text-center"
          >
            View Wishlist
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <p className="text-xl font-bold">Upcoming Appointments</p>

            <Link
              to="/appointments"
              className="text-primary font-semibold text-sm"
            >
              View All
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="w-16 h-16 rounded-xl bg-pink-card overflow-hidden flex items-center justify-center flex-shrink-0">
                    {item.petData?.photo ? (
                      <img
                        src={item.petData.photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.icon}
                        alt=""
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg truncate">
                      {item.petData?.petName || "Pet"} - {item.subService}
                    </p>

                    <p className="text-text font-semibold text-sm">
                      {item.service}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-primary font-bold">{item.date}</p>

                    <p className="flex items-center gap-1 text-text font-semibold text-sm mt-2">
                      <LuClock3 />
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-center pt-2">
                <Link
                  to="/appointments"
                  className="bg-pink-card text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition"
                >
                  Book New Appointment
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt=""
                className="w-20 mx-auto mb-3"
              />

              <p className="text-lg font-semibold">No Appointments Found</p>

              <p className="text-text text-sm mt-1">
                Book an appointment for your pet.
              </p>

              <Link to="/appointments">
                <button className="mt-4 bg-primary text-white px-5 py-2 rounded-xl font-semibold text-sm">
                  Book Now
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <p className="text-xl font-bold">Recent Orders</p>

            <Link to="/orders" className="text-primary font-semibold text-sm">
              View All
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const firstItem = order.items?.[0];

                return (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="w-16 h-16 rounded-xl bg-pink-bg overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img
                        src={firstItem?.image}
                        alt=""
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg truncate">
                        {firstItem?.name}
                        {order.items?.length > 1 &&
                          ` + ${order.items.length - 1} more`}
                      </p>

                      <p className="text-text font-semibold text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">₹{order.grandTotal}</p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Out for Delivery"
                              ? "bg-blue-100 text-blue-600"
                              : order.status === "Confirmed"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center pt-2">
                <Link
                  to="/pet-shop"
                  className="bg-pink-card text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                alt=""
                className="w-20 mx-auto mb-3"
              />

              <p className="text-lg font-semibold">No Orders Found</p>

              <p className="text-text text-sm mt-1">
                Start shopping for your pets.
              </p>

              <Link to="/pet-shop">
                <button className="mt-4 bg-primary text-white px-5 py-2 rounded-xl font-semibold text-sm">
                  Shop Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
        <div className="flex justify-between items-center mb-5">
          <p className="text-xl font-bold">Recently Adopted Pets</p>

          <Link to="/adoptions" className="text-primary font-semibold text-sm">
            View All
          </Link>
        </div>

        {adoptedPets.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {adoptedPets.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border border-gray-100 rounded-2xl p-4"
              >
                <img
                  src={item.petData?.image}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover object-top flex-shrink-0"
                />

                <div className="flex-1">
                  <p className="text-xl font-bold">{item.petData?.name}</p>

                  <p className="text-text font-semibold">
                    {item.petData?.breed}
                  </p>

                  <p className="text-sm text-text mt-1">
                    Approved on {formatDate(item.updatedAt || item.createdAt)}
                  </p>
                </div>

                <Link
                  to="/adoptions"
                  className="bg-pink-card text-primary px-5 py-2 rounded-xl font-semibold hover:bg-primary hover:text-white transition flex items-center gap-2"
                >
                  <IoPaw />
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt=""
              className="w-20 mx-auto mb-3"
            />

            <p className="text-lg font-semibold">No Adopted Pets Yet</p>

            <p className="text-text text-sm mt-1">
              Give a loving home to a pet today.
            </p>

            <Link to="/adoption">
              <button className="mt-4 bg-primary text-white px-5 py-2 rounded-xl font-semibold text-sm">
                Adopt Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;


