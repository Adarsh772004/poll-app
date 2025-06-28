import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Components/Custom/UseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:7000/poll/users/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token); // Save token
      login(response.data.user); // Update context
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c1c]">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-lg mx-4 border border-white/10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-slate-400 mb-6 text-sm">
            Please enter your credentials
          </p>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-slate-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-[#2a2a2a] text-white"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm text-slate-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-[#2a2a2a] text-white"
              placeholder="Enter password"
            />
          </div>

          {errorMsg && (
            <p className="text-red-400 text-center text-sm mb-4">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold transition ${
              loading
                ? "bg-green-500 opacity-50"
                : "bg-green-600 hover:bg-green-800 text-white"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
