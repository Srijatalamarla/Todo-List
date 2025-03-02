import axios from "axios";
import { useState } from "react";
import "../styles/Task.css";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Task = ({ task, onTaskUpdated }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
    })

    const toggleTaskCompletion = async (id) => {
        console.log("Updated Task Completion");
        const res = await axios.patch(`${API_BASE_URL}/api/v1/tasks/${id}/toggle-completion`);
        onTaskUpdated();
    }

    const deleteTask = async (id) => {
        console.log("Delete task");
        const res = await axios.delete(`${API_BASE_URL}/api/v1/tasks/${id}`)
        onTaskUpdated();
    }

    const updateTask = async (e) => {
        e.preventDefault();
        console.log("Update Task");
        const res = await axios.put(`${API_BASE_URL}/api/v1/tasks/${task.id}`, editedTask)
        setIsEditing(false);
        onTaskUpdated();
    }
    return (
        <>
            {isEditing && (
                <div>
                    <p>Update task</p>
                    <form onSubmit={(e) => updateTask(e)}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div >
            )}

            <li key={task.id} className={`task-item ${task.completed ? "completed" : "incompleted"}`}>
                <div className="toggle-task-completion">
                    <label htmlFor="toggle-task-completion"></label>
                    <input
                        id="toggle-task-completion"
                        type="checkbox"
                        checked={task.completed}
                        name="oggle-task-completion"
                        onChange={() => toggleTaskCompletion(task.id)}
                    />
                </div>
                <div className="task-content">
                    <strong>{task.title}</strong> - {task.description} -{" "}
                    {task.completed ? "✅ Completed" : "❌ Pending"}
                </div>
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
            </li>
        </>
    )
}

export default Task;