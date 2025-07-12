import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaPoll,
  FaUsers,
  FaFlag,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRef, useEffect } from "react";

const AdminSidebar = ({ isOpen, toggleDropdown, dropdown, setDropdown }) => {
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, [setDropdown]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-800 text-white w-64 h-screen flex flex-col justify-between p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:relative top-0 left-0 transition-transform duration-300 z-50`}
    >
      {/* Top section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Admin Hub</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="hover:text-yellow-400 flex items-center gap-2"
          >
            <FaChartBar /> Dashboard
          </Link>
          <Link
            to="/admin/polls"
            className="hover:text-yellow-400 flex items-center gap-2"
          >
            <FaPoll /> Poll
          </Link>
          <Link
            to="/admin/users"
            className="hover:text-yellow-400 flex items-center gap-2"
          >
            <FaUsers /> User
          </Link>
          {/* <Link
            to="/admin/reports"
            className="hover:text-yellow-400 flex items-center gap-2"
          >
            <FaFlag /> Report
          </Link> */}
        </nav>
      </div>

      {/* Bottom section - Admin + Dropdown */}
      <div className="pt-4 border-t relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <FaUser /> Admin
        </button>

        {dropdown && (
          <div className="absolute left-0 bottom-full mb-2 w-32 bg-white text-gray-800 rounded shadow-lg z-50 border border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left hover:bg-gray-300  flex items-center gap-2"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
