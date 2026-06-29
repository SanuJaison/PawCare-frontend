import { useEffect, useState } from "react";
import { FaPaw, FaRegEye } from "react-icons/fa";
import { LuCalendar, LuClock, LuDna } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { ImCheckmark } from "react-icons/im";
import { GoClock } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { PiNotebookDuotone } from "react-icons/pi";
import { GrServices } from "react-icons/gr";
import { LiaDogSolid } from "react-icons/lia";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  deleteAppointmentAPI,
  getAppointmentsAPI,
  updateAppointmentAPI,
} from "../../services/allAPI";

const PetCenterAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showMoreId, setShowMoreId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadAppointments = async () => {
    const result = await getAppointmentsAPI();

    if (result.status >= 200 && result.status < 300) {
      setAppointments([...result.data].reverse());
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const displayValue = (value) => {
    return value ? value : "Not provided";
  };

  const formatSelectedDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatHeadingDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  const selectedDateString = formatSelectedDate(selectedDate);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Completed":
        return "bg-blue-100 text-blue-600";
      case "Cancelled":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const updateStatus = async (appointment, status) => {
    const updatedAppointment = {
      ...appointment,
      status,
    };

    const result = await updateAppointmentAPI(
      appointment.id,
      updatedAppointment,
    );

    if (result.status >= 200 && result.status < 300) {
      alert(`Appointment marked as ${status}`);
      setShowMoreId(null);
      loadAppointments();
    } else {
      alert("Failed to update appointment status");
    }
  };

  const handleDeleteAppointment = async (appointment) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this completed appointment?",
    );

    if (!confirmDelete) return;

    const result = await deleteAppointmentAPI(appointment.id);

    if (result.status >= 200 && result.status < 300) {
      alert("Appointment deleted successfully");
      setShowMoreId(null);
      loadAppointments();
    } else {
      alert("Failed to delete appointment");
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowViewModal(true);
    setShowMoreId(null);
  };

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.petData?.petName?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.petData?.breed?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.petData?.petType?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.service?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.subService?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.date?.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.time?.toLowerCase().includes(searchKey.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const selectedDateAppointments = appointments.filter(
    (item) => item.date === selectedDateString,
  );

  const totalAppointments = appointments.length;

  const confirmedAppointments = appointments.filter(
    (item) => item.status === "Upcoming",
  ).length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending",
  ).length;

  const completedAppointments = appointments.filter(
    (item) => item.status === "Completed",
  ).length;

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      <div className="flex justify-between items-start gap-5">
        <div>
          <p className="text-3xl font-bold text-heading">Appointments</p>

          <p className="text-text font-semibold mt-2">
            Manage all booked appointments and service requests
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search appointments..."
              className="w-72 border border-gray-200 bg-white rounded-xl px-4 py-3 pr-10 outline-none focus:border-primary"
            />

            <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-48 border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
              <LuCalendar className="text-primary text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">
                Total Appointments
              </p>
              <p className="text-3xl font-bold mt-1">{totalAppointments}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                All booked services
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <ImCheckmark className="text-green-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Confirmed</p>
              <p className="text-3xl font-bold mt-1">{confirmedAppointments}</p>
              <p className="text-green-600 text-xs font-semibold mt-1">
                Upcoming appointments
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <GoClock className="text-yellow-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Pending</p>
              <p className="text-3xl font-bold mt-1">{pendingAppointments}</p>
              <p className="text-yellow-600 text-xs font-semibold mt-1">
                Waiting for approval
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <ImCheckmark className="text-blue-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Completed</p>
              <p className="text-3xl font-bold mt-1">{completedAppointments}</p>
              <p className="text-blue-600 text-xs font-semibold mt-1">
                Finished services
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[620px] flex flex-col overflow-visible">
          <div className="p-5 border-b border-gray-100">
            <p className="text-xl font-bold">All Appointments</p>
          </div>

          {paginatedAppointments.length > 0 ? (
            <>
              <div className="grid grid-cols-[2fr_2.3fr_1.5fr_1.1fr_1.3fr_1fr] gap-5 bg-gray-50 px-6 py-4 text-sm font-bold text-text">
                <div>Pet</div>
                <div>Service</div>
                <div>Date</div>
                <div>Time</div>
                <div>Status</div>
                <div className="text-center">Actions</div>
              </div>

              <div className="flex-1">
                {paginatedAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[2fr_2.3fr_1.5fr_1.1fr_1.3fr_1fr] gap-5 items-center px-6 py-5 border-t border-gray-100 relative"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {item.petData?.photo ? (
                        <img
                          src={item.petData.photo}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-pink-card flex items-center justify-center flex-shrink-0">
                          <FaPaw className="text-primary text-xl" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="font-bold truncate">
                          {item.petData?.petName || "Pet Name"}
                        </p>
                        <p className="text-sm text-text truncate">
                          {item.petData?.breed || "Breed not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 min-w-0">
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt=""
                          className="w-9 h-9 object-contain flex-shrink-0"
                        />
                      ) : (
                        <FaPaw className="text-primary flex-shrink-0" />
                      )}

                      <div className="min-w-0">
                        <p className="font-bold truncate">{item.service}</p>
                        <p className="text-sm text-text truncate">
                          {item.subService}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-sm">{item.date}</p>
                      <p className="text-xs text-text">{item.day}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm whitespace-nowrap">
                        {item.time}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex justify-center gap-2 relative">
                      <button
                        onClick={() => handleViewAppointment(item)}
                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-card hover:text-primary transition"
                      >
                        <FaRegEye />
                      </button>

                      <button
                        onClick={() =>
                          setShowMoreId(showMoreId === item.id ? null : item.id)
                        }
                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <IoMdMore className="text-xl" />
                      </button>

                      {showMoreId === item.id && (
                        <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-lg w-40 overflow-hidden z-30">
                          {item.status !== "Completed" && (
                            <>
                              {item.status !== "Upcoming" && (
                                <button
                                  onClick={() => updateStatus(item, "Upcoming")}
                                  className="w-full text-left px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
                                >
                                  Confirm
                                </button>
                              )}

                              {item.status !== "Cancelled" && (
                                <button
                                  onClick={() =>
                                    updateStatus(item, "Cancelled")
                                  }
                                  className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 border-t border-gray-100"
                                >
                                  Reject
                                </button>
                              )}

                              <button
                                onClick={() => updateStatus(item, "Completed")}
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 border-t border-gray-100"
                              >
                                Completed
                              </button>
                            </>
                          )}

                          {item.status === "Completed" && (
                            <button
                              onClick={() => handleDeleteAppointment(item)}
                              className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                            >
                              Delete
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
                  Showing {paginatedAppointments.length} of{" "}
                  {filteredAppointments.length} appointments
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
            <div className="text-center py-16 flex-1 flex flex-col justify-center">
              <LuCalendar className="text-7xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-bold">No Appointments Found</p>
              <p className="text-text mt-2">
                User booked appointments will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-5">
              <p className="text-lg font-bold">
                {formatHeadingDate(selectedDate)} Appointments
              </p>

              <span className="text-primary font-semibold text-sm">
                {selectedDateAppointments.length}
              </span>
            </div>

            <div className="space-y-4">
              {selectedDateAppointments.length > 0 ? (
                selectedDateAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <p className="w-20 text-sm font-bold">{item.time}</p>

                    {item.petData?.photo ? (
                      <img
                        src={item.petData.photo}
                        alt=""
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-pink-card flex items-center justify-center">
                        <FaPaw className="text-primary" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">
                        {item.petData?.petName || "Pet Name"}{" "}
                        <span className="font-semibold text-text">
                          ({item.petData?.breed || "Breed"})
                        </span>
                      </p>
                      <p className="text-xs text-text truncate">
                        {item.service}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <LuCalendar className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="font-bold">No appointments</p>
                  <p className="text-sm text-text mt-1">
                    No bookings on this date.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-lg font-bold mb-4">Calendar</p>

            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              classNames={{
                selected: "bg-primary text-white rounded-full",
                today: "text-primary font-bold",
                chevron: "fill-primary",
              }}
            />

            <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Confirmed
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                Pending
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Completed
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Rejected
              </div>
            </div>
          </div>
        </div>
      </div>

      {showViewModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
                  <FaClipboardList className="text-primary text-3xl" />
                </div>

                <div>
                  <p className="text-3xl font-bold">Appointment Details</p>
                  <p className="text-text">View appointment information</p>
                </div>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl"
              >
                ×
              </button>
            </div>

            <div className="px-8 pb-8">
              <div className="border border-pink-200 bg-pink-50 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Appointment ID</p>

                  <p className="font-bold text-2xl">
                    #{selectedAppointment.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-2">Status</p>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      selectedAppointment.status,
                    )}`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <GrServices className="text-primary text-3xl" />

                  <h3 className="text-2xl font-bold">Service Information</h3>

                  <div className="flex-1 border-b border-gray-200 ml-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pb-5 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                      <img
                        src={selectedAppointment.icon}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Service</p>

                      <p className="font-bold text-lg">
                        {selectedAppointment.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                      <VscTypeHierarchySub className="text-green-500 text-3xl" />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Sub Service</p>

                      <p className="font-bold text-lg">
                        {selectedAppointment.subService}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-gray-500">Price</p>

                  <p className="text-primary text-3xl font-bold">
                    ₹{selectedAppointment.price}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <LiaDogSolid className="text-primary text-4xl" />

                  <h3 className="text-2xl font-bold">Pet Information</h3>

                  <div className="flex-1 border-b border-gray-200 ml-4"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div>
                    {selectedAppointment.petData?.photo ? (
                      <img
                        src={selectedAppointment.petData.photo}
                        alt=""
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-pink-card flex items-center justify-center">
                        <FaPaw className="text-primary text-5xl" />
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-x-12 gap-y-6 flex-1">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
                        <MdDriveFileRenameOutline className="text-primary text-2xl" />
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Pet Name</p>

                        <p className="font-bold text-lg">
                          {displayValue(selectedAppointment.petData?.petName)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                        <VscTypeHierarchySub className="text-purple-500 text-2xl" />
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Pet Type</p>

                        <p className="font-bold text-lg">
                          {displayValue(selectedAppointment.petData?.petType)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <LuDna className="text-yellow-500 text-2xl" />
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Breed</p>

                        <p className="font-bold text-lg">
                          {displayValue(selectedAppointment.petData?.breed)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <FaRegCalendarAlt className="text-green-500 text-xl" />
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Age</p>

                        <p className="font-bold text-lg">
                          {displayValue(selectedAppointment.petData?.age)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        {selectedAppointment.petData?.gender === "Female" ? (
                          <IoFemaleSharp className="text-pink-500 text-2xl" />
                        ) : (
                          <IoMaleSharp className="text-blue-500 text-2xl" />
                        )}
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Gender</p>

                        <p className="font-bold text-lg">
                          {displayValue(selectedAppointment.petData?.gender)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <FaRegCalendarAlt className="text-primary text-3xl" />

                  <h3 className="text-2xl font-bold">Schedule Information</h3>

                  <div className="flex-1 border-b border-gray-200 ml-4"></div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid md:grid-cols-3 gap-8">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <FaRegCalendarAlt className="text-blue-500 text-xl" />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Date</p>

                      <p className="font-bold">{selectedAppointment.date}</p>

                      <p className="text-sm text-gray-500">
                        {selectedAppointment.day}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <LuClock className="text-blue-500 text-xl" />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Time</p>

                      <p className="font-bold">{selectedAppointment.time}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                      <PiNotebookDuotone className="text-yellow-500 text-xl" />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Notes</p>

                      <p className="font-bold">
                        {selectedAppointment.scheduleData?.notes ||
                          "No notes provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <MdPayment className="text-primary text-3xl" />

                  <h3 className="text-2xl font-bold">Payment Information</h3>

                  <div className="flex-1 border-b border-gray-200 ml-4"></div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 grid md:grid-cols-2 gap-8">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <MdPayment className="text-green-600 text-xl" />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Payment Method</p>

                      <p className="font-bold text-lg">
                        {selectedAppointment.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      {selectedAppointment.paymentMethod ===
                      "Cash at Clinic" ? (
                        <MdPayment className="text-green-600 text-xl" />
                      ) : (
                        <IoCheckmarkCircleOutline className="text-green-600 text-2xl" />
                      )}
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Payment Status</p>

                      <p className="font-bold text-lg">
                        {selectedAppointment.paymentMethod === "Cash at Clinic"
                          ? "Pay at Clinic"
                          : "Paid"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
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

export default PetCenterAppointments;
