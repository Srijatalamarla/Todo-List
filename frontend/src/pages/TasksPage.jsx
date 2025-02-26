import { useEffect, useState } from "react"
import Task from "../components/Task"
import CreateTask from "../components/CreateTask";

const TasksPage = () => {

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [tasks, setTasks] = useState([]);

    const loadTasks = () => {
        console.log("Fetching tasks");
        fetch(`${API_BASE_URL}/api/v1/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error("Error fetching tasks: ", error));
    }

    useEffect(() => {
        loadTasks();
    }, []);

    console.log(tasks);
    return (
        <>
            <h1>Tasks Page</h1>

            <CreateTask onTaskCreated={loadTasks} />

            <p>Tasks list</p>
            {tasks.length === 0 ? <p>No tasks available</p> :
                <ul>
                    {tasks.map((task) => {
                        return (
                            <Task key={task.id} task={task} onTaskUpdated={loadTasks} />
                        )
                    })}
                </ul>}
        </>
    )
}

export default TasksPage