import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useAuth } from "../Components/Custom/UseAuth";
import { toast } from "react-toastify";
import { FaTrash, FaThumbsUp } from "react-icons/fa";

const ViewPolls = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get("/");
        setPolls(res.data);
      } catch (err) {
        toast.error("Failed to fetch polls");
      }
    };

    fetchPolls();
  }, []);

  const deletePoll = async (id) => {
    if (!window.confirm("Delete this poll?")) return;

    try {
      await axios.delete(`/${id}`);
      setPolls((prev) => prev.filter((poll) => poll._id !== id));
      toast.success("Poll deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white px-4 sm:px-6 py-8">
      {/* Header and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Recent Polls</h2>
        <button
          onClick={() => navigate("/create")}
          className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          + Create Poll
        </button>
      </div>

      {/* Polls List */}
      <div className="space-y-4">
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700 hover:border-green-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Clickable Question Section */}
            <div
              className="flex items-center gap-4 cursor-pointer flex-1"
              onClick={() => navigate(`/vote/${poll._id}`, { state: poll })}
            >
              <div className="bg-purple-600 p-2 rounded-md shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-medium">{poll.question}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(poll.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:justify-end">
              <button
                onClick={() =>
                  navigate(`/results/${poll._id}`, { state: poll })
                }
                className="bg-gray-300 text-black px-3 py-1.5 rounded-full text-sm flex items-center gap-1 hover:bg-green-500 transition"
              >
                <FaThumbsUp size={14} />
                Results
              </button>

              {user && poll.createdBy === user._id && (
                <button
                  onClick={() => deletePoll(poll._id)}
                  className="bg-gray-300 text-black px-3 py-1.5 rounded-full text-sm flex items-center gap-1 hover:bg-red-500 transition"
                >
                  <FaTrash size={14} />
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPolls;
