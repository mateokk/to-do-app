package com.example.todo.controllers;

import com.example.todo.model.Task;
import com.example.todo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin("http://localhost:3000")
public class TaskController {

    // Dependency injection - field injection
    @Autowired
    private TaskService taskService;
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
       return new ResponseEntity<>(taskService.addTask(task), HttpStatus.CREATED) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(taskService.getTaskById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        taskService.deleteTaskById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task updatedTask, @PathVariable("id") Long id) {
       return new ResponseEntity<>(taskService.updateTask(id, updatedTask), HttpStatus.OK);
    }


}


