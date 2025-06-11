import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart2 } from "lucide-react";

const ViewPolls = () => {
  const [polls, setPolls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPolls = JSON.parse(localStorage.getItem("polls") || "[]");
    setPolls(savedPolls);
  }, []);

  const openDeleteModal = (pollId) => {
    setPollToDelete(pollId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updated = polls.filter((poll) => poll.id !== pollToDelete);
    setPolls(updated);
    localStorage.setItem("polls", JSON.stringify(updated));
    setShowModal(false);
    setPollToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setPollToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white p-8">
      <button
        onClick={() => navigate("/create")}
        className="mb-6 bg-white text-black font-medium px-4 py-2 rounded"
      >
        + Create Poll
      </button>

      <h2 className="text-xl font-semibold mb-4">Recent Polls</h2>

      {polls.length === 0 ? (
        <p className="text-gray-400">No polls available.</p>
      ) : (
        polls.map((poll) => (
          <div
            key={poll.id}
            className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg mb-3 border border-gray-700 hover:border-green-500"
            onClick={() => navigate(`/vote/${poll.id}`, { state: poll })}
          >
            <div className="flex items-center gap-3">
              <BarChart2 className="text-purple-400" size={28} />
              <div>
                <p className="font-medium">{poll.question}</p>
                <p className="text-sm text-gray-400">
                  {new Date(poll.date).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/results/${poll.id}`, { state: poll });
                }}
                className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-green-400"
              >
                👍 Results
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(poll.id);
                }}
                className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-green-400"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl text-center p-8 w-[90%] max-w-md shadow-2xl">
            <img
              src="https://em-content.zobj.net/source/microsoft-teams/363/wastebasket_1f5d1-fe0f.png"
              alt="trash"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-black mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-700 mb-6">
              Do you really want to delete this poll? This process cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2 rounded-md bg-gray-200 text-black font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPolls;
