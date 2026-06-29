// import React from 'react'
import { useEffect, useState } from "react";
import { FaRegEye, FaRegUser, FaRegHeart } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { GoClock } from "react-icons/go";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { PiHouseLine } from "react-icons/pi";
import {
  getAllAdoptionRequestsAPI,
  updateAdoptionRequestAPI,
} from "../../services/allAPI";

const MyAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [activeTab, setActiveTab] = useState("All Requests");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const requestsPerPage = 5;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const loadAdoptions = async () => {
    const result = await getAllAdoptionRequestsAPI();

    if (result.status >= 200 && result.status < 300) {
      const userRequests = result.data
        .filter((request) => request.userId === currentUser?.id)
        .reverse();

      setAdoptions(userRequests);
    }
  };

  useEffect(() => {
    loadAdoptions();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not provided";

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  const filteredAdoptions =
    activeTab === "All Requests"
      ? adoptions
      : adoptions.filter((request) => request.status === activeTab);

  const totalPages = Math.ceil(filteredAdoptions.length / requestsPerPage);

  const paginatedAdoptions = filteredAdoptions.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage,
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleCancelRequest = async (request) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this adoption request?",
    );

    if (!confirmCancel) return;

    const result = await updateAdoptionRequestAPI(request.id, {
      status: "Cancelled",
      cancelledBy: "User",
      cancelledAt: new Date().toISOString(),
    });

    if (result.status >= 200 && result.status < 300) {
      alert("Adoption request cancelled");
      loadAdoptions();
    } else {
      alert("Failed to cancel request");
    }
  };

  const tabs = [
    {
      name: "All Requests",
      icon: <FaRegUser />,
    },
    {
      name: "Pending",
      icon: <GoClock />,
    },
    {
      name: "Approved",
      icon: <IoCheckmarkCircleOutline />,
    },
    {
      name: "Rejected",
      icon: <IoCloseCircleOutline />,
    },
    {
      name: "Cancelled",
      icon: <IoCloseCircleOutline />,
    },
  ];

  return (
    <>
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
        <p className="text-4xl font-bold mb-2">My Adoptions</p>

        <p className="text-text mb-6">
          Track your adoption requests and approval updates
        </p>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="border-b border-gray-100 mb-6">
            <div className="flex items-center gap-10 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 pb-4 font-semibold ${
                    activeTab === tab.name
                      ? "text-primary border-b-[3px] border-primary"
                      : "text-text hover:text-primary"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {paginatedAdoptions.length > 0 ? (
            <div>
              {paginatedAdoptions.map((request) => (
                <div
                  key={request.id}
                  className="grid grid-cols-12 gap-6 items-center py-5 border-b border-gray-100 last:border-b-0"
                >
                  <div className="col-span-3 flex items-center gap-4 min-w-0">
                    <img
                      src={request.petData?.image}
                      alt={request.petData?.name}
                      className="w-28 h-24 rounded-xl object-cover object-top flex-shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="text-2xl font-bold truncate">
                        {request.petData?.name}
                      </p>

                      <p className="text-text font-semibold truncate">
                        {request.petData?.breed}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-sm text-text font-semibold">
                        {request.petData?.gender === "Male" ? (
                          <IoMdMale className="text-blue-500 text-xl" />
                        ) : (
                          <IoMdFemale className="text-primary text-xl" />
                        )}

                        <span>{request.petData?.age}</span>
                        <span>•</span>
                        <span>{request.petData?.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 min-w-0">
                    <p className="text-sm text-text font-semibold">
                      Request ID
                    </p>

                    <p className="font-bold text-primary truncate">
                      ADP-{request.id}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm text-text font-semibold">
                      Requested On
                    </p>

                    <p className="font-bold">{formatDate(request.createdAt)}</p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm text-text font-semibold">
                      Visit Date & Time
                    </p>

                    <p className="font-bold">
                      {formatDate(request.visitPreference?.visitDate)}
                    </p>

                    <p className="font-semibold text-sm">
                      {request.visitPreference?.visitTime}
                    </p>
                  </div>

                  <div className="col-span-3 flex items-center justify-end gap-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${getStatusStyle(
                        request.status,
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>

                    <div className="flex flex-col gap-2 w-44">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="border border-gray-200 py-2 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                        <FaRegEye />
                        View Details
                      </button>

                      {(request.status === "Pending" ||
                        request.status === "Approved") && (
                        <button
                          onClick={() => handleCancelRequest(request)}
                          className="border border-primary text-primary py-2 rounded-xl font-semibold hover:bg-pink-card"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <IoPaw className="text-7xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-bold">No Adoption Requests Found</p>
              <p className="text-text mt-2">
                Your adoption requests will appear here.
              </p>
            </div>
          )}

          {filteredAdoptions.length > 0 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40"
              >
                <MdOutlineChevronLeft />
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
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40"
              >
                <MdOutlineChevronRight />
              </button>
            </div>
          )}
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
                  <p className="text-text mt-1">ADP-{selectedRequest.id}</p>
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
              <div className="border border-pink-200 bg-pink-50 rounded-2xl p-6 grid grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <LuCalendarDays className="text-primary text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Request Date</p>
                    <p className="font-bold">
                      {formatDate(selectedRequest.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <LuCalendarDays className="text-primary text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Visit Date</p>
                    <p className="font-bold">
                      {formatDate(selectedRequest.visitPreference?.visitDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <GoClock className="text-primary text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Visit Time</p>
                    <p className="font-bold">
                      {selectedRequest.visitPreference?.visitTime}
                    </p>
                  </div>
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

                <div className="flex gap-6">
                  <img
                    src={selectedRequest.petData?.image}
                    alt={selectedRequest.petData?.name}
                    className="w-36 h-36 rounded-2xl object-cover object-top"
                  />

                  <div className="grid grid-cols-4 gap-6 flex-1">
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

              <div className="grid grid-cols-2 gap-6">
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
                    <div className="flex items-center gap-3">
                      <LuCalendarDays className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">
                          Visit Date:
                        </span>{" "}
                        {formatDate(selectedRequest.visitPreference?.visitDate)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <GoClock className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">
                          Visit Time:
                        </span>{" "}
                        {selectedRequest.visitPreference?.visitTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <IoPaw className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">
                          Visit Type:
                        </span>{" "}
                        Adoption Verification Visit
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <GrLocation className="text-primary" />
                      <p>
                        <span className="font-bold text-heading">Pickup:</span>{" "}
                        Center pickup after approval
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaRegHeart className="text-primary text-2xl" />
                  <p className="text-2xl font-bold">Adoption Details</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
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

                  <div className="col-span-2">
                    <p className="text-sm text-text font-semibold">
                      Reason for Adoption
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {selectedRequest.adoptionDetails?.reason}
                    </p>
                  </div>
                </div>
              </div>

              {selectedRequest.status === "Rejected" && (
                <div className="border border-red-100 bg-red-50 rounded-2xl p-6">
                  <p className="text-xl font-bold text-red-500">
                    Request Rejected
                  </p>

                  <p className="text-text mt-2">
                    This request was rejected by admin.
                  </p>
                </div>
              )}

              {selectedRequest.status === "Cancelled" && (
                <div className="border border-gray-100 bg-gray-50 rounded-2xl p-6">
                  <p className="text-xl font-bold text-gray-600">
                    Request Cancelled
                  </p>

                  <p className="text-text mt-2">
                    This adoption request was cancelled by you.
                  </p>
                </div>
              )}

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
    </>
  );
};

export default MyAdoptions;
