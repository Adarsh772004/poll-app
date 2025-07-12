import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User Pages
import UserLayout from "./Components/Layout/UserLayout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import PollCreation from "./Pages/PollCreation";
import DemoPoll from "./Pages/DemoPoll";
import About from "./Pages/About";
import DemoPollResult from "./Pages/DemoPollResult";
import ViewPolls from "./Pages/ViewPolls";
import PollVote from "./Pages/PollVote";
import PollResult from "./Pages/PollResult";
import RequireAuth from "./Pages/RequireAuth";

// Admin Pages
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminUsers from "./Components/Admin/AdminUsers";
import AdminPolls from "./Components/Admin/AdminPolls";
import AdminReports from "./Components/Admin/AdminReports";

// Route protection
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route
            path="create"
            element={
              <RequireAuth>
                <PollCreation />
              </RequireAuth>
            }
          />
          <Route
            path="demo"
            element={
              <RequireAuth>
                <DemoPoll />
              </RequireAuth>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="results" element={<DemoPollResult />} />
          <Route path="polls" element={<ViewPolls />} />
          <Route path="/vote/:id" element={<PollVote />} />
          <Route path="/results/:id" element={<PollResult />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="polls" element={<AdminPolls />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
