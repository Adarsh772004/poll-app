import { useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/users/forgot-password", { email });
      toast.success("Reset link sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#1e1e1e] p-6 rounded-xl text-white shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <label className="block mb-2 text-sm">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded bg-[#2b2b2b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="you@example.com"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded bg-green-600 hover:bg-green-700 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
