import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-gray-200 ${
      pathname === path ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 shadow">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/admin" className={linkClass("/admin")}>Dashboard</Link>
        <Link to="/admin/polls" className={linkClass("/admin/polls")}>Polls</Link>
        <Link to="/admin/users" className={linkClass("/admin/users")}>Users</Link>
        <Link to="/admin/reports" className={linkClass("/admin/reports")}>Reports</Link>
        <Link to="/admin/settings" className={linkClass("/admin/settings")}>Settings</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
