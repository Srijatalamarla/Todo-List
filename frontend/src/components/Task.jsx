import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Task = ({ task, onTaskUpdated }) => {

    const toggleTaskCompletion = async (id) => {
        const response = await axios.patch(`${API_BASE_URL}/api/v1/tasks/${id}/toggle-completion`);
        onTaskUpdated();
    }
    return (
        <>
            <li key={task.id}>
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
                <strong>{task.title}</strong> - {task.description} -{" "}
                {task.completed ? "✅ Completed" : "❌ Pending"}
            </li>
        </>
    )
}

export default Task;