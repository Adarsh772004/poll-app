import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/admin/dashboard/summary");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard API error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p className="text-center">Loading dashboard...</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load data</p>;

  const { users, admins, polls } = stats;

  const pollStatusData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        label: "Poll Count",
        data: [polls.approved, polls.rejected, polls.pending],
        backgroundColor: ["#16a34a", "#dc2626", "#eab308"],
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const userActivityData = {
    labels: ["Users", "Admins"],
    datasets: [
      {
        data: [users, admins],
        backgroundColor: ["#3b82f6", "#9333ea"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 14 },
        },
      },
    },
  };

  const pollStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Poll Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Poll Status Overview</h3>
          <Bar data={pollStatusData} options={pollStatusOptions} />
          <p className="mt-4 text-sm text-gray-600">
            Total Polls:{" "}
            <span className="font-bold text-gray-900">{polls.total}</span>
          </p>
        </div>

        {/* User Role Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
          <Pie data={userActivityData} options={pieOptions} />
          <p className="mt-4 text-sm text-gray-600">
            Total Users: <span className="font-bold">{users + admins}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
