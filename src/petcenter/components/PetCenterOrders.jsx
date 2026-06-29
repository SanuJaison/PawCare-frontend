import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaRegEye, FaRegUser } from "react-icons/fa";
import { MdOutlineLocalShipping, MdPayment } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { ImCheckmark } from "react-icons/im";
import { GrLocation } from "react-icons/gr";
import { getAllOrdersAPI, updateOrderAPI } from "../../services/allAPI";

const PetCenterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentFilter, setPaymentFilter] = useState("Payment Method");

  const [showMoreId, setShowMoreId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const getPrice = (price) => {
    return Number(price?.replace(/[₹,]/g, ""));
  };

  const loadOrders = async () => {
    const result = await getAllOrdersAPI();

    if (result.status >= 200 && result.status < 300) {
      setOrders([...result.data].reverse());
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    return new Date(dateValue).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();

    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);

    return date >= firstDay && date <= lastDay;
  };

  const isThisMonth = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();

    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Out for Delivery") return "bg-blue-100 text-blue-600";
    if (status === "Confirmed") return "bg-purple-100 text-purple-600";
    if (status === "Placed") return "bg-yellow-100 text-yellow-600";
    if (status === "Cancelled") return "bg-red-100 text-red-500";

    return "bg-gray-100 text-gray-600";
  };

  const getPaymentStyle = (method) => {
    if (method === "UPI") return "bg-purple-100 text-purple-600";
    if (method === "Cash on Delivery") return "bg-orange-100 text-orange-600";
    if (method === "Credit / Debit Card") return "bg-blue-100 text-blue-600";
    if (method === "Net Banking") return "bg-green-100 text-green-600";

    return "bg-gray-100 text-gray-600";
  };

  const getStatusDot = (status) => {
    if (status === "Delivered") return "bg-green-500";
    if (status === "Out for Delivery") return "bg-blue-500";
    if (status === "Confirmed") return "bg-purple-500";
    if (status === "Placed") return "bg-yellow-500";
    if (status === "Cancelled") return "bg-red-500";

    return "bg-gray-400";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
      order.customer?.fullName
        ?.toLowerCase()
        .includes(searchKey.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchKey.toLowerCase()) ||
      order.customer?.phone?.toString().includes(searchKey);

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "Payment Method" ||
      order.paymentMethod === paymentFilter;

    let matchesDate = true;

    if (dateFilter === "Today") {
      matchesDate = isToday(order.createdAt);
    }

    if (dateFilter === "This Week") {
      matchesDate = isThisWeek(order.createdAt);
    }

    if (dateFilter === "This Month") {
      matchesDate = isThisMonth(order.createdAt);
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  const todayOrders = orders.filter((order) => isToday(order.createdAt));

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Placed",
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed",
  ).length;

  const outForDeliveryOrders = orders.filter(
    (order) => order.status === "Out for Delivery",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const updateOrderStatus = async (order, status) => {
    const result = await updateOrderAPI(order.id, {
      status,
      updatedAt: new Date().toISOString(),
    });

    if (result.status >= 200 && result.status < 300) {
      alert(`Order marked as ${status}`);
      setShowMoreId(null);
      loadOrders();
    } else {
      alert("Failed to update order status");
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
    setShowMoreId(null);
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      <div>
        <p className="text-3xl font-bold text-heading">Orders</p>

        <p className="text-text font-semibold mt-2">
          Manage pet shop orders from customers
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search orders..."
            className="w-full border border-gray-200 bg-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary font-semibold"
          />
        </div>

        <select
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
        >
          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
        >
          <option>All Status</option>
          <option>Placed</option>
          <option>Confirmed</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
        >
          <option>Payment Method</option>
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit / Debit Card</option>
          <option>Net Banking</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
            <IoBagHandleOutline className="text-primary text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Total Orders</p>
            <p className="text-3xl font-bold">{totalOrders}</p>
            <p className="text-green-600 text-xs font-semibold">
              All customer orders
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <GoClock className="text-yellow-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Pending Orders</p>
            <p className="text-3xl font-bold">{pendingOrders}</p>
            <p className="text-yellow-600 text-xs font-semibold">
              Waiting confirmation
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <MdOutlineLocalShipping className="text-blue-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Out for Delivery</p>
            <p className="text-3xl font-bold">{outForDeliveryOrders}</p>
            <p className="text-blue-600 text-xs font-semibold">On the way</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <ImCheckmark className="text-green-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Delivered</p>
            <p className="text-3xl font-bold">{deliveredOrders}</p>
            <p className="text-green-600 text-xs font-semibold">
              Completed orders
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-9 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[700px] flex flex-col overflow-visible">
          <div className="p-5 border-b border-gray-100">
            <p className="text-xl font-bold">All Orders</p>
          </div>

          {paginatedOrders.length > 0 ? (
            <>
              <div className="grid grid-cols-[1.35fr_1.75fr_1.35fr_1.15fr_1fr_1.2fr_1.25fr_1fr] gap-6 bg-gray-50 px-6 py-4 text-sm font-bold text-text">
                <div>Order</div>
                <div>Customer</div>
                <div>Products</div>
                <div>Amount</div>
                <div>Payment</div>
                <div>Date</div>
                <div>Status</div>
                <div className="text-center">Actions</div>
              </div>

              <div className="flex-1">
                {paginatedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.35fr_1.75fr_1.35fr_1.15fr_1fr_1.2fr_1.25fr_1fr] gap-6 items-center px-6 py-5 border-t border-gray-100 relative"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getStatusDot(
                          order.status,
                        )}`}
                      ></span>

                      <p className="font-bold text-sm truncate">
                        #ORD-{order.id}
                      </p>
                    </div>

                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-sm truncate">
                        {order.customer?.fullName || "Customer"}
                      </p>

                      <p className="text-xs text-text truncate">
                        {order.customer?.email || "Email not provided"}
                      </p>

                      <p className="text-xs text-text truncate">
                        {order.customer?.phone || "Phone not provided"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {order.items?.slice(0, 2).map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="w-10 h-10 bg-pink-bg rounded-lg overflow-hidden border border-gray-100"
                          >
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        ))}
                      </div>

                      {order.items?.length > 2 && (
                        <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          +{order.items.length - 2}
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-sm whitespace-nowrap tabular-nums">
                      ₹{order.grandTotal}
                    </p>

                    <div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${getPaymentStyle(
                          order.paymentMethod,
                        )}`}
                      >
                        {order.paymentMethod === "Cash on Delivery"
                          ? "COD"
                          : order.paymentMethod === "Credit / Debit Card"
                            ? "Card"
                            : order.paymentMethod}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm leading-5">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-xs text-text">
                        {formatTime(order.createdAt)}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex justify-center gap-2 relative">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-card hover:text-primary transition"
                      >
                        <FaRegEye />
                      </button>

                      {order.status !== "Delivered" && (
                        <button
                          onClick={() =>
                            setShowMoreId(
                              showMoreId === order.id ? null : order.id,
                            )
                          }
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <IoMdMore className="text-xl" />
                        </button>
                      )}

                      {showMoreId === order.id &&
                        order.status !== "Delivered" && (
                          <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-lg w-44 overflow-hidden z-30">
                            {order.status !== "Confirmed" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order, "Confirmed")
                                }
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50"
                              >
                                Confirm
                              </button>
                            )}

                            {order.status !== "Out for Delivery" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order, "Out for Delivery")
                                }
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 border-t border-gray-100"
                              >
                                Out for Delivery
                              </button>
                            )}

                            {order.status !== "Delivered" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order, "Delivered")
                                }
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 border-t border-gray-100"
                              >
                                Delivered
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100 mt-auto flex justify-between items-center">
                <p className="text-sm text-text font-semibold">
                  Showing {paginatedOrders.length} of {filteredOrders.length}{" "}
                  orders
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 bg-white disabled:opacity-40"
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-xl font-bold ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "border border-gray-200 bg-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 bg-white disabled:opacity-40"
                  >
                    ›
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <IoBagHandleOutline className="text-7xl text-gray-300 mb-4" />
              <p className="text-xl font-bold">No Orders Found</p>
              <p className="text-text mt-2">
                Customer orders will appear here after checkout.
              </p>
            </div>
          )}
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-5">
              <p className="text-lg font-bold">Today's Orders</p>

              <span className="text-primary font-semibold text-sm">
                {todayOrders.length}
              </span>
            </div>

            <div className="space-y-4">
              {todayOrders.length > 0 ? (
                todayOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {order.items?.slice(0, 2).map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="w-10 h-10 rounded-lg bg-pink-bg border border-white overflow-hidden"
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ))}

                      {order.items?.length > 2 && (
                        <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold">
                          +{order.items.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">
                        #ORD-{order.id}
                      </p>

                      <p className="text-xs text-text truncate">
                        {order.customer?.fullName}
                      </p>

                      <p className="text-xs text-text">
                        {formatTime(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm">₹{order.grandTotal}</p>

                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <IoBagHandleOutline className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="font-bold">No orders today</p>
                  <p className="text-sm text-text mt-1">
                    Today's placed orders will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-lg font-bold mb-5">Order Status Summary</p>

            <div className="flex flex-col items-center gap-5">
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    #22c55e 0deg ${
                      totalOrders ? (deliveredOrders / totalOrders) * 360 : 0
                    }deg,
                    #3b82f6 ${
                      totalOrders ? (deliveredOrders / totalOrders) * 360 : 0
                    }deg ${
                      totalOrders
                        ? ((deliveredOrders + outForDeliveryOrders) /
                            totalOrders) *
                          360
                        : 0
                    }deg,
                    #a855f7 ${
                      totalOrders
                        ? ((deliveredOrders + outForDeliveryOrders) /
                            totalOrders) *
                          360
                        : 0
                    }deg ${
                      totalOrders
                        ? ((deliveredOrders +
                            outForDeliveryOrders +
                            confirmedOrders) /
                            totalOrders) *
                          360
                        : 0
                    }deg,
                    #f59e0b ${
                      totalOrders
                        ? ((deliveredOrders +
                            outForDeliveryOrders +
                            confirmedOrders) /
                            totalOrders) *
                          360
                        : 0
                    }deg 360deg
                  )`,
                }}
              >
                <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-xs text-text">Total Orders</p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-semibold w-full">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Delivered
                  </span>
                  <span>{deliveredOrders}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Out for Delivery
                  </span>
                  <span>{outForDeliveryOrders}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    Confirmed
                  </span>
                  <span>{confirmedOrders}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    Pending
                  </span>
                  <span>{pendingOrders}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-5 pt-4 text-sm text-text">
              Updated just now
            </div>
          </div>
        </div>
      </div>

      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-8">
              <div>
                <p className="text-3xl font-bold">Order Details</p>
                <p className="text-text mt-1">#ORD-{selectedOrder.id}</p>
              </div>

              <button
                onClick={() => setShowOrderModal(false)}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl"
              >
                ×
              </button>
            </div>

            <div className="px-8 pb-8 space-y-6">
              <div className="border border-pink-200 bg-pink-50 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-bold text-xl">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-bold text-xl">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className="font-bold text-xl">
                    {selectedOrder.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      selectedOrder.status,
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6">
                <p className="text-2xl font-bold mb-5">Products</p>

                <div className="space-y-4">
                  {selectedOrder.items?.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center gap-5 border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="w-20 h-20 bg-pink-bg rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-xl font-bold">{item.name}</p>

                        <p className="text-text">{item.description}</p>

                        <p className="text-sm text-text">
                          Qty: {item.quantity || 1} × {item.price}
                        </p>
                      </div>

                      <p className="text-primary text-2xl font-bold">
                        ₹{getPrice(item.price) * (item.quantity || 1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaRegUser className="text-primary text-2xl" />
                    <p className="text-2xl font-bold">Customer Details</p>
                  </div>

                  <div className="space-y-3 text-text">
                    <p>
                      <span className="font-bold text-heading">Name:</span>{" "}
                      {selectedOrder.customer?.fullName}
                    </p>

                    <p>
                      <span className="font-bold text-heading">Email:</span>{" "}
                      {selectedOrder.customer?.email}
                    </p>

                    <p>
                      <span className="font-bold text-heading">Phone:</span>{" "}
                      {selectedOrder.customer?.phone}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <GrLocation className="text-primary text-2xl" />
                    <p className="text-2xl font-bold">Delivery Address</p>
                  </div>

                  <div className="space-y-3 text-text">
                    <p>{selectedOrder.address?.address}</p>

                    <p>
                      {selectedOrder.address?.city},{" "}
                      {selectedOrder.address?.state} -{" "}
                      {selectedOrder.address?.pincode}
                    </p>

                    {selectedOrder.address?.landmark && (
                      <p>
                        <span className="font-bold text-heading">
                          Landmark:
                        </span>{" "}
                        {selectedOrder.address.landmark}
                      </p>
                    )}

                    <p>
                      <span className="font-bold text-heading">Shipping:</span>{" "}
                      {selectedOrder.shippingMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MdPayment className="text-primary text-2xl" />
                  <p className="text-2xl font-bold">Payment Summary</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-text">Subtotal</p>
                    <p className="font-bold">₹{selectedOrder.subtotal}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-text">Delivery Charge</p>
                    <p className="font-bold">₹{selectedOrder.shippingCharge}</p>
                  </div>

                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>
                        Discount ({selectedOrder.coupon?.code} -{" "}
                        {selectedOrder.coupon?.discount}%)
                      </p>

                      <p className="font-bold">
                        -₹{selectedOrder.discountAmount}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <p className="text-xl font-bold">Total</p>

                    <p className="text-primary text-3xl font-bold">
                      ₹{selectedOrder.grandTotal}
                    </p>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="border border-gray-100 rounded-2xl p-6">
                  <p className="text-2xl font-bold mb-2">Order Notes</p>
                  <p className="text-text">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-8 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCenterOrders;
