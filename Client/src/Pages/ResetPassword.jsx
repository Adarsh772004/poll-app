import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/users/reset-password/${token}`, {
        newPassword: password,
      });
      toast.success("Password reset! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired link");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <label className="block mb-2 text-sm">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded bg-[#2b2b2b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="••••••"
          required
        />

        <label className="block mb-2 text-sm">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-3 py-2 mb-6 rounded bg-[#2b2b2b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded bg-green-600 hover:bg-green-700 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
