import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      title: title.trim(),
    };
    try {
      const task = await createTask(newTask);
      setTasks((prev) => [...prev, task]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditTask = async (task) => {
    const newTitle = prompt("Task adını dəyiş:", task.title);
    if (!newTitle || !newTitle.trim()) return;
    try {
      const updatedTask = await updateTask(task.id, {
        title: newTitle.trim(),
      });
      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTask = async (id) => {
    const oldTasks = tasks;
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
    try {
      await deleteTask(id);
    } catch (error) {
      setTasks(oldTasks);
      console.error(error);
    }
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
          <button className="add-task-button" type="submit">
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
                <div className="task-item" key={task.id}>
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