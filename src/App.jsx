import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/tasks/Dashboard";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;