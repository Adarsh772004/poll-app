import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MousePointerClick } from "lucide-react";

const PollVote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const poll = location.state;

  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = () => {
    if (!selectedOption) {
      alert("Please select an option before voting.");
      return;
    }

    // Get current polls from localStorage
    const polls = JSON.parse(localStorage.getItem("polls")) || [];

    // Update the votes
    const updatedPolls = polls.map((p) => {
      if (p.id === poll.id) {
        return {
          ...p,
          votes: {
            ...p.votes,
            [selectedOption]: (p.votes?.[selectedOption] || 0) + 1,
          },
        };
      }
      return p;
    });

    // Save updated polls to localStorage
    localStorage.setItem("polls", JSON.stringify(updatedPolls));

    // Navigate to results page with updated poll
    const updatedPoll = updatedPolls.find((p) => p.id === poll.id);
    navigate(`/results/${poll.id}`, { state: updatedPoll });
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-xl border p-6 rounded-2xl border-gray-600">
        <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>
        <p className="mb-4 font-medium">Make your choice:</p>
        <div className="space-y-3 mb-6">
          {poll.options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center px-4 py-3 rounded-lg cursor-pointer bg-[#2a2a2a] border ${
                selectedOption === option
                  ? "border-green-500"
                  : "border-gray-700"
              }`}
            >
              <input
                type="radio"
                name="pollOption"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="mr-3 w-5 h-5"
              />
              <span className="font-semibold">{option}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/polls")}
            className="flex-1 bg-white text-black py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft /> Back
          </button>
          <button
            onClick={handleVote}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <MousePointerClick /> Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollVote;
