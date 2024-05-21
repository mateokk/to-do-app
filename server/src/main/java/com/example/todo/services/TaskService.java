package com.example.todo.services;

import com.example.todo.model.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();

    Task addTask(Task task);

    Task getTaskById(Long id);

    void deleteTaskById(Long id);

    Task updateTask(Long id, Task updatedTask);
}
