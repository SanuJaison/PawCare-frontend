// import React from 'react'

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { FaCamera } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";
import { FiShield } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiBarChartFill } from "react-icons/ri";
import { LuCalendar, LuDog } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { updateUserAPI } from "../../services/allAPI";

const UserProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [userData, setUserData] = useState({
    fullName: currentUser.fullName || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    dob: currentUser.dob || "",
    address: currentUser.address || "",
    profilePic: currentUser.profilePic || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save these changes?",
    );

    if (!confirmSave) return;
    try {
      const result = await updateUserAPI(currentUser.id, userData);
      if (result.status >= 200 && result.status < 300) {
        localStorage.setItem("user", JSON.stringify(result.data));

        window.dispatchEvent(new Event("userUpdated"));

        setCurrentUser(result.data);

        setUserData({
          fullName: result.data.fullName,
          email: result.data.email,
          phone: result.data.phone,
          dob: result.data.dob,
          address: result.data.address,
          profilePic: result.data.profilePic,
        });

        alert("Profile updated successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all changes?",
    );

    if (confirmReset) {
      setUserData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        dob: currentUser.dob || "",
        address: currentUser.address || "",
        profilePic: currentUser.profilePic || "",
      });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you really sure you want to permanently delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const result = await updateUserAPI(currentUser.id, {
        ...currentUser,
        isDeleted: true,
      });

      if (result.status >= 200 && result.status < 300) {
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("userUpdated"));

        alert("Account deleted successfully");

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to delete account");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.oldPassword !== currentUser.password) {
      alert("Old password is incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword === passwordData.oldPassword) {
      alert("New password cannot be same as old password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password should contain at least 8 characters");
      return;
    }

    try {
      const result = await updateUserAPI(currentUser.id, {
        password: passwordData.newPassword,
      });

      if (result.status >= 200 && result.status < 300) {
        const updatedUser = {
          ...currentUser,
          password: passwordData.newPassword,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setCurrentUser(updatedUser);

        window.dispatchEvent(new Event("userUpdated"));

        alert("Password changed successfully!");

        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.log(err);
      alert("Failed to change password");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-start gap-6 mb-8">
            {userData.profilePic ? (
              <img
                src={userData.profilePic}
                alt=""
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-5xl font-bold">
                {userData.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <p className="text-3xl font-bold">{userData.fullName}</p>

              <div className="inline-block mt-3 bg-pink-card text-primary text-sm font-semibold px-4 py-2 rounded-full">
                Pet Parent 🐾
              </div>

              <p className="text-text mt-4">Member since June 2026</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-pink-card flex items-center justify-center">
                <FaRegUserCircle className="text-primary text-xl" />
              </div>

              <div>
                <p className="font-bold text-xl">Personal Information</p>

                <p className="text-sm text-text">
                  Update your personal details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="font-semibold mb-2 block">Full Name</label>

                <div className="relative">
                  <FaRegUser className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    value={userData.fullName}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <AiOutlineMail className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3 bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold mb-2 block">Phone Number</label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold mb-2 block">
                  Date Of Birth
                </label>

                <div className="relative">
                  <FaRegCalendarAlt className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        dob: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="font-semibold mb-2 block">Address</label>

              <div className="relative">
                <SlLocationPin className="absolute left-4 top-4 text-gray-400" />

                <textarea
                  rows="3"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3 resize-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="font-semibold mb-2 block">
                Profile Picture
              </label>

              <div className="relative">
                <FaCamera className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Profile Picture URL"
                  value={userData.profilePic}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      profilePic: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer"
              >
                <LuSave />
                Save Changes
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-xl font-semibold cursor-pointer"
              >
                <RiResetLeftFill />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <FiShield className="text-purple-600 text-xl" />
              </div>

              <p className="text-xl font-bold">Account Actions</p>
            </div>

            <button
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="w-full flex items-center justify-between bg-purple-50 rounded-xl p-4 font-semibold text-purple-600"
            >
              <div className="flex items-center gap-3">
                <HiOutlineLockClosed />
                Change Password
              </div>

              <span>{showPasswordSection ? "−" : "+"}</span>
            </button>

            {showPasswordSection && (
              <div className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl px-4 py-3"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl px-4 py-3"
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-100 shadow-lg outline-none rounded-xl px-4 py-3"
                />

                <button className="text-primary text-sm font-semibold">
                  Forgot Password?
                </button>

                <button
                  onClick={handleChangePassword}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            )}

            <button
              onClick={handleDeleteAccount}
              className="w-full mt-4 flex items-center gap-3 bg-red-50 text-red-500 rounded-xl p-4 font-semibold cursor-pointer"
            >
              <FaRegTrashAlt />
              Delete Account
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <RiBarChartFill className="text-blue-600 text-xl" />
              </div>

              <h2 className="text-xl font-bold">Activity Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <LuCalendar />
                  Appointments
                </div>

                <span className="font-bold">0</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineShoppingBag />
                  Orders
                </div>

                <span className="font-bold">0</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <LuDog />
                  Adoptions
                </div>

                <span className="font-bold">0</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <FaRegHeart />
                  Wishlist
                </div>

                <span className="font-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
