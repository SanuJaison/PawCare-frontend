// import React from 'react'
import { IoPaw, IoReload } from "react-icons/io5";
import AdoptionPetCard from "./AdoptionPetCard";
import luna from "../../assets/labrador.jpg";
import milo from "../../assets/tabby.jpg";
import rocky from "../../assets/beagle.jpg";
import simba from "../../assets/persian cat.jpg";
import buddy from "../../assets/shih tzu.jpg";
import oreo from "../../assets/domestic shorthair.jpg";
import snowy from "../../assets//spitz.jpg";
import coco from "../../assets/calico.jpg";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose, MdOutlineArticle } from "react-icons/md";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { LuCalendarDays, LuClock3 } from "react-icons/lu";
import { GrCircleInformation } from "react-icons/gr";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { addAdoptionRequestAPI, getAllPetsAPI } from "../../services/allAPI";

const AdoptionPage = () => {
  const navigate = useNavigate();

  const [apiPets, setApiPets] = useState([]);
  const [visiblePets, setVisiblePets] = useState(8);

  const [animalFilter, setAnimalFilter] = useState("All Pets");
  const [breedFilter, setBreedFilter] = useState("All Breeds");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [genderFilter, setGenderFilter] = useState("All Genders");
  const [searchTerm, setSearchTerm] = useState("");

  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [adoptionData, setAdoptionData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    visitDate: "",
    visitTime: "",
    reason: "",
    homeType: "",
    petExperience: "",
    agreed: false,
  });

  const staticPets = [
    {
      id: "static-1",
      image: luna,
      name: "Luna",
      type: "Dog",
      age: "2 Years",
      gender: "Female",
      breed: "Labrador",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-2",
      image: milo,
      name: "Milo",
      type: "Cat",
      age: "6 Months",
      gender: "Male",
      breed: "Tabby",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-3",
      image: rocky,
      name: "Rocky",
      type: "Dog",
      age: "1 Year",
      gender: "Male",
      breed: "Beagle",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-4",
      image: simba,
      name: "Simba",
      type: "Cat",
      age: "3 Months",
      gender: "Male",
      breed: "Persian",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-5",
      image: buddy,
      name: "Buddy",
      type: "Dog",
      age: "3 Years",
      gender: "Male",
      breed: "Shih Tzu",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-6",
      image: oreo,
      name: "Oreo",
      type: "Cat",
      age: "1 Year",
      gender: "Female",
      breed: "Shorthair",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-7",
      image: snowy,
      name: "Snowy",
      type: "Dog",
      age: "2 Years",
      gender: "Female",
      breed: "Spitz",
      status: "Available",
      isStaticPet: true,
    },
    {
      id: "static-8",
      image: coco,
      name: "Coco",
      type: "Cat",
      age: "4 Months",
      gender: "Female",
      breed: "Calico",
      status: "Available",
      isStaticPet: true,
    },
  ];

  const loadPets = async () => {
    const result = await getAllPetsAPI();

    if (result.status >= 200 && result.status < 300) {
      setApiPets(result.data);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const pets = [
    ...staticPets,
    ...apiPets
      .filter((pet) => pet.status === "Available")
      .map((pet) => ({
        ...pet,
        id: `api-${pet.id}`,
        originalPetId: pet.id,
        isStaticPet: false,
      })),
  ];

  const breedOptions = {
    Dog: ["Labrador", "Beagle", "Shih Tzu", "Spitz"],
    Cat: ["Tabby", "Persian", "Shorthair", "Calico"],
    Rabbit: ["Dutch", "Mini Lop"],
    Hamster: ["Syrian", "Dwarf"],
    Bird: ["Parakeet", "Cockatiel"],
  };

  const matchesAge = (petAge) => {
    if (ageFilter === "All Ages") return true;

    let ageInMonths = 0;

    if (petAge.includes("Month")) {
      ageInMonths = parseInt(petAge);
    } else if (petAge.includes("Year")) {
      ageInMonths = parseInt(petAge) * 12;
    }

    if (ageFilter === "8 weeks to 6 months") {
      return ageInMonths <= 6;
    }

    if (ageFilter === "6 months to 1 year") {
      return ageInMonths > 6 && ageInMonths <= 12;
    }

    if (ageFilter === "1 year to 2+ years") {
      return ageInMonths >= 12;
    }

    return true;
  };

  const filteredPets = pets.filter((pet) => {
    const matchesAnimal =
      animalFilter === "All Pets" || pet.type === animalFilter;

    const matchesBreed =
      breedFilter === "All Breeds" || pet.breed === breedFilter;

    const matchesGender =
      genderFilter === "All Genders" || pet.gender === genderFilter;

    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesAnimal &&
      matchesBreed &&
      matchesGender &&
      matchesAge(pet.age) &&
      matchesSearch
    );
  });

  const handleLoadMore = () => {
    if (visiblePets >= filteredPets.length) {
      alert("No more pets available");
      return;
    }

    setVisiblePets((prev) => prev + 8);
  };

  const handleOpenAdoptionModal = (pet) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please login to submit adoption request");
      navigate("/user/login");
      return;
    }

    setSelectedPet(pet);

    setAdoptionData({
      fullName: currentUser.fullName || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
      visitDate: "",
      visitTime: "",
      reason: "",
      homeType: "",
      petExperience: "",
      agreed: false,
    });

    setShowAdoptionModal(true);
  };

  const handleCloseAdoptionModal = () => {
    setShowAdoptionModal(false);
    setSelectedPet(null);

    setAdoptionData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      visitDate: "",
      visitTime: "",
      reason: "",
      homeType: "",
      petExperience: "",
      agreed: false,
    });
  };

  const handleSubmitAdoptionRequest = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const {
      fullName,
      email,
      phone,
      address,
      visitDate,
      visitTime,
      reason,
      homeType,
      petExperience,
      agreed,
    } = adoptionData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !visitDate ||
      !visitTime ||
      !reason ||
      !homeType ||
      !petExperience
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (reason.length < 10) {
      alert("Reason must be at least 10 characters");
      return;
    }

    if (!agreed) {
      alert("Please agree to visit PawCare Center for verification and pickup");
      return;
    }

    const reqBody = {
      userId: currentUser.id,

      petId: selectedPet.id,
      originalPetId: selectedPet.originalPetId || selectedPet.id,
      isStaticPet: selectedPet.isStaticPet,

      petData: selectedPet,

      applicantData: {
        fullName,
        email,
        phone,
        address,
      },

      visitPreference: {
        visitDate,
        visitTime,
      },

      adoptionDetails: {
        reason,
        homeType,
        petExperience,
      },

      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const result = await addAdoptionRequestAPI(reqBody);

    if (result.status >= 200 && result.status < 300) {
      alert("Adoption request submitted successfully");
      handleCloseAdoptionModal();
    } else {
      alert("Failed to submit adoption request");
    }
  };

  return (
    <div className="py-16 px-10">
      <div className="text-center space-y-2">
        <p className="font-bold text-primary">PETS LOOKING FOR A HOME</p>

        <p className="text-5xl font-bold text-heading">
          Meet Your Potential Companion
        </p>

        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-0.5 bg-primary"></div>
          <IoPaw className="text-primary text-xl" />
          <div className="w-12 h-0.5 bg-primary"></div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10 flex-wrap">
        <select
          value={animalFilter}
          onChange={(e) => {
            setAnimalFilter(e.target.value);
            setBreedFilter("All Breeds");
            setVisiblePets(8);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 w-48 font-semibold"
        >
          <option>All Pets</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Rabbit</option>
          <option>Hamster</option>
          <option>Bird</option>
        </select>

        <select
          value={breedFilter}
          onChange={(e) => {
            setBreedFilter(e.target.value);
            setVisiblePets(8);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 w-48 font-semibold"
        >
          <option>All Breeds</option>

          {animalFilter !== "All Pets" &&
            breedOptions[animalFilter]?.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
        </select>

        <select
          value={ageFilter}
          onChange={(e) => {
            setAgeFilter(e.target.value);
            setVisiblePets(8);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 w-48 font-semibold"
        >
          <option>All Ages</option>
          <option>8 weeks to 6 months</option>
          <option>6 months to 1 year</option>
          <option>1 year to 2+ years</option>
        </select>

        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setVisiblePets(8);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 w-48 font-semibold"
        >
          <option>All Genders</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisiblePets(8);
            }}
            className="border border-gray-200 rounded-xl pl-11 pr-4 py-3 w-64 outline-none font-semibold focus:border-primary"
          />
        </div>
      </div>

      {filteredPets.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-6 mt-10">
            {filteredPets.slice(0, visiblePets).map((pet) => (
              <AdoptionPetCard
                key={pet.id}
                pet={pet}
                onAdopt={handleOpenAdoptionModal}
              />
            ))}
          </div>

          {visiblePets < filteredPets.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
              >
                <IoReload />
                Load More Pets
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <IoPaw className="text-7xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-bold">No Pets Found</p>
          <p className="text-text mt-2">Pets will appear here.</p>
        </div>
      )}

      {showAdoptionModal && selectedPet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-pink-card rounded-2xl flex items-center justify-center">
                    <MdOutlineArticle className="text-primary text-3xl" />
                  </div>

                  <div>
                    <p className="text-3xl font-bold">Adoption Request</p>
                    <p className="text-text font-semibold mt-1">
                      Submit your request to adopt this pet.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseAdoptionModal}
                  className="text-3xl text-gray-500 hover:text-primary"
                >
                  <MdClose />
                </button>
              </div>

              <div className="mt-5 bg-pink-card border border-pink-100 rounded-xl p-4 flex items-center gap-3">
                <GrCircleInformation className="text-primary text-xl" />

                <p className="font-semibold text-text">
                  Pickup is from the center after approval. This is not a home
                  delivery purchase.
                </p>
              </div>

              <div className="mt-5 border border-gray-100 rounded-2xl p-4">
                <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-3">
                    <img
                      src={selectedPet.image}
                      alt={selectedPet.name}
                      className="w-full h-36 object-cover object-top rounded-xl"
                    />
                  </div>

                  <div className="col-span-9">
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-bold">{selectedPet.name}</p>

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                        Available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-5 mt-5">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <IoPaw className="text-primary text-xl" />
                          <div>
                            <p className="text-sm text-text font-semibold">
                              Breed
                            </p>
                            <p className="font-bold">{selectedPet.breed}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <IoPaw className="text-primary text-xl" />
                          <div>
                            <p className="text-sm text-text font-semibold">
                              Type
                            </p>
                            <p className="font-bold">{selectedPet.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-l border-gray-100 pl-8">
                        <div className="flex items-center gap-3">
                          <LuCalendarDays className="text-primary text-xl" />
                          <div>
                            <p className="text-sm text-text font-semibold">
                              Age
                            </p>
                            <p className="font-bold">{selectedPet.age}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {selectedPet.gender === "Male" ? (
                            <IoMdMale className="text-primary text-xl" />
                          ) : (
                            <IoMdFemale className="text-primary text-xl" />
                          )}

                          <div>
                            <p className="text-sm text-text font-semibold">
                              Gender
                            </p>
                            <p className="font-bold">{selectedPet.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitAdoptionRequest} className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaRegUser className="text-primary" />
                  <p className="text-xl font-bold">1. Applicant Information</p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm">
                      Full Name <span className="text-primary">*</span>
                    </label>

                    <input
                      type="text"
                      value={adoptionData.fullName}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm">
                      Email Address <span className="text-primary">*</span>
                    </label>

                    <input
                      type="email"
                      value={adoptionData.email}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter your email address"
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm">
                      Phone Number <span className="text-primary">*</span>
                    </label>

                    <input
                      type="tel"
                      value={adoptionData.phone}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter your phone number"
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm">
                      Address <span className="text-primary">*</span>
                    </label>

                    <input
                      type="text"
                      value={adoptionData.address}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter your complete address"
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 mb-3">
                  <LuCalendarDays className="text-primary" />
                  <p className="text-xl font-bold">2. Visit Preferences</p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm">
                      Preferred Visit Date{" "}
                      <span className="text-primary">*</span>
                    </label>

                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={adoptionData.visitDate}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          visitDate: e.target.value,
                        })
                      }
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm">
                      Preferred Visit Time{" "}
                      <span className="text-primary">*</span>
                    </label>

                    <div className="relative">
                      <LuClock3 className="absolute right-4 top-1/2 -translate-y-1/2 text-text" />

                      <select
                        value={adoptionData.visitTime}
                        onChange={(e) =>
                          setAdoptionData({
                            ...adoptionData,
                            visitTime: e.target.value,
                          })
                        }
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary appearance-none"
                      >
                        <option value="">Select time</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>03:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 mb-3">
                  <FaRegHeart className="text-primary" />
                  <p className="text-xl font-bold">3. Adoption Details</p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm">
                      Reason for Adoption{" "}
                      <span className="text-primary">*</span>
                    </label>

                    <textarea
                      rows="4"
                      value={adoptionData.reason}
                      onChange={(e) =>
                        setAdoptionData({
                          ...adoptionData,
                          reason: e.target.value,
                        })
                      }
                      placeholder="Tell us why you want to adopt this pet..."
                      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none"
                    />

                    <p className="text-xs text-text mt-1">
                      Minimum 10 characters
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold text-sm">
                        Home Type <span className="text-primary">*</span>
                      </label>

                      <select
                        value={adoptionData.homeType}
                        onChange={(e) =>
                          setAdoptionData({
                            ...adoptionData,
                            homeType: e.target.value,
                          })
                        }
                        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                      >
                        <option value="">Select home type</option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Farm</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-sm">
                        Pet Experience <span className="text-primary">*</span>
                      </label>

                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <label
                          className={`border rounded-xl p-3 flex items-center gap-2 cursor-pointer ${
                            adoptionData.petExperience ===
                            "Yes, I have experience"
                              ? "border-primary bg-pink-card"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="petExperience"
                            checked={
                              adoptionData.petExperience ===
                              "Yes, I have experience"
                            }
                            onChange={() =>
                              setAdoptionData({
                                ...adoptionData,
                                petExperience: "Yes, I have experience",
                              })
                            }
                            className="accent-pink-500"
                          />

                          <span className="text-sm font-semibold">
                            Yes, I have experience
                          </span>
                        </label>

                        <label
                          className={`border rounded-xl p-3 flex items-center gap-2 cursor-pointer ${
                            adoptionData.petExperience ===
                            "No, I'm a first-time pet owner"
                              ? "border-primary bg-pink-card"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="petExperience"
                            checked={
                              adoptionData.petExperience ===
                              "No, I'm a first-time pet owner"
                            }
                            onChange={() =>
                              setAdoptionData({
                                ...adoptionData,
                                petExperience: "No, I'm a first-time pet owner",
                              })
                            }
                            className="accent-pink-500"
                          />

                          <span className="text-sm font-semibold">
                            No, first-time owner
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 mb-3">
                  <IoPaw className="text-primary" />
                  <p className="text-xl font-bold">4. Agreement</p>
                </div>

                <label className="border border-gray-100 rounded-2xl p-4 flex gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adoptionData.agreed}
                    onChange={(e) =>
                      setAdoptionData({
                        ...adoptionData,
                        agreed: e.target.checked,
                      })
                    }
                    className="mt-1 accent-pink-500"
                  />

                  <div>
                    <p className="font-semibold">
                      I agree to visit PawCare Center for verification and
                      pickup.
                    </p>

                    <p className="text-sm text-text mt-1">
                      Adoption requires an in-person visit for assessment and
                      final approval.
                    </p>
                  </div>
                </label>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseAdoptionModal}
                    className="px-8 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark flex items-center gap-2"
                  >
                    <IoPaw />
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionPage;
