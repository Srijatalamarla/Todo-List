import axios from "axios";
import { useState } from "react";

const CreateTask = ({ onTaskCreated }) => {

    const [task, setTask] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask, [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${API_BASE_URL}/api/v1/tasks`, task)
            .then((res) => {
                console.log(res.status, res.data);

                setTask({
                    title: "",
                    description: "",
                });

                if (onTaskCreated) {
                    onTaskCreated();
                }
            })
            .catch((error) => {
                console.log("Error : ", error);
            });
    }
    return (
        <>
            <p>Create Task</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={task.description}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter task description"
                    />
                </div>
                <button type="submit">Create Todo</button>
            </form>
        </>
    )
}

export default CreateTask;