import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleQuestionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    }
  };

  const handleOptionKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < options.length) {
        optionRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || options.some((opt) => !opt.trim())) {
      toast.warning("Please fill in all fields");
      return;
    }

    const newPoll = {
      id: Date.now(),
      question,
      options,
      date: new Date().toISOString(),
    };

    const existingPolls = JSON.parse(localStorage.getItem("polls") || "[]");
    const updatedPolls = [newPoll, ...existingPolls];
    localStorage.setItem("polls", JSON.stringify(updatedPolls));

    toast.success("Poll created!");
    navigate("/polls");
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#2a2a2a] text-white p-8 rounded-2xl shadow-2xl border border-gray-700 mx-4">
        <h2 className="text-3xl font-bold text-center mb-6">Create a Poll</h2>

        <form className="w-full" onSubmit={handleSubmit}>
          {/* Poll Question */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Poll Question
            </label>
            <input
              type="text"
              ref={questionRef}
              value={question}
              required
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleQuestionKeyDown}
              placeholder="Type your question here"
              className="w-full px-4 py-3 h-12 rounded-lg border border-gray-500 
                bg-[#2a2a2a] text-white 
                focus:outline-none focus:border-green-500 
                focus:bg-[#222] focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Answer Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Answer Options
            </label>
            {options.map((opt, index) => (
              <input
                key={index}
                type="text"
                required
                ref={(el) => (optionRefs.current[index] = el)}
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                className="w-full mb-3 px-4 py-3 h-12 rounded-lg border border-gray-500 
                  bg-[#2a2a2a] text-white 
                  focus:outline-none focus:border-green-500 
                  focus:bg-[#222] focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-800 text-white py-2.5 rounded-lg font-semibold transition duration-300"
          >
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default PollCreation;
