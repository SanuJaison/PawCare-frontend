import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/userreg.png";
import { useState } from "react";
import { getAllUsersAPI, updateUserAPI } from "../services/allAPI";

const UserLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      alert("Please fill your details");
      return;
    }

    try {
      const result = await getAllUsersAPI();

      if (result.status < 200 || result.status >= 300 || !Array.isArray(result.data)) {
        alert("Unable to connect to PawCare server. Please try again after backend redeploy.");
        return;
      }

      const existingUser = result.data.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );

      if (!existingUser) {
        alert("Invalid Email or Password");
        return;
      }

      if (existingUser.isBanned) {
        alert(
          "Your account has been banned. Please contact admin to unban your account.",
        );
        return;
      }

      if (existingUser.isDeleted && existingUser.deletedByAdmin) {
        alert("This account has been deleted by admin.");
        return;
      }

      if (existingUser.isDeleted && existingUser.deletedByUser) {
        alert("This account was deleted by you and cannot be accessed.");
        return;
      }

      if (existingUser.isDeleted) {
        alert("This account has been deleted and cannot be accessed.");
        return;
      }

      if (existingUser.password !== password) {
        alert("Invalid Email or Password");
        return;
      }

      const loginTime = new Date().toISOString();

      const updateResult = await updateUserAPI(existingUser.id, {
        status: "Active",
        lastLogin: loginTime,
      });

      if (updateResult.status >= 200 && updateResult.status < 300) {
        const updatedUser = {
          ...existingUser,
          status: "Active",
          lastLogin: loginTime,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(new Event("userUpdated"));

        alert("Login Successful");
        navigate("/");
      } else {
        alert("Login failed while updating user status");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-pink-card flex items-center justify-center px-10 py-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-7xl w-full grid grid-cols-2">
        <div className="h-full">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-12 flex flex-col justify-center">
          <p className="text-primary font-bold uppercase tracking-wide">
            Welcome Back
          </p>

          <p className="text-4xl font-bold text-heading mt-2">
            Login To <span className="text-primary">Paw</span>Care
          </p>

          <p className="text-text mt-3">
            Sign in to manage appointments, adoptions and pet services.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="font-semibold text-heading">Email Address</label>

              <input
                type="email"
                autoComplete="off"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-semibold text-heading">Password</label>

              <input
                type="password"
                autoComplete="new-password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-between">
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
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-text">
            Don't have an account?{" "}
            <Link to="/user/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
