import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PollResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const poll = location.state;

  const totalVotes = Object.values(poll.votes || {}).reduce((a, b) => a + b, 0);

  const getBarColor = (index) => {
    switch (index) {
      case 0:
        return "bg-green-500";
      case 1:
        return "bg-yellow-400";
      case 2:
        return "bg-red-500";
      default:
        return "bg-[#1c1c1c]";
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center text-white px-4">
      <div className="bg-[#2a2a2a] p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{poll.question}</h2>

        {poll.options.map((option, index) => {
          const count = poll.votes?.[option] || 0;
          const percent = totalVotes
            ? ((count / totalVotes) * 100).toFixed(1)
            : 0;
          const barColor = getBarColor(index);

          return (
            <div key={option} className="mb-4">
              <p className="font-medium mb-1">{option}</p>
              <div className="w-full bg-gray-600 rounded-full h-8 overflow-hidden relative">
                <div
                  className={`absolute left-0 top-0 h-full ${barColor}`}
                  style={{ width: `${percent}%` }}
                />
                <div className="relative z-10 text-black text-sm font-bold flex items-center justify-center h-full">
                  ({count} votes)
                </div>
              </div>
            </div>
          );
        })}

        <p className="mt-4 font-medium">Total votes: {totalVotes}</p>

        <button
          onClick={() => navigate("/polls")}
          className="mt-6 bg-white text-black flex items-center justify-center gap-2 py-2 w-full rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          <ArrowLeft /> Back to poll
        </button>
      </div>
    </div>
  );
}
