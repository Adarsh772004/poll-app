import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DemoPollResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const votes = location.state?.votes || {
    Excellent: 0,
    Good: 0,
    Poor: 0,
  };

  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center text-white px-4">
      <div className="bg-[#2a2a2a] p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Experience Live Poll
        </h2>
        <p className="text-lg font-semibold mb-4">
          How would you rate your overall experience with PollApp?
        </p>

        {Object.entries(votes).map(([option, count]) => {
          const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
          const barColor =
            option === "Excellent"
              ? "bg-green-500"
              : option === "Good"
              ? "bg-yellow-500"
              : "bg-red-500";

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

        <p className="mt-4 font-medium">Total votes: {total}</p>

        <button
          onClick={() => navigate("/demo", { state: { votes } })}
          className="mt-6 bg-white text-black py-2 w-full rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back to poll
        </button>
      </div>
    </div>
  );
};

export default DemoPollResult;
