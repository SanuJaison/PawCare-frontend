import { Link, useNavigate } from "react-router-dom";
import { IoPaw } from "react-icons/io5";
import registerImg from "../assets/userreg.png";
import { useState } from "react";
import { getAllUsersAPI, registerUserAPI } from "../services/allAPI";

const UserRegister = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    address: "",
    profilePic: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, password } = userData;

    if (!fullName || !email || !phone || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const userRes = await getAllUsersAPI();

      if (userRes.status < 200 || userRes.status >= 300 || !Array.isArray(userRes.data)) {
        alert("Unable to connect to PawCare server. Please try again after backend redeploy.");
        return;
      }

      const existingUser = userRes.data.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );

      if (existingUser) {
        if (existingUser.isDeleted) {
          alert(
            "This email address cannot be used because the account was previously deleted.",
          );
        } else {
          alert("Email already exists");
        }

        return;
      }

      const result = await registerUserAPI({
        ...userData,
        isDeleted: false,
        isBanned: false,
        status: "Inactive",
        lastLogin: "",
        createdAt: new Date().toISOString(),
      });

      if (result.status >= 200 && result.status < 300) {
        alert("Registration Successful");
        navigate("/user/login");
      } else {
        alert("Registration Failed. Please check backend connection.");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-card flex items-center justify-center px-4 py-8 sm:px-6 lg:py-10">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-lg lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src={registerImg}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-8">
            <IoPaw className="text-primary text-5xl" />

            <div>
              <p className="text-3xl font-bold">
                <span className="text-primary">Paw</span>Care
              </p>
              <p className="text-gray-500">Create your account</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block font-semibold mb-2">Full Name</label>

              <input
                type="text"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    fullName: e.target.value,
                  })
                }
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email Address</label>

              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-semibold mb-2">Phone Number</label>

                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Date of Birth</label>

                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      dob: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Address</label>

              <textarea
                rows="3"
                value={userData.address}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: e.target.value,
                  })
                }
                placeholder="Enter your address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>

              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Profile Picture URL</label>

              <input
                type="url"
                value={userData.profilePic}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profilePic: e.target.value,
                  })
                }
                placeholder="https://example.com/profile.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              I agree to the Terms & Conditions
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/user/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;




