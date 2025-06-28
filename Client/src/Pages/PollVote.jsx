import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { FaHandPointer } from "react-icons/fa";

const PollVote = () => {
  const { state: poll } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const submitVote = async () => {
    if (!selected) return toast.warning("Please select an option");

    try {
      const res = await axios.post(`/${poll._id}/vote`, { option: selected });
      toast.success("Vote submitted!");
      navigate(`/results/${poll._id}`, { state: res.data });
    } catch (err) {
      toast.error("Vote failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white p-6 flex items-center justify-center">
      <div className="bg-[#2a2a2a] p-6 w-full max-w-md rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{poll.question}</h2>
        <p className="mb-4 font-semibold text-lg">Make your choice:</p>
        <div className="space-y-3">
          {poll.options.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center px-4 py-3 rounded-lg border-2 cursor-pointer ${
                selected === opt
                  ? "border-green-500 bg-[#3a3a3a]"
                  : "border-[#3a3a3a] bg-[#2a2a2a]"
              }`}
              onClick={() => setSelected(opt)}
            >
              <input
                type="radio"
                name="poll-option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="form-radio text-green-500 mr-3"
              />
              <span className="text-white font-medium">{opt}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-white text-black font-bold px-5 py-2 rounded-xl hover:bg-gray-200 w-full"
          >
            <FaArrowLeft />
            Back
          </button>
          <button
            onClick={submitVote}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-5 py-2 rounded-xl w-full"
          >
            <FaHandPointer />
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollVote;
