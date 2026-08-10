import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) return;
    const tokenData = JSON.parse(token);
    const timeLeft = tokenData.expiresAt - Date.now();
    if (timeLeft <= 0) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }, timeLeft);
    return () => clearTimeout(timer);
  }, [token, navigate]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const tokenData = JSON.parse(token);
  if (Date.now() >= tokenData.expiresAt) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;