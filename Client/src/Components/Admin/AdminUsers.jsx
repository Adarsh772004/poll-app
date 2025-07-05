import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { FaTrash, FaUserSlash, FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = async (id) => {
    try {
      await axios.patch(`/admin/users/${id}/status`, { status: "suspended" });
      toast.success("User suspended");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.patch(`/admin/users/${id}/status`, { status: "active" });
      toast.success("User activated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Polls</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                {u.status === "suspended" ? (
                  <span className="text-red-500">Suspended</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>
              <td className="p-2">{u.pollCount || 0}</td>
              <td className="p-2 flex gap-2">
                {u.status === "active" ? (
                  <button
                    onClick={() => handleSuspend(u._id)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaUserSlash />
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(u._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaUserCheck />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u._id)}
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

export default AdminUsers;
