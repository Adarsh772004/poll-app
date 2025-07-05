import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";

const PollCreation = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const questionRef = useRef(null);
  const optionRefs = useRef([]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === -1) {
        optionRefs.current[0]?.focus();
      } else if (index < options.length - 1) {
        optionRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || options.some((opt) => !opt.trim())) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/",
        { question, options },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Poll created successfully!");
      navigate("/polls");
    } catch (err) {
      console.error("Poll creation error:", err);
      toast.error("Failed to create poll");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#1e1e1e] text-white p-8 rounded-2xl shadow-2xl border border-[#333]">
        <h2 className="text-3xl font-bold text-center mb-6">Create a Poll</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-2">
            Poll Question
          </label>
          <input
            type="text"
            ref={questionRef}
            value={question}
            placeholder="Type your question here"
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, -1)}
            className="w-full mb-5 px-4 py-3 rounded-lg bg-[#2b2b2b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block text-sm font-semibold mb-2">
            Answer Options
          </label>
          {options.map((opt, idx) => (
            <input
              key={idx}
              ref={(el) => (optionRefs.current[idx] = el)}
              value={opt}
              placeholder={`Option ${idx + 1}`}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-full mb-3 px-4 py-3 rounded-lg bg-[#2b2b2b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}

          <button
            type="submit"
            className="w-full mt-6 bg-white hover:bg-gray-200 text-black font-semibold py-3 rounded-lg transition"
          >
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default PollCreation;
