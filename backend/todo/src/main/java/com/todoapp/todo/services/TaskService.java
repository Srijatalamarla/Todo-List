package com.todoapp.todo.services;

import com.todoapp.todo.models.Task;
import com.todoapp.todo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createNewTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task findTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> findAllCompletedTasks() {
        return taskRepository.findByCompletedTrue();
    }

    public List<Task> findAllInCompleteTasks() {
        return taskRepository.findByCompletedFalse();
    }

    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, Task task) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task updatedTask = existingTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setCompleted(task.isCompleted());
            return taskRepository.save(updatedTask);
        }
        return null;
    }
}
