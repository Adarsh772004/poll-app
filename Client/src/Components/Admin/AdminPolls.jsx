import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminPolls = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const res = await axios.get("/admin/polls");
      setPolls(res.data);
    } catch (err) {
      toast.error("Failed to fetch polls");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/admin/polls/${id}/status`, { status });
      toast.success(`Poll ${status}`);
      fetchPolls();
    } catch (err) {
      toast.error("Failed to update poll");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/polls/${id}`);
      toast.success("Poll deleted");
      fetchPolls();
    } catch (err) {
      toast.error("Failed to delete poll");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Polls</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Question</th>
            <th className="p-2">Created By</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll) => (
            <tr key={poll._id} className="border-t">
              <td className="p-2">{poll.question}</td>
              <td className="p-2">{poll.createdBy?.email || "Unknown"}</td>
              <td className="p-2 capitalize">
                {poll.status === "approved" ? (
                  <span className="text-green-600">Approved</span>
                ) : poll.status === "rejected" ? (
                  <span className="text-red-500">Rejected</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(poll._id, "approved")}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleStatusUpdate(poll._id, "rejected")}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={() => handleDelete(poll._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPolls;
