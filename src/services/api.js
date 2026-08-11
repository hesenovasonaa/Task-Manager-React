const API_URL = "http://localhost:3001/tasks";
export async function getTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) {
    throw new Error("Task-lar yüklənmədi");
    }
    return response.json();
}
export async function createTask(task) {
    const response = await fetch(API_URL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
    });
    if (!response.ok) {
    throw new Error("Task əlavə olunmadı");
    }
    return response.json();
}
export async function updateTask(id, updates) {
    const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
    });
    if (!response.ok) {
    throw new Error("Task yenilənmədi");
}
    return response.json();
}
export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    });
    if (!response.ok) {
    throw new Error("Task silinmədi");
    }
}