import { Navigate } from "react-router-dom";
import { useAuth } from "./Components/Custom/UseAuth";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <div className="text-center p-8 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
