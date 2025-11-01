import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a0000]"></div>
      </div>
    );
  }

  /// Hanya redirect ke /login kalau sedang di route admin
  if (!isAuthenticated && location.pathname.startsWith("/admin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
