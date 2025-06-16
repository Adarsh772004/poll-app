import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please enter your name, email, and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:7000/poll/users/register",
        {
          name: username,
          email,
          password,
        }
      );

      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#1c1c1c]">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl mx-4 border border-white/10">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Create Account 🎉
          </h2>
          <p className="text-center text-slate-400 mb-6 text-sm">
            Fill in the details below to get started
          </p>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-600 text-white bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-slate-600 text-white bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-blue-500 cursor-not-allowed opacity-50"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
