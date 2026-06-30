// import React from 'react'
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegEye, FaRegUser, FaRegHeart } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { IoPaw } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { PiHouseLine } from "react-icons/pi";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import {
  getAllAdoptionRequestsAPI,
  updateAdoptionRequestAPI,
} from "../../services/allAPI";

const PetCenterAdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [showMoreId, setShowMoreId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 7;

  const loadRequests = async () => {
    const result = await getAllAdoptionRequestsAPI();

    if (result.status >= 200 && result.status < 300) {
      setRequests([...result.data].reverse());
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not provided";

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Approved") return "bg-green-100 text-green-600";
    if (status === "Rejected") return "bg-red-100 text-red-500";
    if (status === "Cancelled") return "bg-gray-100 text-gray-600";

    return "bg-gray-100 text-gray-600";
  };

  const getStatusIcon = (status) => {
    if (status === "Pending") return <GoClock />;
    if (status === "Approved") return <IoCheckmarkCircleOutline />;
    if (status === "Rejected") return <IoCloseCircleOutline />;
    if (status === "Cancelled") return <IoCloseCircleOutline />;

    return <GoClock />;
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id?.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
      request.petData?.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
      request.petData?.breed?.toLowerCase().includes(searchKey.toLowerCase()) ||
      request.applicantData?.fullName
        ?.toLowerCase()
        .includes(searchKey.toLowerCase()) ||
      request.applicantData?.email
        ?.toLowerCase()
        .includes(searchKey.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || request.status === statusFilter;

    let matchesDate = true;

    if (dateFilter === "Today") {
      matchesDate = isToday(request.createdAt);
    }

    if (dateFilter === "This Week") {
      matchesDate = isThisWeek(request.createdAt);
    }

    if (dateFilter === "This Month") {
      matchesDate = isThisMonth(request.createdAt);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage,
  );

  const todayRequests = requests.filter((request) =>
    isToday(request.createdAt),
  );

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending",
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status === "Approved",
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "Rejected",
  ).length;

  const cancelledRequests = requests.filter(
    (request) => request.status === "Cancelled",
  ).length;

  const updateRequestStatus = async (request, status) => {
    const result = await updateAdoptionRequestAPI(request.id, {
      status,
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    });

    if (result.status >= 200 && result.status < 300) {
      alert(`Adoption request ${status}`);
      setShowMoreId(null);
      loadRequests();
    } else {
      alert("Failed to update adoption request");
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
    setShowMoreId(null);
  };

  return (
    <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-50 p-4 sm:p-6 min-h-screen">
      <div>
        <p className="text-3xl font-bold text-heading">Adoption Requests</p>

        <p className="text-text font-semibold mt-2">
          Manage pet adoption applications and approval updates
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by pet name, applicant name, or request ID"
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
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
            <LuCalendarDays className="text-primary text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Total Requests</p>
            <p className="text-3xl font-bold">{totalRequests}</p>
            <p className="text-xs text-text font-semibold">All time</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <GoClock className="text-yellow-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Pending</p>
            <p className="text-3xl font-bold">{pendingRequests}</p>
            <p className="text-xs text-yellow-600 font-semibold">
              Waiting review
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <IoCheckmarkCircleOutline className="text-green-600 text-4xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Approved</p>
            <p className="text-3xl font-bold">{approvedRequests}</p>
            <p className="text-xs text-green-600 font-semibold">
              Accepted requests
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <IoCloseCircleOutline className="text-red-500 text-4xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Rejected</p>
            <p className="text-3xl font-bold">{rejectedRequests}</p>
            <p className="text-xs text-red-500 font-semibold">Not approved</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[720px] flex flex-col overflow-visible xl:col-span-8">
          <div className="p-5 border-b border-gray-100">
            <p className="text-xl font-bold">All Adoption Requests</p>
          </div>

          {paginatedRequests.length > 0 ? (
            <>
              <div className="hidden bg-gray-50 px-5 py-4 text-sm font-bold text-text xl:grid xl:grid-cols-[1.7fr_1.7fr_1.4fr_1.35fr_1.5fr_1.1fr_1fr] xl:gap-4">
                <div>Pet</div>
                <div>Applicant</div>
                <div>Request ID</div>
                <div>Requested On</div>
                <div>Visit Date & Time</div>
                <div>Status</div>
                <div className="text-center">Actions</div>
              </div>

              <div className="flex-1">
                {paginatedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="grid gap-3 border-t border-gray-100 px-4 py-4 relative sm:px-5 xl:grid-cols-[1.7fr_1.7fr_1.4fr_1.35fr_1.5fr_1.1fr_1fr] xl:items-center xl:gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={request.petData?.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">
                          {request.petData?.name}
                        </p>
                        <p className="text-xs text-text truncate">
                          {request.petData?.breed}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">
                        {request.applicantData?.fullName}
                      </p>
                      <p className="text-xs text-text truncate">
                        {request.applicantData?.email}
                      </p>
                    </div>

                    <p className="text-sm font-semibold truncate">
                      REQ-{request.id}
                    </p>

                    <p className="text-sm font-semibold">
                      {formatDate(request.createdAt)}
                    </p>

                    <div>
                      <p className="text-sm font-semibold">
                        {formatDate(request.visitPreference?.visitDate)}
                      </p>
                      <p className="text-xs text-text">
                        {request.visitPreference?.visitTime}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </div>

                    <div className="flex justify-center gap-2 relative">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-card hover:text-primary transition"
                      >
                        <FaRegEye />
                      </button>

                      {request.status === "Pending" && (
                        <button
                          onClick={() =>
                            setShowMoreId(
                              showMoreId === request.id ? null : request.id,
                            )
                          }
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <IoMdMore className="text-xl" />
                        </button>
                      )}

                      {showMoreId === request.id &&
                        request.status === "Pending" && (
                          <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-lg w-40 overflow-hidden z-30">
                            <button
                              onClick={() =>
                                updateRequestStatus(request, "Approved")
                              }
                              className="w-full text-left px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateRequestStatus(request, "Rejected")
                              }
                              className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 border-t border-gray-100"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-text font-semibold">
                  Showing {paginatedRequests.length} of{" "}
                  {filteredRequests.length} requests
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
              <IoPaw className="text-7xl text-gray-300 mb-4" />
              <p className="text-xl font-bold">No Adoption Requests Found</p>
              <p className="text-text mt-2">
                User adoption requests will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6 xl:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-5">
              <p className="text-lg font-bold">Today's Requests</p>
              <span className="text-primary font-semibold text-sm">
                {todayRequests.length}
              </span>
            </div>

            <div className="space-y-4">
              {todayRequests.length > 0 ? (
                todayRequests.slice(0, 4).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <img
                      src={request.petData?.image}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover object-top"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">
                        REQ-{request.id}
                      </p>
                      <p className="text-xs text-text truncate">
                        {request.applicantData?.fullName}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusStyle(
                        request.status,
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <IoPaw className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="font-bold">No requests today</p>
                  <p className="text-sm text-text mt-1">
                    Today's adoption requests will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-lg font-bold mb-5">Request Status Summary</p>

            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `conic-gradient(
                    #f59e0b 0deg ${
                      totalRequests
                        ? (pendingRequests / totalRequests) * 360
                        : 0
                    }deg,
                    #22c55e ${
                      totalRequests
                        ? (pendingRequests / totalRequests) * 360
                        : 0
                    }deg ${
                      totalRequests
                        ? ((pendingRequests + approvedRequests) /
                            totalRequests) *
                          360
                        : 0
                    }deg,
                    #ef4444 ${
                      totalRequests
                        ? ((pendingRequests + approvedRequests) /
                            totalRequests) *
                          360
                        : 0
                    }deg ${
                      totalRequests
                        ? ((pendingRequests +
                            approvedRequests +
                            rejectedRequests) /
                            totalRequests) *
                          360
                        : 0
                    }deg,
                    #9ca3af ${
                      totalRequests
                        ? ((pendingRequests +
                            approvedRequests +
                            rejectedRequests) /
                            totalRequests) *
                          360
                        : 0
                    }deg 360deg
                  )`,
                }}
              >
                <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold">{totalRequests}</p>
                  <p className="text-xs text-text">Total</p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-semibold flex-1">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    Pending
                  </span>
                  <span>{pendingRequests}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Approved
                  </span>
                  <span>{approvedRequests}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    Rejected
                  </span>
                  <span>{rejectedRequests}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                    Cancelled
                  </span>
                  <span>{cancelledRequests}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-5 pt-4 text-sm text-text">
              Updated just now
            </div>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
                  <IoPaw className="text-primary text-3xl" />
                </div>

                <div>
                  <p className="text-3xl font-bold">Adoption Request Details</p>
                  <p className="text-text mt-1">REQ-{selectedRequest.id}</p>
                </div>
              </div>

              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl"
              >
                ×
              </button>
            </div>

            <div className="px-8 pb-8 space-y-6">
              <div className="grid gap-4 rounded-2xl border border-pink-200 bg-pink-50 p-6 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-bold">
                    {formatDate(selectedRequest.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Visit Date</p>
                  <p className="font-bold">
                    {formatDate(selectedRequest.visitPreference?.visitDate)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Visit Time</p>
                  <p className="font-bold">
                    {selectedRequest.visitPreference?.visitTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-1 ${getStatusStyle(
                      selectedRequest.status,
                    )}`}
                  >
                    {getStatusIcon(selectedRequest.status)}
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <IoPaw className="text-primary text-3xl" />
                  <p className="text-2xl font-bold">Pet Information</p>
                </div>

                <div className="flex flex-col gap-6 md:flex-row">
                  <img
                    src={selectedRequest.petData?.image}
                    alt=""
                    className="w-36 h-36 rounded-2xl object-cover object-top"
                  />

                  <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <p className="text-sm text-text font-semibold">
                        Pet Name
                      </p>
                      <p className="text-xl font-bold">
                        {selectedRequest.petData?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">Type</p>
                      <p className="text-xl font-bold">
                        {selectedRequest.petData?.type}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">Breed</p>
                      <p className="text-xl font-bold">
                        {selectedRequest.petData?.breed}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">Age</p>
                      <p className="text-xl font-bold">
                        {selectedRequest.petData?.age}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-text font-semibold">Gender</p>
                      <p className="text-xl font-bold flex items-center gap-2">
                        {selectedRequest.petData?.gender === "Male" ? (
                          <IoMdMale className="text-blue-500" />
                        ) : (
                          <IoMdFemale className="text-primary" />
                        )}

                        {selectedRequest.petData?.gender}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaRegUser className="text-primary text-2xl" />
                    <p className="text-2xl font-bold">Applicant Information</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaRegUser className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">Name:</span>{" "}
                        {selectedRequest.applicantData?.fullName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <MdOutlineEmail className="text-primary text-xl" />
                      <p>
                        <span className="font-bold text-heading">Email:</span>{" "}
                        {selectedRequest.applicantData?.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaPhoneAlt className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">Phone:</span>{" "}
                        {selectedRequest.applicantData?.phone}
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <GrLocation className="text-primary mt-1" />
                      <p>
                        <span className="font-bold text-heading">Address:</span>{" "}
                        {selectedRequest.applicantData?.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <LuCalendarDays className="text-primary text-2xl" />
                    <p className="text-2xl font-bold">Visit Details</p>
                  </div>

                  <div className="space-y-4">
                    <p>
                      <span className="font-bold text-heading">
                        Visit Date:
                      </span>{" "}
                      {formatDate(selectedRequest.visitPreference?.visitDate)}
                    </p>

                    <p>
                      <span className="font-bold text-heading">
                        Visit Time:
                      </span>{" "}
                      {selectedRequest.visitPreference?.visitTime}
                    </p>

                    <p>
                      <span className="font-bold text-heading">
                        Visit Type:
                      </span>{" "}
                      Adoption Verification Visit
                    </p>

                    <p>
                      <span className="font-bold text-heading">Pickup:</span>{" "}
                      Center pickup after approval
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaRegHeart className="text-primary text-2xl" />
                  <p className="text-2xl font-bold">Adoption Details</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <PiHouseLine className="text-primary text-2xl" />

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Home Type
                      </p>
                      <p className="font-bold text-lg">
                        {selectedRequest.adoptionDetails?.homeType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <IoPaw className="text-primary text-2xl" />

                    <div>
                      <p className="text-sm text-text font-semibold">
                        Pet Experience
                      </p>
                      <p className="font-bold text-lg">
                        {selectedRequest.adoptionDetails?.petExperience}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-text font-semibold">
                      Reason for Adoption
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {selectedRequest.adoptionDetails?.reason}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
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

export default PetCenterAdoptionRequests;
