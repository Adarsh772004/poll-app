import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminSidebar from "../Admin/AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:block w-64">
        <AdminSidebar
          isOpen={true}
          dropdown={dropdown}
          setDropdown={setDropdown}
          toggleDropdown={toggleDropdown}
        />
      </div>

      {/* Sidebar toggle (mobile) */}
      <div className="md:hidden">
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          >
            <div
              className="w-64 h-full bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <AdminSidebar
                isOpen={isOpen}
                dropdown={dropdown}
                setDropdown={setDropdown}
                toggleDropdown={toggleDropdown}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top nav for mobile */}
        <header className="md:hidden bg-white shadow p-4 flex justify-between items-center">
          <button onClick={toggleSidebar}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
