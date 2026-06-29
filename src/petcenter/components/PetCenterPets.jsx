import { useEffect, useState } from "react";
import { IoPaw, IoReload } from "react-icons/io5";
import { ImCheckmark } from "react-icons/im";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { RiHeart3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { CalendarDays } from "lucide-react";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  addPetAPI,
  deletePetAPI,
  getAllPetsAPI,
  updatePetAPI,
} from "../../services/allAPI";

const PetCenterPets = () => {
  const [pets, setPets] = useState([]);
  const [visiblePets, setVisiblePets] = useState(8);

  const [animalFilter, setAnimalFilter] = useState("All Animals");
  const [breedFilter, setBreedFilter] = useState("All Breeds");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [petData, setPetData] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    image: "",
    status: "Available",
  });

  const breedOptions = {
    Dog: ["Labrador", "Beagle", "Shih Tzu", "Spitz"],
    Cat: ["Tabby", "Persian", "Shorthair", "Calico"],
    Rabbit: ["Dutch", "Mini Lop"],
    Hamster: ["Syrian", "Dwarf"],
    Bird: ["Parakeet", "Cockatiel"],
  };

  const loadPets = async () => {
    const result = await getAllPetsAPI();

    if (result.status >= 200 && result.status < 300) {
      setPets(result.data);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const resetForm = () => {
    setPetData({
      name: "",
      type: "Dog",
      breed: "",
      age: "",
      gender: "Male",
      image: "",
      status: "Available",
    });

    setEditId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
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
      animalFilter === "All Animals" || pet.type === animalFilter;

    const matchesBreed =
      breedFilter === "All Breeds" || pet.breed === breedFilter;

    const matchesSearch =
      pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.type?.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesAnimal && matchesBreed && matchesAge(pet.age) && matchesSearch
    );
  });

  const totalPets = pets.length;

  const availablePets = pets.filter((pet) => pet.status === "Available").length;

  const unavailablePets = pets.filter(
    (pet) => pet.status === "Unavailable",
  ).length;

  const dogPets = pets.filter((pet) => pet.type === "Dog").length;

  const handleLoadMore = () => {
    if (visiblePets >= filteredPets.length) {
      alert("No more pets available");
      return;
    }

    setVisiblePets((prev) => prev + 8);
  };

  const handleAddPet = async (e) => {
    e.preventDefault();

    const { name, type, breed, age, gender, image } = petData;

    if (!name || !type || !breed || !age || !gender || !image) {
      alert("Please fill all fields");
      return;
    }

    const result = await addPetAPI({
      ...petData,
      createdAt: new Date().toISOString(),
    });

    if (result.status >= 200 && result.status < 300) {
      alert("Pet added successfully");
      handleCloseModal();
      loadPets();
    } else {
      alert("Failed to add pet");
    }
  };

  const handleEditPet = (pet) => {
    setEditId(pet.id);

    setPetData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      image: pet.image,
      status: pet.status || "Available",
    });

    setShowModal(true);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();

    const { name, type, breed, age, gender, image } = petData;

    if (!name || !type || !breed || !age || !gender || !image) {
      alert("Please fill all fields");
      return;
    }

    const result = await updatePetAPI(editId, petData);

    if (result.status >= 200 && result.status < 300) {
      alert("Pet updated successfully");
      handleCloseModal();
      loadPets();
    } else {
      alert("Failed to update pet");
    }
  };

  const handleDeletePet = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?",
    );

    if (!confirmDelete) return;

    const result = await deletePetAPI(id);

    if (result.status >= 200 && result.status < 300) {
      alert("Pet deleted successfully");
      loadPets();
    } else {
      alert("Failed to delete pet");
    }
  };

  const badgeColors = {
    Dog: "bg-primary",
    Cat: "bg-purple-500",
    Rabbit: "bg-green-500",
    Hamster: "bg-yellow-500",
    Bird: "bg-blue-500",
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-heading">Pets</p>

          <p className="text-text font-semibold mt-2">
            Manage pet listings for the adoption page
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition flex items-center gap-2"
        >
          + Add New Pet
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="relative col-span-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisiblePets(8);
              }}
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none font-semibold focus:border-primary"
            />
          </div>

          <select
            value={animalFilter}
            onChange={(e) => {
              setAnimalFilter(e.target.value);
              setBreedFilter("All Breeds");
              setVisiblePets(8);
            }}
            className="border border-gray-200 rounded-xl px-4 py-3 font-semibold outline-none"
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
            className="border border-gray-200 rounded-xl px-4 py-3 font-semibold outline-none"
          >
            <option>All Breeds</option>

            {animalFilter !== "All Animals" &&
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
            className="border border-gray-200 rounded-xl px-4 py-3 font-semibold outline-none"
          >
            <option>All Ages</option>
            <option>8 weeks to 6 months</option>
            <option>6 months to 1 year</option>
            <option>1 year to 2+ years</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
              <IoPaw className="text-primary text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Total Pets</p>
              <p className="text-3xl font-bold">{totalPets}</p>
              <p className="text-xs text-text font-semibold">All listed pets</p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <ImCheckmark className="text-green-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Available</p>
              <p className="text-3xl font-bold">{availablePets}</p>
              <p className="text-xs text-text font-semibold">
                Ready for adoption
              </p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <RiHeart3Line className="text-red-500 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Unavailable</p>
              <p className="text-3xl font-bold">{unavailablePets}</p>
              <p className="text-xs text-text font-semibold">
                Not shown to users
              </p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <IoPaw className="text-blue-600 text-3xl" />
            </div>

            <div>
              <p className="text-sm text-text font-semibold">Dogs</p>
              <p className="text-3xl font-bold">{dogPets}</p>
              <p className="text-xs text-text font-semibold">Dog listings</p>
            </div>
          </div>
        </div>
      </div>

      {filteredPets.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-6 mt-8">
            {filteredPets.slice(0, visiblePets).map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-52 object-cover object-top"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      badgeColors[pet.type]
                    }`}
                  >
                    {pet.type}s
                  </span>

                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      pet.status === "Unavailable"
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {pet.status}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-heading">{pet.name}</h3>

                  <div className="flex items-center gap-4 mt-3 font-semibold text-text flex-wrap">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 text-primary" />
                      {pet.age}
                    </span>

                    <span className="flex items-center gap-1">
                      {pet.gender === "Male" ? (
                        <IoMdMale className="text-primary" />
                      ) : (
                        <IoMdFemale className="text-primary" />
                      )}
                      {pet.gender}
                    </span>

                    <span className="flex items-center gap-1">
                      <IoPaw className="text-primary" />
                      {pet.breed}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      onClick={() => handleEditPet(pet)}
                      className="flex items-center justify-center gap-2 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
                    >
                      <FaPencilAlt />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeletePet(pet.id)}
                      className="flex items-center justify-center gap-2 border border-red-400 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition"
                    >
                      <FaRegTrashAlt />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
        <div className="text-center py-20 bg-white rounded-2xl mt-8 border border-gray-100">
          <IoPaw className="text-7xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-bold">No Pets Found</p>
          <p className="text-text mt-2">Added pets will appear here.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <p className="text-2xl font-bold">
                  {editId ? "Edit Pet" : "Add New Pet"}
                </p>
                <p className="text-text font-semibold text-sm mt-1">
                  Fill the details shown in adoption page
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <form
              onSubmit={editId ? handleUpdatePet : handleAddPet}
              className="p-6 space-y-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-heading">Pet Name</label>
                  <input
                    type="text"
                    value={petData.name}
                    onChange={(e) =>
                      setPetData({ ...petData, name: e.target.value })
                    }
                    placeholder="Enter pet name"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-heading">
                    Animal Type
                  </label>
                  <select
                    value={petData.type}
                    onChange={(e) =>
                      setPetData({
                        ...petData,
                        type: e.target.value,
                        breed: "",
                      })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Rabbit</option>
                    <option>Hamster</option>
                    <option>Bird</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-heading">Breed</label>
                  <select
                    value={petData.breed}
                    onChange={(e) =>
                      setPetData({ ...petData, breed: e.target.value })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">Select Breed</option>
                    {breedOptions[petData.type]?.map((breed) => (
                      <option key={breed}>{breed}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-heading">Age</label>
                  <input
                    type="text"
                    value={petData.age}
                    onChange={(e) =>
                      setPetData({ ...petData, age: e.target.value })
                    }
                    placeholder="Eg: 2 Years / 6 Months"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-heading">Gender</label>
                  <select
                    value={petData.gender}
                    onChange={(e) =>
                      setPetData({ ...petData, gender: e.target.value })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-heading">Status</label>
                  <select
                    value={petData.status}
                    onChange={(e) =>
                      setPetData({ ...petData, status: e.target.value })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option>Available</option>
                    <option>Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-heading">Image URL</label>
                <input
                  type="url"
                  value={petData.image}
                  onChange={(e) =>
                    setPetData({ ...petData, image: e.target.value })
                  }
                  placeholder="https://example.com/pet-image.jpg"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              {petData.image && (
                <div>
                  <p className="font-semibold text-heading mb-2">
                    Image Preview
                  </p>
                  <img
                    src={petData.image}
                    alt=""
                    className="w-40 h-32 rounded-xl object-cover border border-gray-100"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark"
                >
                  {editId ? "Update Pet" : "Add Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCenterPets;
