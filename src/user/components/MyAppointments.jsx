import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineChevronLeft } from "react-icons/md";
import { MdOutlineChevronRight } from "react-icons/md";
import { Plus } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  addAppointmentAPI,
  getAppointmentsAPI,
  updateAppointmentAPI,
} from "../../services/allAPI";
import { FaClipboardList } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { LuDna } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { PiNotebookDuotone } from "react-icons/pi";
import { GrServices } from "react-icons/gr";
import { LiaDogSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import upiImg from "../../assets/upi-Photoroom.png";
import gpayImg from "../../assets/gpay-Photoroom.png";
import paytmImg from "../../assets/paytm-Photoroom.png";
import phonepeImg from "../../assets/phonepe-Photoroom.png";
import axisImg from "../../assets/AXIS-Photoroom.png";
import hdfcImg from "../../assets/HDFC-Photoroom.png";
import sbiImg from "../../assets/SBI-Photoroom.png";

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [showBookingModal, setShowBookingModal] = useState(false);

  const [step, setStep] = useState(1);

  const [selectedService, setSelectedService] = useState(null);

  const [appointmentData, setAppointmentData] = useState({
    service: "",
    subService: "",
    price: 0,
  });

  const [petData, setPetData] = useState({
    petName: "",
    petType: "",
    breed: "",
    age: "",
    gender: "",
    photo: "",
  });

  const [scheduleData, setScheduleData] = useState({
    date: new Date(),
    time: "",
    notes: "",
  });

  const canProceedStep2 = petData.petName && petData.petType && petData.breed;

  const canProceedStep3 = scheduleData.date && scheduleData.time;

  const [paymentData, setPaymentData] = useState({
    method: "",
    upiApp: "",
    upiId: "",
    cardType: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });

  const isPaymentValid =
    (paymentData.method === "UPI" &&
      paymentData.upiApp &&
      paymentData.upiId.includes("@")) ||
    (paymentData.method === "Credit / Debit Card" &&
      paymentData.cardType &&
      paymentData.cardNumber.length === 16 &&
      paymentData.cardName &&
      paymentData.expiry &&
      paymentData.cvv.length === 3) ||
    (paymentData.method === "Net Banking" &&
      paymentData.bankName &&
      paymentData.accountNumber &&
      paymentData.ifsc) ||
    paymentData.method === "Cash at Clinic";

  const isNextDisabled =
    (step === 1 && (!appointmentData.service || !appointmentData.subService)) ||
    (step === 2 && !canProceedStep2) ||
    (step === 3 && !canProceedStep3) ||
    (step === 5 && !isPaymentValid);

  const [appointments, setAppointments] = useState([]);

  const serviceOptions = [
    {
      id: "vet",
      name: "Veterinary Care",
      icon: "https://cdn-icons-png.flaticon.com/128/46/46196.png",
      subServices: [
        { name: "General Checkup", price: 600 },
        { name: "Emergency Consultation", price: 1000 },
        { name: "Health Certificate", price: 400 },
        { name: "Skin Treatment", price: 800 },
      ],
    },

    {
      id: "grooming",
      name: "Pet Grooming",
      icon: "https://cdn-icons-png.flaticon.com/128/1830/1830558.png",
      subServices: [
        { name: "Full Grooming", price: 499 },
        { name: "Hair Trimming", price: 299 },
        { name: "Nail Clipping", price: 199 },
        { name: "Bath & Blow Dry", price: 399 },
      ],
    },

    {
      id: "vaccination",
      name: "Vaccination",
      icon: "https://cdn-icons-png.flaticon.com/128/482/482012.png",
      subServices: [
        { name: "Puppy Vaccination", price: 350 },
        { name: "Annual Vaccination", price: 500 },
        { name: "Rabies Vaccine", price: 300 },
        { name: "Booster Dose", price: 250 },
      ],
    },

    {
      id: "dental",
      name: "Dental Care",
      icon: "https://cdn-icons-png.flaticon.com/128/5893/5893759.png",
      subServices: [
        { name: "Dental Cleaning", price: 700 },
        { name: "Oral Checkup", price: 400 },
        { name: "Tooth Extraction", price: 1200 },
        { name: "Gum Treatment", price: 900 },
      ],
    },

    {
      id: "boarding",
      name: "Pet Boarding",
      icon: "https://cdn-icons-png.flaticon.com/128/11201/11201086.png",
      subServices: [
        { name: "Day Care", price: 500 },
        { name: "Night Stay", price: 800 },
        { name: "Weekend Boarding", price: 1500 },
        { name: "Long Term Boarding", price: 3000 },
      ],
    },

    {
      id: "training",
      name: "Pet Training",
      icon: "https://cdn-icons-png.flaticon.com/128/6381/6381356.png",
      subServices: [
        { name: "Basic Obedience", price: 1000 },
        { name: "Advanced Training", price: 1800 },
        { name: "Puppy Training", price: 1200 },
        { name: "Behavior Correction", price: 2000 },
      ],
    },
  ];

  const serviceConfig = {
    "Veterinary Care": {
      title: "Veterinary Checkup",
      icon: "https://cdn-icons-png.flaticon.com/128/46/46196.png",
      description: "Regular health checkup and consultation",
      color: "blue",
    },

    "Pet Grooming": {
      title: "Pet Grooming",
      icon: "https://cdn-icons-png.flaticon.com/128/1830/1830558.png",
      description: "Professional grooming service",
      color: "yellow",
    },

    Vaccination: {
      title: "Vaccination",
      icon: "https://cdn-icons-png.flaticon.com/128/482/482012.png",
      description: "Pet vaccination service",
      color: "green",
    },

    "Dental Care": {
      title: "Dental Checkup",
      icon: "https://cdn-icons-png.flaticon.com/128/5893/5893759.png",
      description: "Dental cleaning and oral care",
      color: "red",
    },

    "Pet Boarding": {
      title: "Pet Boarding",
      icon: "https://cdn-icons-png.flaticon.com/128/11201/11201086.png",
      description: "Safe boarding service",
      color: "purple",
    },

    "Pet Training": {
      title: "Pet Training",
      icon: "https://cdn-icons-png.flaticon.com/128/6381/6381356.png",
      description: "Professional pet training",
      color: "orange",
    },
  };

  const tabs = [
    { label: "All Appointments", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const filteredAppointments =
    activeTab === "all"
      ? appointments
      : appointments.filter(
          (item) => item.status.toLowerCase() === activeTab.toLowerCase(),
        );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-500";
      default:
        return "";
    }
  };

  const getBorderColor = (color) => {
    switch (color) {
      case "blue":
        return "border-l-blue-500";

      case "yellow":
        return "border-l-yellow-500";

      case "green":
        return "border-l-green-500";

      case "red":
        return "border-l-red-500";

      case "purple":
        return "border-l-purple-500";

      case "orange":
        return "border-l-orange-500";

      default:
        return "border-l-primary";
    }
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("loading");

  const loadAppointments = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const result = await getAppointmentsAPI();

    if (result.status >= 200 && result.status < 300) {
      const userAppointments = result.data.filter(
        (item) => item.userId === currentUser.id,
      );

      setAppointments(userAppointments.reverse());
    }
  };

  const handleConfirmAppointment = () => {
    const service = serviceConfig[appointmentData.service];

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const newAppointment = {
      id: Date.now(),

      userId: currentUser.id,

      title: service.title,
      icon: service.icon,
      description: service.description,

      service: appointmentData.service,
      subService: appointmentData.subService,
      price: appointmentData.price,

      pet: `${petData.petName} (${petData.breed})`,
      petData,

      date: scheduleData.date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      day: scheduleData.date.toLocaleDateString("en-US", {
        weekday: "long",
      }),

      time: scheduleData.time,

      scheduleData,

      paymentMethod: paymentData.method,
      paymentDetails: {
        upiApp: paymentData.upiApp,
        upiId: paymentData.upiId,
        cardType: paymentData.cardType,
        cardNumber: paymentData.cardNumber
          ? `**** **** **** ${paymentData.cardNumber.slice(-4)}`
          : "",
        cardName: paymentData.cardName,
        bankName: paymentData.bankName,
        accountNumber: paymentData.accountNumber
          ? `XXXX${paymentData.accountNumber.slice(-4)}`
          : "",
        ifsc: paymentData.ifsc,
      },

      duration: "30 mins",
      location: "PawCare Center",
      city: "Kochi, Kerala",

      status: "Pending",

      color: service.color,

      createdAt: new Date().toISOString(),
    };

    const resetAfterBooking = () => {
      setShowBookingModal(false);

      setStep(1);
      setSelectedService(null);

      setAppointmentData({
        service: "",
        subService: "",
        price: 0,
      });

      setPetData({
        petName: "",
        petType: "",
        breed: "",
        age: "",
        gender: "",
        photo: "",
      });

      setScheduleData({
        date: new Date(),
        time: "",
        notes: "",
      });

      setPaymentData({
        method: "",
        upiApp: "",
        upiId: "",
        cardType: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
        bankName: "",
        accountNumber: "",
        ifsc: "",
      });
    };

    if (paymentData.method === "Cash at Clinic") {
      addAppointmentAPI(newAppointment).then(() => {
        loadAppointments();
        resetAfterBooking();
        alert("Appointment booked successfully");
      });

      return;
    }

    setShowPaymentModal(true);
    setPaymentStatus("loading");
    setShowBookingModal(false);

    setTimeout(async () => {
      setPaymentStatus("success");

      await addAppointmentAPI(newAppointment);

      loadAppointments();

      resetAfterBooking();
    }, 3000);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const handleUpdateAppointment = async () => {
    const service = serviceConfig[appointmentData.service];

    const updatedAppointment = {
      id: editingAppointmentId,

      userId: selectedAppointment.userId,

      title: service.title,
      icon: service.icon,
      description: service.description,

      service: appointmentData.service,
      subService: appointmentData.subService,
      price: appointmentData.price,

      pet: `${petData.petName} (${petData.breed})`,
      petData,

      date: scheduleData.date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      day: scheduleData.date.toLocaleDateString("en-US", {
        weekday: "long",
      }),

      time: scheduleData.time,

      scheduleData,

      paymentMethod: paymentData.method,

      duration: "30 mins",
      location: "PawCare Center",
      city: "Kochi, Kerala",

      status: selectedAppointment.status,

      color: service.color,

      createdAt: selectedAppointment.createdAt,
    };

    const result = await updateAppointmentAPI(
      editingAppointmentId,
      updatedAppointment,
    );

    if (result.status >= 200 && result.status < 300) {
      loadAppointments();
    }

    setShowBookingModal(false);

    resetForm();

    setIsEditMode(false);
    setEditingAppointmentId(null);

    setStep(1);
  };

  const handleEditAppointment = () => {
    if (!selectedAppointment) return;

    setIsEditMode(true);
    setEditingAppointmentId(selectedAppointment.id);

    const selectedServiceData = serviceOptions.find(
      (service) => service.name === selectedAppointment.service,
    );

    setSelectedService(selectedServiceData);

    setAppointmentData({
      service: selectedAppointment.service,
      subService: selectedAppointment.subService,
      price: selectedAppointment.price,
    });

    setPetData({
      petName: selectedAppointment.petData?.petName || "",
      petType: selectedAppointment.petData?.petType || "",
      breed: selectedAppointment.petData?.breed || "",
      age: selectedAppointment.petData?.age || "",
      gender: selectedAppointment.petData?.gender || "",
      photo: selectedAppointment.petData?.photo || "",
    });

    setScheduleData({
      date: selectedAppointment.scheduleData?.date
        ? new Date(selectedAppointment.scheduleData.date)
        : new Date(),
      time: selectedAppointment.time,
      notes: selectedAppointment.scheduleData?.notes || "",
    });

    setPaymentData({
      method: selectedAppointment.paymentMethod || "",
      upiId: "",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
      accountNumber: "",
      ifsc: "",
    });

    setShowViewModal(false);
    setStep(1);
    setShowBookingModal(true);
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditingAppointmentId(null);
    setStep(1);
  };

  const isPaymentLocked =
    isEditMode &&
    selectedAppointment &&
    selectedAppointment.paymentMethod !== "Cash at Clinic";

  const isLastEditableStep = isEditMode && step === 4 && isPaymentLocked;

  const handleCancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmCancel) return;

    const appointment = appointments.find((item) => item.id === id);

    const updatedAppointment = {
      ...appointment,
      status: "Cancelled",
    };

    const result = await updateAppointmentAPI(id, updatedAppointment);

    if (result.status >= 200 && result.status < 300) {
      loadAppointments();
    }
  };

  const paymentMethods = [
    {
      name: "Cash at Clinic",
      img: "https://cdn-icons-png.flaticon.com/128/6491/6491511.png",
    },
    {
      name: "UPI",
      img: upiImg,
    },
    {
      name: "Credit / Debit Card",
      img: "https://cdn-icons-png.flaticon.com/128/8983/8983163.png",
    },
    {
      name: "Net Banking",
      img: "https://cdn-icons-png.flaticon.com/128/14366/14366959.png",
    },
  ];

  const upiApps = [
    { name: "Google Pay", img: gpayImg },
    { name: "Paytm", img: paytmImg },
    { name: "PhonePe", img: phonepeImg },
  ];

  const cardTypes = [
    {
      name: "Visa",
      img: "https://cdn-icons-png.flaticon.com/128/5968/5968299.png",
    },
    {
      name: "Master Card",
      img: "https://cdn-icons-png.flaticon.com/128/14082/14082959.png",
    },
    {
      name: "RuPay",
      img: "https://cdn-icons-png.flaticon.com/128/11378/11378315.png",
    },
  ];

  const banks = [
    { name: "Axis Bank", img: axisImg },
    { name: "HDFC Bank", img: hdfcImg },
    { name: "SBI Bank", img: sbiImg },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
      <p className="text-4xl font-bold mb-2">My Appointments</p>

      <p className="text-text mb-6">
        View and manage all your pet care appointments
      </p>

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => {
              setShowBookingModal(true);
              setStep(1);
            }}
            className="flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-xl font-semibold hover:bg-pink-card transition"
          >
            <Plus size={18} />
            Book New Appointment
          </button>
        </div>

        <div className="border border-gray-100 shadow-sm rounded-2xl p-4 mb-6">
          <div className="flex gap-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`pb-2 font-semibold transition cursor-pointer ${
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
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item) => (
              <div
                key={item.id}
                className={`bg-white border-l-4 ${getBorderColor(
                  item.color,
                )} rounded-3xl shadow-sm p-4`}
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-pink-card flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <p className="text-xl font-bold">{item.title}</p>

                    <p className="text-sm text-text mt-1">{item.description}</p>

                    <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                      <FaPaw className="text-primary text-xs" />
                      {item.pet}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <LuCalendar className="text-primary text-lg" />

                      <span className="font-semibold text-sm">{item.date}</span>
                    </div>

                    <p className="text-xs text-text ml-6">{item.day}</p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <LuClock3 className="text-primary text-lg" />

                      <span className="font-semibold text-sm">{item.time}</span>
                    </div>

                    <p className="text-xs text-text ml-6">{item.duration}</p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <SlLocationPin className="text-primary text-lg" />

                      <span className="font-semibold text-sm">
                        {item.location}
                      </span>
                    </div>

                    <p className="text-xs text-text ml-6">{item.city}</p>
                  </div>

                  <div className="col-span-1 flex flex-col items-end gap-3">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAppointment(item);
                          setShowViewModal(true);
                        }}
                        className="border border-primary text-primary px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-pink-card"
                      >
                        View
                      </button>

                      {item.status === "Pending" && (
                        <button
                          onClick={() => handleCancelAppointment(item.id)}
                          className="border border-red-300 text-red-500 px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-red-100"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <img
                src="https://cdn-icons-png.flaticon.com/128/747/747310.png"
                alt=""
                className="w-20 mx-auto mb-4"
              />

              <p className="text-xl font-bold">No Appointments Found</p>

              <p className="text-text mt-2">
                No appointments available in this category.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          <button className="w-10 h-10 rounded-full shadow-lg bg-white flex items-center justify-center">
            <MdOutlineChevronLeft size={22} />
          </button>

          <button className="w-10 h-10 rounded-full bg-pink-200 text-primary font-bold">
            1
          </button>

          <button className="w-10 h-10 rounded-full shadow bg-white font-semibold">
            2
          </button>

          <button className="w-10 h-10 rounded-full shadow-lg bg-white flex items-center justify-center">
            <MdOutlineChevronRight size={22} />
          </button>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-3xl max-h-[90vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-bold">
                    {isEditMode ? "Edit Appointment" : "Book Appointment"}
                  </p>
                  <p className="text-gray-500">Step {step} of 5</p>
                </div>

                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    resetForm();
                  }}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>

              {step === 1 && (
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <p className="text-xl font-bold mb-2">Select Service</p>

                    <p className="text-sm text-text mb-5">
                      Choose the type of service you need for your pet
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {serviceOptions.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service);

                            setAppointmentData((prev) => ({
                              ...prev,
                              service: service.name,
                              subService: "",
                              price: 0,
                            }));
                          }}
                          className={`relative shadow-sm rounded-2xl p-5 transition cursor-pointer ${selectedService?.id === service.id ? "border-primary bg-pink-card" : "border-gray-200 hover:border-primary"}`}
                        >
                          {selectedService?.id === service.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                              ✓
                            </div>
                          )}

                          <img
                            src={service.icon}
                            alt=""
                            className="w-12 h-12 mx-auto mb-3"
                          />

                          <p className="font-semibold text-sm">
                            {service.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xl font-bold mb-2">Select Sub Service</p>

                    <p className="text-sm text-text mb-5">
                      Choose a specific service
                    </p>

                    <div className="border rounded-2xl overflow-hidden">
                      {selectedService ? (
                        selectedService.subServices.map((sub) => (
                          <label
                            key={sub.name}
                            className="flex items-center gap-3 p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="subService"
                              checked={appointmentData.subService === sub.name}
                              onChange={() =>
                                setAppointmentData({
                                  ...appointmentData,
                                  subService: sub.name,
                                  price: sub.price,
                                })
                              }
                              className="accent-pink-500"
                            />

                            <span>{sub.name}</span>
                            <span className="ml-auto font-semibold text-primary">
                              ₹{sub.price}
                            </span>
                          </label>
                        ))
                      ) : (
                        <div className="h-[260px] flex items-center justify-center text-gray-400">
                          Select a service first
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold">Pet Information</h3>

                    <p className="text-text mt-1">
                      Please provide details about your pet
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Pet Name *
                      </label>

                      <input
                        type="text"
                        value={petData.petName}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            petName: e.target.value,
                          })
                        }
                        placeholder="Tommy"
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Age
                      </label>

                      <input
                        type="text"
                        value={petData.age}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            age: e.target.value,
                          })
                        }
                        placeholder="3 Years"
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Pet Type *
                      </label>

                      <select
                        value={petData.petType}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            petType: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      >
                        <option value="">Select Type</option>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Bird</option>
                        <option>Rabbit</option>
                        <option>Hamster</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Gender
                      </label>

                      <select
                        value={petData.gender}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            gender: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Breed *
                      </label>

                      <input
                        type="text"
                        value={petData.breed}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            breed: e.target.value,
                          })
                        }
                        placeholder="Golden Retriever"
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2 block">
                        Pet Photo (Optional)
                      </label>

                      <input
                        type="url"
                        value={petData.photo}
                        onChange={(e) =>
                          setPetData({
                            ...petData,
                            photo: e.target.value,
                          })
                        }
                        placeholder="Image URL"
                        className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-8">
                    <p className="text-2xl font-bold">Choose Date & Time</p>

                    <p className="text-text mt-1">
                      Select a convenient date and time for your appointment
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="font-semibold text-sm mb-3 block">
                        Select Date *
                      </label>

                      <div className="border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <DayPicker
                          mode="single"
                          disabled={{ before: new Date() }}
                          selected={scheduleData.date}
                          onSelect={(date) =>
                            date &&
                            setScheduleData({
                              ...scheduleData,
                              date,
                            })
                          }
                          classNames={{
                            selected: "bg-pink-400 text-white rounded-full",
                            today: "text-primary font-bold",
                            chevron: "fill-primary",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-3 block">
                        Select Time *
                      </label>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          "09:00 AM",
                          "10:00 AM",
                          "11:00 AM",
                          "12:00 PM",
                          "02:00 PM",
                          "03:00 PM",
                          "04:00 PM",
                          "05:00 PM",
                          "06:00 PM",
                        ].map((time) => (
                          <button
                            key={time}
                            onClick={() =>
                              setScheduleData({
                                ...scheduleData,
                                time,
                              })
                            }
                            className={`border rounded-xl py-3 font-medium transition ${
                              scheduleData.time === time
                                ? "border-primary bg-pink-card text-primary"
                                : "border-gray-200 hover:border-primary"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6">
                        <label className="font-semibold text-sm mb-3 block">
                          Additional Notes (Optional)
                        </label>

                        <textarea
                          rows="3"
                          value={scheduleData.notes}
                          onChange={(e) =>
                            setScheduleData({
                              ...scheduleData,
                              notes: e.target.value,
                            })
                          }
                          placeholder="Any specific requirements or notes..."
                          className="w-full border border-gray-200 rounded-xl p-3 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="mb-8">
                    <p className="text-2xl font-bold">
                      Review Your Appointment
                    </p>

                    <p className="text-text mt-1">
                      Please review the details before confirming
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
                        <img
                          src={selectedService?.icon}
                          alt=""
                          className="w-8 h-8"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Service Details</p>

                        <p className="font-bold text-lg">
                          {appointmentData.service}
                        </p>
                        <p className="font-semibold text-primary">
                          ₹{appointmentData.price}
                        </p>

                        <p className="text-text">
                          {appointmentData.subService}
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                          <FaPaw className="text-purple-500 text-2xl" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Pet Details</p>

                          <p className="font-bold text-lg">{petData.petName}</p>

                          <p className="text-sm text-gray-600">
                            {petData.petType} • {petData.breed}
                          </p>

                          <p className="text-sm text-gray-600">
                            {petData.age && `${petData.age} • `}
                            {petData.gender}
                          </p>
                        </div>
                      </div>

                      {petData.photo && (
                        <img
                          src={petData.photo}
                          alt=""
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <LuCalendar className="text-purple-500 text-2xl" />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>

                        <p className="font-bold">
                          {scheduleData.date?.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            weekday: "long",
                          })}
                        </p>

                        <p className="text-text">{scheduleData.time}</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-16 h-16 min-w-16 min-h-16 rounded-full bg-pink-card flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-2xl">📝</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500">
                          Additional Notes
                        </p>

                        <p className="text-text break-words whitespace-pre-wrap">
                          {scheduleData.notes
                            ? scheduleData.notes
                            : "No additional notes"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <div className="mb-8">
                    <p className="text-2xl font-bold">Payment</p>

                    <p className="text-text mt-1">
                      Choose your preferred payment method
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.name}
                        className={`border rounded-2xl p-4 cursor-pointer ${
                          paymentData.method === method.name
                            ? "border-primary bg-pink-card"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentData.method === method.name}
                            onChange={() =>
                              setPaymentData({
                                method: method.name,
                                upiApp: "",
                                upiId: "",
                                cardType: "",
                                cardNumber: "",
                                cardName: "",
                                expiry: "",
                                cvv: "",
                                bankName: "",
                                accountNumber: "",
                                ifsc: "",
                              })
                            }
                            className="accent-pink-500"
                          />

                          <img
                            src={method.img}
                            alt=""
                            className="w-10 h-10 object-contain"
                          />

                          <span className="font-semibold">{method.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {paymentData.method === "UPI" && (
                    <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                      <p className="font-bold mb-4">Select UPI App</p>

                      <div className="grid grid-cols-3 gap-4">
                        {upiApps.map((app) => (
                          <button
                            key={app.name}
                            type="button"
                            onClick={() =>
                              setPaymentData({
                                ...paymentData,
                                upiApp: app.name,
                              })
                            }
                            className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                              paymentData.upiApp === app.name
                                ? "border-primary bg-pink-card text-primary"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <img src={app.img} alt="" className="w-10 h-10" />
                            {app.name}
                          </button>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="Enter UPI ID, example: name@upi"
                        value={paymentData.upiId}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            upiId: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl p-3 mt-4"
                      />
                    </div>
                  )}

                  {paymentData.method === "Credit / Debit Card" && (
                    <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                      <p className="font-bold mb-4">Select Card Type</p>

                      <div className="grid grid-cols-3 gap-4">
                        {cardTypes.map((card) => (
                          <button
                            key={card.name}
                            type="button"
                            onClick={() =>
                              setPaymentData({
                                ...paymentData,
                                cardType: card.name,
                              })
                            }
                            className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                              paymentData.cardType === card.name
                                ? "border-primary bg-pink-card text-primary"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <img src={card.img} alt="" className="w-10 h-10" />
                            {card.name}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-3 mt-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={paymentData.cardNumber}
                          maxLength="16"
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cardNumber: e.target.value,
                            })
                          }
                          className="w-full border rounded-xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="Card Holder Name"
                          value={paymentData.cardName}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cardName: e.target.value,
                            })
                          }
                          className="w-full border rounded-xl p-3"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentData.expiry}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                expiry: e.target.value,
                              })
                            }
                            className="border rounded-xl p-3"
                          />

                          <input
                            type="password"
                            placeholder="CVV"
                            value={paymentData.cvv}
                            maxLength="3"
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cvv: e.target.value,
                              })
                            }
                            className="border rounded-xl p-3"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentData.method === "Net Banking" && (
                    <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                      <p className="font-bold mb-4">Select Bank</p>

                      <div className="grid grid-cols-3 gap-4">
                        {banks.map((bank) => (
                          <button
                            key={bank.name}
                            type="button"
                            onClick={() =>
                              setPaymentData({
                                ...paymentData,
                                bankName: bank.name,
                              })
                            }
                            className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                              paymentData.bankName === bank.name
                                ? "border-primary bg-pink-card text-primary"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <img src={bank.img} alt="" className="w-10 h-10" />
                            {bank.name}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-3 mt-4">
                        <input
                          type="text"
                          placeholder="Account Number"
                          value={paymentData.accountNumber}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              accountNumber: e.target.value,
                            })
                          }
                          className="w-full border rounded-xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="IFSC Code"
                          value={paymentData.ifsc}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              ifsc: e.target.value,
                            })
                          }
                          className="w-full border rounded-xl p-3"
                        />
                      </div>
                    </div>
                  )}

                  {paymentData.method === "Cash at Clinic" && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      Pay directly at the clinic during your appointment. No
                      payment animation needed.
                    </div>
                  )}

                  <div className="mt-6 border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between">
                      <span>Appointment Fee</span>
                      <span>₹{appointmentData.price}</span>
                    </div>

                    <div className="flex justify-between mt-2 font-bold text-lg">
                      <span>Total</span>
                      <span>₹{appointmentData.price}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between p-6 border-t border-t-gray-100 shadow-lg rounded-b-3xl bg-white">
              <button
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className="px-5 py-2 border rounded-xl"
              >
                Back
              </button>

              {isLastEditableStep ? (
                <button
                  onClick={handleUpdateAppointment}
                  className="bg-primary text-white px-5 py-2 rounded-xl"
                >
                  Confirm Edits
                </button>
              ) : step < 5 ? (
                <button
                  disabled={isNextDisabled}
                  onClick={() => setStep(step + 1)}
                  className={`px-6 py-3 rounded-xl font-semibold text-white ${
                    isNextDisabled
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary"
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={
                    isEditMode
                      ? handleUpdateAppointment
                      : handleConfirmAppointment
                  }
                  className="bg-primary text-white px-5 py-2 rounded-xl"
                >
                  {isEditMode ? "Confirm Edits" : "Confirm Appointment"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl text-center w-[400px]">
            {paymentStatus === "loading" && (
              <>
                <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto"></div>

                <h2 className="text-xl font-bold mt-4">
                  Processing Payment...
                </h2>

                <p className="text-gray-500 mt-2">
                  Please wait while we confirm your payment
                </p>
              </>
            )}

            {paymentStatus === "success" && (
              <>
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✓
                </div>

                <h2 className="text-xl font-bold text-green-600 mt-4">
                  Payment Successful
                </h2>

                <p className="text-gray-500 mt-2">
                  Appointment booked successfully
                </p>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="mt-5 bg-primary text-white px-5 py-2 rounded-xl"
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showViewModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-between items-center p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
                  <FaClipboardList className="text-primary text-3xl" />
                </div>

                <div>
                  <p className="text-3xl font-bold">Appointment Details</p>
                  <p className="text-text">View your appointment information</p>
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
                          {selectedAppointment.petData?.petName}
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
                          {selectedAppointment.petData?.petType}
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
                          {selectedAppointment.petData?.breed}
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
                          {selectedAppointment.petData?.age || "N/A"}
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
                          {selectedAppointment.petData?.gender || "N/A"}
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
            </div>

            <div className="px-8 py-5 flex justify-end gap-4 rounded-b-3xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-8 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
              >
                Close
              </button>

              {selectedAppointment.status !== "Cancelled" && (
                <button
                  onClick={handleEditAppointment}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90"
                >
                  <FaPencilAlt /> Edit Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
