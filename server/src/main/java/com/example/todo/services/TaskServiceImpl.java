package com.example.todo.services;

import com.example.todo.exceptions.TaskNotFoundException;
import com.example.todo.model.Task;
import com.example.todo.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    // Dependency injection - constructor injection
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public void deleteTaskById(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        } else {
            taskRepository.deleteById(id);
        }
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setDescription(updatedTask.getDescription());
                    task.setDone(updatedTask.isDone());
                    task.setPriority(updatedTask.getPriority());
                    task.setTargetDate(updatedTask.getTargetDate());
                    return taskRepository.save(task);
                }).orElseThrow(() -> new TaskNotFoundException(id));
    }
}
