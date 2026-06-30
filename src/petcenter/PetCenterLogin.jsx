// import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/adminlogin.png";
import { useState } from "react";
import { petCenterLoginAPI } from "../services/allAPI";

const PetCenterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await petCenterLoginAPI();

    if (result.status < 200 || result.status >= 300 || !Array.isArray(result.data)) {
      alert("Unable to connect to PawCare server. Please try again after backend redeploy.");
      return;
    }

    const admin = result.data.find(
      (item) => item.email === email && item.password === password,
    );

    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));

      alert("Login Successful");

      navigate("/petcenter-dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-pink-card flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src={loginImg}
            alt="Pet Center Login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <p className="text-primary font-bold uppercase tracking-wide">
            Pet Center Portal
          </p>

          <p className="mt-2 text-3xl font-bold text-heading sm:text-4xl">
            Pet Center Login
          </p>

          <p className="text-text mt-3">
            Access appointments, adoptions, pet listings and customer management
            from your dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="font-semibold text-heading">Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="Enter your email"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-heading">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Enter your password"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link to="/forgot-password" className="text-primary font-semibold">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
            >
              Login To Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetCenterLogin;



