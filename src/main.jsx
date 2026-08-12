import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { TaskProvider } from "./features/tasks/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);