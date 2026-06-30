import { useEffect, useState } from "react";
import { LuUsersRound, LuCalendar } from "react-icons/lu";
import { PiApplePodcastsLogoLight } from "react-icons/pi";
import { PiFunnelThin } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { GoClock } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import {
  deleteAdoptionRequestAPI,
  deleteAppointmentAPI,
  deleteOrderAPI,
  deleteUserAPI,
  getAllAdoptionRequestsAPI,
  getAllOrdersAPI,
  getAllUsersAPI,
  getAppointmentsAPI,
  updateUserAPI,
} from "../../services/allAPI";

const PetCenterUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showMoreId, setShowMoreId] = useState(null);

  const loadUsers = async () => {
    const result = await getAllUsersAPI();

    if (result.status >= 200 && result.status < 300) {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const displayValue = (value) => {
    return value ? value : "Not provided";
  };

  const getUserStatus = (user) => {
    if (user.isBanned) return "Banned";
    return user.status || "Inactive";
  };

  const getStatusStyle = (user) => {
    const status = getUserStatus(user).toLowerCase();

    if (status === "active") {
      return "bg-green-100 text-green-600";
    }

    if (status === "banned") {
      return "bg-red-100 text-red-500";
    }

    return "bg-yellow-100 text-yellow-600";
  };

  const isToday = (dateValue) => {
    if (!dateValue) return false;

    const date = new Date(dateValue);
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisMonth = (dateValue) => {
    if (!dateValue) return false;

    const date = new Date(dateValue);
    const today = new Date();

    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not provided";

    return new Date(dateValue).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return "Not provided";

    return new Date(dateValue).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const visibleUsers = users.filter((user) => !user.isDeleted);

  const totalUsers = visibleUsers.length;

  const activeUsers = visibleUsers.filter(
    (user) => getUserStatus(user).toLowerCase() === "active" && !user.isBanned,
  );

  const newThisMonth = visibleUsers.filter((user) =>
    isThisMonth(user.createdAt),
  );

  const loggedInToday = visibleUsers.filter((user) => isToday(user.lastLogin));

  const filteredUsers = visibleUsers
    .filter((user) => {
      if (filterType === "active") {
        return getUserStatus(user).toLowerCase() === "active";
      }

      if (filterType === "inactive") {
        return (
          getUserStatus(user).toLowerCase() === "inactive" || user.isBanned
        );
      }

      if (filterType === "newThisMonth") {
        return isThisMonth(user.createdAt);
      }

      if (filterType === "loggedInToday") {
        return isToday(user.lastLogin);
      }

      return true;
    })
    .filter((user) => {
      return (
        user.fullName?.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.phone?.toString().includes(searchKey)
      );
    });

  const filterOptions = [
    { label: "All Users", value: "all" },
    { label: "Active Users", value: "active" },
    { label: "Inactive Users", value: "inactive" },
    { label: "New This Month", value: "newThisMonth" },
    { label: "Logged In Today", value: "loggedInToday" },
  ];

  const selectedFilterLabel =
    filterOptions.find((item) => item.value === filterType)?.label || "Filter";

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    setShowMoreId(null);
  };

  const handleBanUser = async (user) => {
    const confirmBan = window.confirm(
      `Are you sure you want to ban ${user.fullName}?`,
    );

    if (!confirmBan) return;

    const result = await updateUserAPI(user.id, {
      status: "Inactive",
      isBanned: true,
      bannedAt: new Date().toISOString(),
    });

    if (result.status >= 200 && result.status < 300) {
      alert("User banned successfully");
      setShowMoreId(null);
      loadUsers();
    } else {
      alert("Failed to ban user");
    }
  };

  const handleUnbanUser = async (user) => {
    const confirmUnban = window.confirm(
      `Are you sure you want to unban ${user.fullName}?`,
    );

    if (!confirmUnban) return;

    const result = await updateUserAPI(user.id, {
      status: "Inactive",
      isBanned: false,
      bannedAt: "",
      unbannedAt: new Date().toISOString(),
    });

    if (result.status >= 200 && result.status < 300) {
      alert("User unbanned successfully");
      setShowMoreId(null);
      loadUsers();
    } else {
      alert("Failed to unban user");
    }
  };

  const isSameUser = (itemUserId, userId) => {
    return itemUserId?.toString() === userId?.toString();
  };

  const deleteUserRelatedData = async (userId) => {
    const [appointmentsResult, ordersResult, adoptionRequestsResult] =
      await Promise.all([
        getAppointmentsAPI(),
        getAllOrdersAPI(),
        getAllAdoptionRequestsAPI(),
      ]);

    const dataLoaded = [
      appointmentsResult,
      ordersResult,
      adoptionRequestsResult,
    ].every((result) => result.status >= 200 && result.status < 300);

    if (!dataLoaded) {
      return false;
    }

    const appointments = Array.isArray(appointmentsResult.data)
      ? appointmentsResult.data
      : [];
    const orders = Array.isArray(ordersResult.data) ? ordersResult.data : [];
    const adoptionRequests = Array.isArray(adoptionRequestsResult.data)
      ? adoptionRequestsResult.data
      : [];

    const deleteResults = await Promise.all([
      ...appointments
        .filter((appointment) => isSameUser(appointment.userId, userId))
        .map((appointment) => deleteAppointmentAPI(appointment.id)),
      ...orders
        .filter((order) => isSameUser(order.userId, userId))
        .map((order) => deleteOrderAPI(order.id)),
      ...adoptionRequests
        .filter((request) => isSameUser(request.userId, userId))
        .map((request) => deleteAdoptionRequestAPI(request.id)),
    ]);

    return deleteResults.every(
      (result) => result.status >= 200 && result.status < 300,
    );
  };

  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.fullName}? This will also remove their appointments, adoption requests, and orders.`,
    );

    if (!confirmDelete) return;

    const relatedDataDeleted = await deleteUserRelatedData(user.id);

    if (!relatedDataDeleted) {
      alert("Failed to delete the user's related data");
      return;
    }

    const result = await deleteUserAPI(user.id);

    if (result.status >= 200 && result.status < 300) {
      alert("User and related data deleted successfully");
      setShowMoreId(null);
      loadUsers();
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-50 p-4 sm:p-6 min-h-screen">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-3xl font-bold text-heading">Users</p>

          <p className="text-text font-semibold mt-2">
            Manage all registered users in PawCare
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold transition hover:bg-gray-50 sm:w-auto"
            >
              <PiFunnelThin className="text-xl" />
              {selectedFilterLabel}
            </button>

            {showFilter && (
              <div className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg sm:left-auto sm:w-52">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFilterType(option.value);
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold hover:bg-pink-card ${
                      filterType === option.value
                        ? "text-primary bg-pink-card"
                        : "text-text"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search users..."
              className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 pr-10 outline-none focus:border-primary sm:w-64"
            />

            <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
              <LuUsersRound className="text-primary text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Total Users</p>
              <p className="text-3xl font-bold mt-1">{totalUsers}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                ↑ 0% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <PiApplePodcastsLogoLight className="text-blue-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Active Users</p>
              <p className="text-3xl font-bold mt-1">{activeUsers.length}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                ↑ 0% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <LuCalendar className="text-green-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">New This Month</p>
              <p className="text-3xl font-bold mt-1">{newThisMonth.length}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                ↑ 0% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <LuUsersRound className="text-purple-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Logged In Today</p>
              <p className="text-3xl font-bold mt-1">{loggedInToday.length}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                ↑ 0% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xl font-bold mb-5">All Users</p>

        {filteredUsers.length > 0 ? (
          <>
            <div className="border border-gray-100 rounded-2xl overflow-visible">
              <div className="hidden rounded-t-2xl bg-gray-50 px-6 py-4 text-sm font-bold text-text xl:grid xl:grid-cols-12">
                <div className="col-span-3">User</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-2">Joined Date</div>
                <div className="xl:col-span-1">Status</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>

              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid gap-3 border-t border-gray-100 px-4 py-5 relative sm:px-6 xl:grid-cols-12 xl:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3 xl:col-span-3">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        {user.fullName?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-bold truncate">
                        {displayValue(user.fullName)}
                      </p>
                      <p className="text-xs text-text">#USR{user.id}</p>
                    </div>
                  </div>

                  <div className="break-words text-sm font-semibold text-text xl:col-span-3 xl:pr-10">
                    {displayValue(user.email)}
                  </div>

                  <div className="break-words text-sm font-semibold text-text xl:col-span-2 xl:pr-8">
                    {displayValue(user.phone)}
                  </div>

                  <div className="text-sm font-semibold text-text xl:col-span-2">
                    {formatDate(user.createdAt)}
                  </div>

                  <div className="xl:col-span-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        user,
                      )}`}
                    >
                      {getUserStatus(user)}
                    </span>
                  </div>

                  <div className="relative flex gap-3 xl:col-span-1 xl:justify-center">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-card hover:text-primary transition"
                    >
                      <FaRegEye />
                    </button>

                    <button
                      onClick={() =>
                        setShowMoreId(showMoreId === user.id ? null : user.id)
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                    >
                      <IoMdMore className="text-xl" />
                    </button>

                    {showMoreId === user.id && (
                      <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-lg w-36 overflow-hidden z-30">
                        {user.isBanned ? (
                          <button
                            onClick={() => handleUnbanUser(user)}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
                          >
                            Unban User
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBanUser(user)}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-yellow-600 hover:bg-yellow-50"
                          >
                            Ban User
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 border-t border-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text font-semibold">
                Showing 1 to {filteredUsers.length} of {visibleUsers.length}{" "}
                users
              </p>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white">
                  ‹
                </button>

                <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold">
                  1
                </button>

                <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white">
                  ›
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <LuUsersRound className="text-7xl text-gray-300 mx-auto mb-4" />

            <p className="text-xl font-bold">No Users Found</p>

            <p className="text-text mt-2">Registered users will appear here.</p>
          </div>
        )}
      </div>

      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center">
                  <LuUsersRound className="text-3xl" />
                </div>

                <div>
                  <p className="text-2xl font-bold">User Details</p>
                  <p className="text-text font-semibold text-sm">
                    View complete profile information
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowUserModal(false)}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-2xl hover:bg-gray-50"
              >
                ×
              </button>
            </div>

            <div className="px-6 pb-6 space-y-5">
              <div className="grid gap-5 rounded-2xl border border-gray-100 p-5 md:grid-cols-12 md:items-center">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center md:col-span-7">
                  {selectedUser.profilePic ? (
                    <img
                      src={selectedUser.profilePic}
                      alt=""
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                      {selectedUser.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="text-3xl font-bold">
                      {displayValue(selectedUser.fullName)}
                    </p>

                    <p className="text-text font-semibold mt-1">
                      #USR{selectedUser.id}
                    </p>

                    <span
                      className={`inline-block mt-3 px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        selectedUser,
                      )}`}
                    >
                      {getUserStatus(selectedUser)}
                    </span>
                  </div>
                </div>

                <div className="border-gray-100 md:col-span-5 md:border-l md:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pink-card text-primary flex items-center justify-center">
                      <LuCalendar className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Joined Date
                      </p>

                      <p className="font-bold">
                        {formatDate(selectedUser.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5">
                <p className="text-lg font-bold mb-5">Contact Information</p>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center flex-shrink-0">
                      <MdOutlineEmail className="text-2xl" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-text font-semibold">
                        Email Address
                      </p>

                      <p className="font-semibold break-words">
                        {displayValue(selectedUser.email)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center flex-shrink-0">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Phone Number
                      </p>

                      <p className="font-semibold">
                        {displayValue(selectedUser.phone)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center flex-shrink-0">
                      <GrLocation className="text-xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">Address</p>

                      <p className="font-semibold break-words">
                        {displayValue(selectedUser.address)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5">
                <p className="text-lg font-bold mb-5">Personal Information</p>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center flex-shrink-0">
                      <LuCalendar className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Date of Birth
                      </p>

                      <p className="font-semibold">
                        {selectedUser.dob
                          ? formatDate(selectedUser.dob)
                          : "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center flex-shrink-0">
                      <GoClock className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Last Login
                      </p>

                      <p className="font-semibold">
                        {formatDateTime(selectedUser.lastLogin)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5">
                <p className="text-lg font-bold mb-5">Account Activity</p>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-center gap-3 xl:border-r xl:border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center">
                      <LuCalendar className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Total Appointments
                      </p>
                      <p className="font-bold text-xl">0</p>
                      <p className="text-xs text-text">Completed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 xl:border-r xl:border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center">
                      <HiOutlineShoppingBag className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Total Orders
                      </p>
                      <p className="font-bold text-xl">0</p>
                      <p className="text-xs text-text">Completed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 xl:border-r xl:border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center">
                      <FaRegHeart className="text-xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Wishlist Items
                      </p>
                      <p className="font-bold text-xl">0</p>
                      <p className="text-xs text-text">Saved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-pink-card text-primary flex items-center justify-center">
                      <GoClock className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Last Login
                      </p>
                      <p className="font-bold text-sm">
                        {formatDateTime(selectedUser.lastLogin)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-8 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50"
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

export default PetCenterUsers;
