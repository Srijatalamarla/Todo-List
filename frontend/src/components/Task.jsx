const Task = ({ task }) => {
    return (
        <>
            <li key={task.id}>
                <strong>{task.title}</strong> - {task.description} -{" "}
                {task.completed ? "✅ Completed" : "❌ Pending"}
            </li>
        </>
    )
}

export default Task;