// import React from "react";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { LuCalendar, LuDog, LuUsersRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCartOutline, IoPaw } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";

import {
  getAllUsersAPI,
  getAllPetsAPI,
  getAppointmentsAPI,
  getAllProductsAPI,
  getAllOrdersAPI,
  getAllAdoptionRequestsAPI,
} from "../services/allAPI";

const PetCenterDashboard = () => {
  const [dateFilter, setDateFilter] = useState("today");

  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  const today = new Date();

  const formattedToday = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const loadDashboardData = async () => {
    const usersResult = await getAllUsersAPI();
    const petsResult = await getAllPetsAPI();
    const appointmentsResult = await getAppointmentsAPI();
    const productsResult = await getAllProductsAPI();
    const ordersResult = await getAllOrdersAPI();
    const adoptionResult = await getAllAdoptionRequestsAPI();

    if (usersResult.status >= 200 && usersResult.status < 300) {
      setUsers(usersResult.data.filter((user) => !user.isDeleted).reverse());
    }

    if (petsResult.status >= 200 && petsResult.status < 300) {
      setPets(petsResult.data.reverse());
    }

    if (appointmentsResult.status >= 200 && appointmentsResult.status < 300) {
      setAppointments(appointmentsResult.data.reverse());
    }

    if (productsResult.status >= 200 && productsResult.status < 300) {
      setProducts(productsResult.data.reverse());
    }

    if (ordersResult.status >= 200 && ordersResult.status < 300) {
      setOrders(ordersResult.data.reverse());
    }

    if (adoptionResult.status >= 200 && adoptionResult.status < 300) {
      setAdoptionRequests(adoptionResult.data.reverse());
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getDateFilterLabel = () => {
    if (dateFilter === "today") return formattedToday;
    if (dateFilter === "last7days") return "Previous 7 Days";
    if (dateFilter === "thismonth") return "This Month";
    if (dateFilter === "lastmonth") return "Previous Month";

    return formattedToday;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getAppointmentDate = (appointment) => {
    return (
      appointment.createdAt ||
      appointment.scheduleData?.date ||
      appointment.date ||
      new Date().toISOString()
    );
  };

  const isToday = (dateValue) => {
    const date = new Date(dateValue);
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const isThisMonth = (dateValue) => {
    const date = new Date(dateValue);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const isLastMonth = (dateValue) => {
    const date = new Date(dateValue);
    const now = new Date();

    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return (
      date.getMonth() === lastMonth.getMonth() &&
      date.getFullYear() === lastMonth.getFullYear()
    );
  };

  const isLast7Days = (dateValue) => {
    const date = new Date(dateValue);
    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return date >= sevenDaysAgo && date <= now;
  };

  const filterDataByDate = (items, dateGetter = (item) => item.createdAt) => {
    return items.filter((item) => {
      const dateValue = dateGetter(item);

      if (!dateValue) return false;

      if (dateFilter === "today") return isToday(dateValue);
      if (dateFilter === "last7days") return isLast7Days(dateValue);
      if (dateFilter === "thismonth") return isThisMonth(dateValue);
      if (dateFilter === "lastmonth") return isLastMonth(dateValue);

      return true;
    });
  };

  const filteredAppointments = filterDataByDate(
    appointments,
    getAppointmentDate,
  );

  const filteredOrders = filterDataByDate(orders);
  const filteredUsers = filterDataByDate(users);
  const filteredPets = filterDataByDate(pets);
  const filteredProducts = filterDataByDate(products);
  const filteredAdoptions = filterDataByDate(adoptionRequests);

  const generateAppointmentChartData = () => {
    if (dateFilter === "today") {
      const days = ["09 AM", "11 AM", "01 PM", "03 PM", "05 PM", "07 PM"];

      return days.map((time) => {
        const count = appointments.filter((appointment) => {
          const appointmentDate = new Date(getAppointmentDate(appointment));
          const hour = appointmentDate.getHours();

          if (time === "09 AM") return hour <= 9;
          if (time === "11 AM") return hour > 9 && hour <= 11;
          if (time === "01 PM") return hour > 11 && hour <= 13;
          if (time === "03 PM") return hour > 13 && hour <= 15;
          if (time === "05 PM") return hour > 15 && hour <= 17;
          if (time === "07 PM") return hour > 17;

          return false;
        }).length;

        return {
          date: time,
          appointments: count,
        };
      });
    }

    if (dateFilter === "last7days") {
      return Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));

        const count = appointments.filter((appointment) => {
          const appointmentDate = new Date(getAppointmentDate(appointment));

          return (
            appointmentDate.getDate() === date.getDate() &&
            appointmentDate.getMonth() === date.getMonth() &&
            appointmentDate.getFullYear() === date.getFullYear()
          );
        }).length;

        return {
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          appointments: count,
        };
      });
    }

    const now = new Date();

    const targetMonth =
      dateFilter === "lastmonth"
        ? new Date(now.getFullYear(), now.getMonth() - 1, 1)
        : new Date(now.getFullYear(), now.getMonth(), 1);

    return [1, 5, 10, 15, 20, 25, 30].map((day) => {
      const count = appointments.filter((appointment) => {
        const appointmentDate = new Date(getAppointmentDate(appointment));

        return (
          appointmentDate.getMonth() === targetMonth.getMonth() &&
          appointmentDate.getFullYear() === targetMonth.getFullYear() &&
          appointmentDate.getDate() <= day
        );
      }).length;

      return {
        date: `${targetMonth.toLocaleDateString("en-US", {
          month: "short",
        })} ${day}`,
        appointments: count,
      };
    });
  };

  const appointmentChartData = generateAppointmentChartData();

  const pendingAdoptions = adoptionRequests.filter(
    (request) => request.status === "Pending",
  ).length;

  const approvedAdoptions = adoptionRequests.filter(
    (request) => request.status === "Approved",
  ).length;

  const rejectedAdoptions = adoptionRequests.filter(
    (request) => request.status === "Rejected",
  ).length;

  const cancelledAdoptions = adoptionRequests.filter(
    (request) => request.status === "Cancelled",
  ).length;

  const adoptionChartData = [
    { name: "Pending", value: pendingAdoptions },
    { name: "Approved", value: approvedAdoptions },
    { name: "Rejected", value: rejectedAdoptions },
    { name: "Cancelled", value: cancelledAdoptions },
  ];

  const doughnutColors = ["#ec4899", "#22c55e", "#f59e0b", "#3b82f6"];

  const totalAdoptionRequests = adoptionChartData.reduce(
    (total, item) => total + item.value,
    0,
  );

  const recentUsers = users.slice(0, 5);
  const recentAppointments = appointments.slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  const topSellingProducts = Object.values(
    orders.reduce((acc, order) => {
      order.items?.forEach((item) => {
        const productKey = item.name;

        if (!acc[productKey]) {
          acc[productKey] = {
            name: item.name,
            image: item.image,
            sold: 0,
            revenue: 0,
          };
        }

        const quantity = item.quantity || 1;
        const price = Number(item.price?.replace(/[₹,]/g, "")) || 0;

        acc[productKey].sold += quantity;
        acc[productKey].revenue += price * quantity;
      });

      return acc;
    }, {}),
  )
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const getStatusStyle = (status) => {
    if (
      status === "Delivered" ||
      status === "Approved" ||
      status === "Confirmed"
    ) {
      return "bg-green-100 text-green-600";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-100 text-blue-600";
    }

    if (status === "Pending" || status === "Placed") {
      return "bg-yellow-100 text-yellow-600";
    }

    if (status === "Rejected" || status === "Cancelled") {
      return "bg-red-100 text-red-500";
    }

    return "bg-gray-100 text-gray-600";
  };

  const dataCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: <LuUsersRound />,
      bg: "bg-pink-card",
      text: "text-primary",
      subText: `${filteredUsers.length} in selected period`,
    },
    {
      title: "Total Pets",
      value: pets.length,
      icon: <LuDog />,
      bg: "bg-blue-100",
      text: "text-blue-600",
      subText: `${filteredPets.length} in selected period`,
    },
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: <LuCalendar />,
      bg: "bg-green-100",
      text: "text-green-600",
      subText: `${filteredAppointments.length} in selected period`,
    },
    {
      title: "Total Products",
      value: products.length,
      icon: <HiOutlineShoppingBag />,
      bg: "bg-purple-100",
      text: "text-purple-600",
      subText: `${filteredProducts.length} in selected period`,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <IoCartOutline />,
      bg: "bg-orange-100",
      text: "text-orange-600",
      subText: `${filteredOrders.length} in selected period`,
    },
    {
      title: "Pending Adoptions",
      value: pendingAdoptions,
      icon: <IoPaw />,
      bg: "bg-pink-card",
      text: "text-primary",
      subText: `${filteredAdoptions.length} requests in selected period`,
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      <style>
        {`
          .recharts-wrapper:focus,
          .recharts-surface:focus,
          .recharts-sector:focus {
            outline: none !important;
          }
        `}
      </style>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-heading">
            Welcome back, <span className="text-primary">Admin!</span> 👋
          </p>

          <p className="text-text font-semibold mt-2">
            Here's what's happening in your pet care center today.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
          <LuCalendar className="text-primary text-lg" />

          <p className="text-sm font-semibold whitespace-nowrap">
            {getDateFilterLabel()}
          </p>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="outline-none text-sm font-semibold bg-white"
          >
            <option value="today">Today</option>
            <option value="last7days">Previous 7 Days</option>
            <option value="thismonth">This Month</option>
            <option value="lastmonth">Previous Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-6">
        {dataCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-full ${card.bg} ${card.text} flex items-center justify-center text-3xl flex-shrink-0`}
              >
                {card.icon}
              </div>

              <div className="min-w-0">
                <p className="text-sm text-text font-semibold truncate">
                  {card.title}
                </p>

                <p className="text-2xl font-bold mt-1">{card.value}</p>

                <p className="text-xs text-green-600 font-semibold mt-1 truncate">
                  {card.subText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5 mt-6">
        <div className="col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[430px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Appointments Overview</p>

            <button className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold">
              {getDateFilterLabel()}
            </button>
          </div>

          <div className="h-[330px] outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={false} />

                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ec4899", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#ec4899", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[430px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Recent Appointments</p>

            <Link
              to="/petcenter/appointments"
              className="text-primary text-sm font-semibold"
            >
              View All
            </Link>
          </div>

          {recentAppointments.length > 0 ? (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-card flex items-center justify-center overflow-hidden flex-shrink-0">
                    {appointment.petData?.photo ? (
                      <img
                        src={appointment.petData.photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : appointment.icon ? (
                      <img
                        src={appointment.icon}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <IoPaw className="text-primary text-2xl" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">
                      {appointment.petData?.petName || "Pet"}{" "}
                      {appointment.petData?.breed &&
                        `(${appointment.petData.breed})`}
                    </p>

                    <p className="text-sm text-text truncate">
                      {appointment.subService || appointment.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-primary font-bold text-sm">
                      {appointment.time}
                    </p>

                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[330px] flex flex-col items-center justify-center text-center">
              <LuCalendar className="text-6xl text-gray-300 mb-3" />
              <p className="text-lg font-semibold">No Appointments Found</p>
              <p className="text-text text-sm mt-1">
                New appointments will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[430px]">
          <p className="text-xl font-bold mb-3">Adoption Requests Summary</p>

          <div className="h-[175px] outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adoptionChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={2}
                  stroke="none"
                  activeShape={false}
                  isAnimationActive={false}
                >
                  {adoptionChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={doughnutColors[index]}
                      stroke="none"
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-3">
            {adoptionChartData.map((item, index) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: doughnutColors[index] }}
                  ></span>

                  <span className="text-text font-semibold">{item.name}</span>
                </div>

                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
            <p className="text-text text-sm font-semibold">Total Requests</p>
            <p className="text-2xl font-bold mt-1">{totalAdoptionRequests}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[330px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Recent Users</p>

            <Link
              to="/petcenter/users"
              className="text-primary text-sm font-semibold"
            >
              View All
            </Link>
          </div>

          {recentUsers.length > 0 ? (
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-12 gap-3 items-center border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="col-span-2">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {user.fullName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="col-span-4 min-w-0">
                    <p className="font-bold truncate">{user.fullName}</p>
                  </div>

                  <div className="col-span-4 min-w-0">
                    <p className="text-sm text-text truncate">{user.email}</p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-text">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <LuUsersRound className="text-6xl mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-semibold">No Users Found</p>
              <p className="text-text text-sm mt-1">
                Registered users will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[330px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Recent Orders</p>

            <Link
              to="/petcenter/orders"
              className="text-primary text-sm font-semibold"
            >
              View All
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-3 items-center border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <p className="col-span-4 font-bold truncate">
                    #ORD-{order.id}
                  </p>

                  <p className="col-span-3 text-sm text-text truncate">
                    {order.customer?.fullName}
                  </p>

                  <p className="col-span-2 font-bold">₹{order.grandTotal}</p>

                  <div className="col-span-3">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <IoCartOutline className="text-6xl mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-semibold">No Orders Found</p>
              <p className="text-text text-sm mt-1">
                Customer orders will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[330px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Top Selling Products</p>

            <Link
              to="/petcenter/products"
              className="text-primary text-sm font-semibold"
            >
              View All
            </Link>
          </div>

          {topSellingProducts.length > 0 ? (
            <div className="space-y-4">
              {topSellingProducts.map((product) => (
                <div
                  key={product.name}
                  className="grid grid-cols-12 gap-3 items-center border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="col-span-2">
                    <div className="w-10 h-10 bg-pink-bg rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  </div>

                  <p className="col-span-5 font-semibold truncate">
                    {product.name}
                  </p>

                  <p className="col-span-2 font-bold">{product.sold}</p>

                  <p className="col-span-3 font-bold text-right">
                    ₹{product.revenue}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <HiOutlineShoppingBag className="text-6xl mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-semibold">No Sales Found</p>
              <p className="text-text text-sm mt-1">
                Top selling products will appear after orders.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">Recent Adoption Requests</p>

          <Link
            to="/petcenter/adoptions"
            className="text-primary text-sm font-semibold"
          >
            View All
          </Link>
        </div>

        {adoptionRequests.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {adoptionRequests.slice(0, 4).map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-4 border border-gray-100 rounded-2xl p-4"
              >
                <img
                  src={request.petData?.image}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover object-top"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">
                    {request.petData?.name} - {request.applicantData?.fullName}
                  </p>

                  <p className="text-sm text-text truncate">
                    Requested on {formatDate(request.createdAt)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusStyle(
                    request.status,
                  )}`}
                >
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <GoHeart className="text-6xl mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-semibold">No Adoption Requests Found</p>
            <p className="text-text text-sm mt-1">
              New adoption requests will appear here.
            </p>
          </div>
        )}
      </div>

      <p className="text-center text-text text-sm mt-8">
        © 2025 PawCare Pet Center Management System. All rights reserved.
      </p>
    </div>
  );
};

export default PetCenterDashboard;

