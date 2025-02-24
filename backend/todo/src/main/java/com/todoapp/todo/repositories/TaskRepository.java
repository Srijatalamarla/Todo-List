package com.todoapp.todo.repositories;

import com.todoapp.todo.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    public Optional<Task> findByTitle(String title);
    public List<Task> findByCompletedTrue();
    public List<Task> findByCompletedFalse();
}
