import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTasks } from "./TaskContext";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
  } = useTasks();
  const [title, setTitle] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await addTask(title);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditTask = async (task) => {
    const newTitle = prompt("Task adını dəyiş:", task.title);
    if (!newTitle || !newTitle.trim()) return;
    try {
      await editTask(task.id, newTitle);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTask = async (id) => {
    await removeTask(id);
  };
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task adı"
          />
          <button
            className="add-task-button"
            type="submit"
          >
            Add Task
          </button>
        </form>
        {loading ? (
          <p>Task-lar yüklənir...</p>
        ) : (
          <div>
            {tasks.length === 0 ? (
              <p>Hələ task yoxdur.</p>
            ) : (
              tasks.map((task) => (
                <div
                  className="task-item"
                  key={task.id}
                >
                  <h3>{task.title}</h3>
                  <div className="task-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;