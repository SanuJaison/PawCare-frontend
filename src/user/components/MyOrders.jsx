import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllOrdersAPI } from "../../services/allAPI";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 4;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getPrice = (price) => {
    return Number(price.replace(/[₹,]/g, ""));
  };

  const loadOrders = async () => {
    const result = await getAllOrdersAPI();

    if (result.status >= 200 && result.status < 300) {
      const userOrders = result.data
        .filter((order) => order.userId === currentUser?.id)
        .reverse();

      setOrders(userOrders);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isTodayOrYesterday = (dateValue) => {
    const orderDate = new Date(dateValue);
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const sameDay = (a, b) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    return sameDay(orderDate, today) || sameDay(orderDate, yesterday);
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : activeTab === "recent"
        ? orders.filter((order) => isTodayOrYesterday(order.createdAt))
        : orders.filter((order) => !isTodayOrYesterday(order.createdAt));

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  const getStatusStyle = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Out for Delivery") return "bg-blue-100 text-blue-600";
    if (status === "Confirmed") return "bg-purple-100 text-purple-600";
    if (status === "Placed") return "bg-yellow-100 text-yellow-600";
    if (status === "Cancelled") return "bg-red-100 text-red-500";
    return "bg-gray-100 text-gray-600";
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleReorder = () => {
    navigate("/pet-shop");
  };

  return (
    <>
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
        <p className="text-4xl font-bold mb-2">My Orders</p>

        <p className="text-text mb-6">
          Track your orders and view order history
        </p>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="border border-gray-100 shadow-sm rounded-2xl p-4 mb-6">
            <div className="flex gap-8 flex-wrap">
              {[
                { label: "All Orders", value: "all" },
                { label: "Recent Orders", value: "recent" },
                { label: "Past Orders", value: "past" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setCurrentPage(1);
                  }}
                  className={`pb-2 font-semibold ${
                    activeTab === tab.value
                      ? "text-primary border-b-[3px] border-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => {
                const firstItem = order.items?.[0];

                return (
                  <div
                    key={order.id}
                    className="bg-white border-l-4 border-l-primary rounded-3xl shadow-sm p-4"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden">
                          <img
                            src={firstItem?.image}
                            alt=""
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      </div>

                      <div className="col-span-5">
                        <p className="text-xl font-bold">
                          {firstItem?.name}
                          {order.items.length > 1 &&
                            ` + ${order.items.length - 1} more`}
                        </p>

                        <p className="text-sm text-text mt-1">
                          Qty: {order.totalItems}
                        </p>

                        <p className="text-primary text-xl font-bold mt-2">
                          ₹{order.grandTotal}
                        </p>

                        <p className="text-sm text-text mt-1">
                          Ordered on {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="col-span-3">
                        <p className="text-sm text-gray-500">Order ID</p>

                        <p className="font-bold text-lg">#ORD{order.id}</p>

                        <p className="text-sm text-gray-500 mt-2">Status</p>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="col-span-3 flex justify-end gap-3">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-2 border border-primary text-primary p-2 rounded-xl font-semibold hover:bg-pink-card transition"
                        >
                          <FaRegEye />
                          <p>View Details</p>
                        </button>

                        <button
                          onClick={handleReorder}
                          className="flex items-center gap-2 bg-primary text-white p-2 rounded-xl font-semibold hover:opacity-90 transition"
                        >
                          <IoCartOutline />
                          <p>Reorder</p>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <IoCartOutline className="text-7xl text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-bold">No Orders Found</p>
                <p className="text-text mt-2">
                  Your placed orders will appear here.
                </p>
              </div>
            )}
          </div>

          {filteredOrders.length > 0 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="w-10 h-10 rounded-full shadow-lg bg-white flex items-center justify-center disabled:opacity-40"
              >
                <MdOutlineChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full font-bold ${
                    currentPage === index + 1
                      ? "bg-pink-200 text-primary"
                      : "shadow bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-10 h-10 rounded-full shadow-lg bg-white flex items-center justify-center disabled:opacity-40"
              >
                <MdOutlineChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-8">
              <div>
                <p className="text-3xl font-bold">Order Details</p>
                <p className="text-text mt-1">#ORD{selectedOrder.id}</p>
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
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-5 border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="w-20 h-20 bg-pink-bg rounded-2xl overflow-hidden">
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
                  <p className="text-2xl font-bold mb-4">Delivery Details</p>

                  <div className="space-y-3 text-text">
                    <p>
                      <span className="font-bold text-heading">Name:</span>{" "}
                      {selectedOrder.customer.fullName}
                    </p>

                    <p>
                      <span className="font-bold text-heading">Email:</span>{" "}
                      {selectedOrder.customer.email}
                    </p>

                    <p>
                      <span className="font-bold text-heading">Phone:</span>{" "}
                      {selectedOrder.customer.phone}
                    </p>

                    <p>
                      <span className="font-bold text-heading">Address:</span>{" "}
                      {selectedOrder.address.address},{" "}
                      {selectedOrder.address.city},{" "}
                      {selectedOrder.address.state} -{" "}
                      {selectedOrder.address.pincode}
                    </p>

                    {selectedOrder.address.landmark && (
                      <p>
                        <span className="font-bold text-heading">
                          Landmark:
                        </span>{" "}
                        {selectedOrder.address.landmark}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6">
                  <p className="text-2xl font-bold mb-4">Payment Summary</p>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-text">Subtotal</p>
                      <p className="font-bold">₹{selectedOrder.subtotal}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-text">Delivery Charge</p>
                      <p className="font-bold">
                        ₹{selectedOrder.shippingCharge}
                      </p>
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

                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="font-bold">
                        Payment Status: {selectedOrder.paymentStatus}
                      </p>
                      <p className="text-sm text-text mt-1">
                        Method: {selectedOrder.paymentMethod}
                      </p>
                    </div>
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
    </>
  );
};

export default MyOrders;
