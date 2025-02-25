import { useEffect, useState } from "react"
import Task from "../components/Task"
import CreateTask from "../components/CreateTask";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    const loadTasks = () => {
        console.log("Fetching tasks");
        fetch("http://localhost:8080/tasks")
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
                            <Task key={task.id} task={task} />
                        )
                    })}
                </ul>}
        </>
    )
}

export default TasksPage