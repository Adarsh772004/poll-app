import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
