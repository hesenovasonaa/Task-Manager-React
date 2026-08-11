import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) return;
    const tokenData = JSON.parse(token);
    const timeLeft = tokenData.expiresAt - Date.now();
    if (timeLeft <= 0) {
      logout();
      navigate("/login", { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      logout();
      navigate("/login", { replace: true });
    }, timeLeft);
    return () => clearTimeout(timer);
  }, [token, navigate, logout]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;