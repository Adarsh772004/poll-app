import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThumbsUp, BarChart2 } from "lucide-react";

const pollOptions = ["Excellent", "Good", "Poor"];

export default function DemoPoll() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [votes, setVotes] = useState({
    Excellent: 0,
    Good: 0,
    Poor: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (location.state?.votes) {
      setVotes(location.state.votes);
    }
  }, [location.state]);

  const totalVotes = Object.values(votes).reduce((sum, val) => sum + val, 0);

  const handleVote = () => {
    if (selected && !hasVoted) {
      const updatedVotes = {
        ...votes,
        [selected]: votes[selected] + 1,
      };
      setVotes(updatedVotes);
      setHasVoted(true);
      navigate("/results", { state: { votes: updatedVotes } });
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">Experience Live Poll</h1>

      <div className="bg-[#2a2a2a] rounded-2xl shadow-xl p-8 w-full max-w-md">
        <p className="text-lg font-semibold mb-4 text-center">
          How would you rate your overall experience with PollApp?
        </p>

        <form className="space-y-3">
          {pollOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition ${
                selected === option
                  ? "border-green-500 bg-[#3a3a3a]"
                  : "border-gray-600 bg-[#2f2f2f]"
              }`}
            >
              <input
                type="radio"
                name="poll"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
                className="accent-green-500"
              />
              <span className="font-medium">{option}</span>
            </label>
          ))}
        </form>

        <p className="mt-4 text-sm text-gray-400 text-right">
          Total votes: {totalVotes}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleVote}
            disabled={!selected || hasVoted}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
              hasVoted
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-black"
            }`}
          >
            <ThumbsUp size={18} />
            {hasVoted ? "Voted" : "Vote"}
          </button>

          <button
            onClick={() => {
              if (Object.values(votes).every((v) => v === 0)) {
                alert("No votes yet!");
                return;
              }
              navigate("/results", { state: { votes } });
            }}
            className="flex-1 bg-white text-black py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition hover:bg-gray-200"
          >
            <BarChart2 size={18} />
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
